import React, { useState, useEffect } from 'react';
import axios from '@/utils/axios';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  created_at: string;
  priority: 'low' | 'medium' | 'high';
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const { toast } = useToast();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/Todo');
      setTodos(response.data.items || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast({
        title: "Error",
        description: "Failed to load todos",
        variant: "destructive",
      });
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post('/Todo', {
        task: newTodo,
        completed: false,
        created_at: new Date().toISOString(),
        priority: priority
      });
      
      if (response.data) {
        setTodos([...todos, response.data]);
        setNewTodo('');
        toast({
          title: "Success",
          description: "Todo added successfully!",
        });
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      toast({
        title: "Error",
        description: "Failed to add todo",
        variant: "destructive",
      });
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const response = await axios.patch('/Todo/' + todo.id, {
        completed: !todo.completed
      });
      
      if (response.data) {
        setTodos(todos.map(t => t.id === todo.id ? response.data : t));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      toast({
        title: "Error",
        description: "Failed to update todo",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-gray-900 border-4 border-yellow-300 p-6 shadow-[0_0_20px_rgba(255,255,0,0.3)]">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="New Task..."
              className="bg-purple-800 border-2 border-yellow-300 text-yellow-200 placeholder:text-yellow-200/50"
            />
          </div>
          <Select
            value={priority}
            onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}
          >
            <SelectTrigger className="w-[120px] bg-purple-800 border-2 border-yellow-300 text-yellow-200">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-purple-900 border-2 border-yellow-300">
              <SelectItem value="low" className="text-green-400">Low</SelectItem>
              <SelectItem value="medium" className="text-yellow-400">Medium</SelectItem>
              <SelectItem value="high" className="text-red-400">High</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={addTodo}
            className="bg-yellow-300 hover:bg-yellow-400 text-purple-900 font-bold px-8"
          >
            ADD
          </Button>
        </div>

        <div className="space-y-2 mt-6">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-4 bg-purple-800/50 p-4 border-2 border-yellow-300 rounded-lg"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo)}
                className="border-2 border-yellow-300 data-[state=checked]:bg-yellow-300 data-[state=checked]:text-purple-900"
              />
              <span
                className={"flex-1 text-yellow-200 " + 
                  (todo.completed ? 'line-through opacity-50' : '')}
              >
                {todo.task}
              </span>
              <div
                className={"w-3 h-3 rounded-full " + 
                  (todo.priority === 'high'
                    ? 'bg-red-500'
                    : todo.priority === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500')}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
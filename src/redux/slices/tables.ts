import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import type { RootState } from '../store';

interface Todo {
  id: string;
  task: string;
  completed: boolean;
  created_at: string;
  priority: 'low' | 'medium' | 'high';
}

interface TableState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'tables/fetchTodos',
  async () => {
    const response = await axios.get('/Todo');
    return response.data.items || [];
  }
);

export const addTodo = createAsyncThunk(
  'tables/addTodo',
  async (todo: Omit<Todo, 'id'>) => {
    const response = await axios.post('/Todo', todo);
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  'tables/updateTodo',
  async ({ id, data }: { id: string; data: Partial<Todo> }) => {
    const response = await axios.patch(`/Todo/${id}`, data);
    return response.data;
  }
);

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })
      // Add Todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      // Update Todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

// Selectors
export const selectTodos = (state: RootState) => state.tables.todos;
export const selectLoading = (state: RootState) => state.tables.loading;
export const selectError = (state: RootState) => state.tables.error;

export default tablesSlice.reducer;
import React from 'react';
import { TodoList } from '@/components/blocks/TodoList';

const RetroTodoApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-yellow-300 mb-4" style={{
            textShadow: '4px 4px 0px #000, -4px -4px 0px #ff00ff',
            fontFamily: '"Press Start 2P", cursive'
          }}>
            RETRO TODO
          </h1>
          <p className="text-yellow-200 text-xl">Level Up Your Productivity!</p>
        </div>

        <TodoList />
        
        <footer className="mt-8 text-center text-yellow-200/70 font-mono">
          Made with 🕹️ in 2024
        </footer>
      </div>
    </div>
  );
};

export default RetroTodoApp;
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-600 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-yellow-300 mb-4" style={{
          textShadow: '4px 4px 0px #000, -4px -4px 0px #ff00ff',
          fontFamily: '"Press Start 2P", cursive'
        }}>
          GAME OVER
        </h1>
        <p className="text-2xl text-yellow-200 mb-8">404 - PAGE NOT FOUND</p>
        <div className="animate-pulse">
          <p className="text-yellow-200 mb-4">INSERT COIN TO CONTINUE</p>
        </div>
        <Link to="/">
          <Button 
            className="bg-yellow-300 hover:bg-yellow-400 text-purple-900 font-bold px-8 py-6 text-lg border-4 border-purple-900"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            CONTINUE
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
import React, { useState, useEffect } from 'react';
import ChatContainer from './ChatContainer';

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [animatePulse, setAnimatePulse] = useState(false);

  // Simulate receiving a new message after 30 seconds if chat is closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setHasUnreadMessages(true);
        setAnimatePulse(true);
        setTimeout(() => setAnimatePulse(false), 3000);
      }, 30000);
      return () => clearTimeout(timer);
    } else {
      setHasUnreadMessages(false);
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
      setHasUnreadMessages(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && !isMinimized ? (
        <div className="fixed bottom-20 right-5 md:right-10 shadow-xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out animate-fadeIn" 
             style={{ width: '90vw', maxWidth: '700px', height: '800px' }}>
          <ChatContainer onClose={() => setIsOpen(false)} onMinimize={minimizeChat} />
        </div>
      ) : isMinimized ? (
        <div className="fixed bottom-20 right-5 md:right-10 shadow-lg rounded-lg bg-white p-3 animate-slideIn">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium">Travel Guide</p>
              <p className="text-xs text-gray-500">Click to expand</p>
            </div>
          </div>
        </div>
      ) : null}
      
      <button 
        onClick={toggleChat}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-45' : 'bg-blue-600 hover:bg-blue-700'
        } ${animatePulse ? 'animate-pulse' : ''}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {hasUnreadMessages && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingChatButton;

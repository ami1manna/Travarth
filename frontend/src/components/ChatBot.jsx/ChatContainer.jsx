// src/components/ChatContainer.jsx
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import DestinationSuggestions from './DestinationSuggestions';
import TripPlanningOptions from './TripPlanningOptions';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Safely get the API key
const getApiKey = () => {
  try {
    // Try to get from import.meta.env first (Vite development)
    if (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
      return import.meta.env.VITE_GEMINI_API_KEY;
    }
    // Fallback to process.env (for builds or testing environments)
    if (process.env && process.env.GEMINI_API_KEY) {
      return process.env.GEMINI_API_KEY;
    }
    console.error("API key not found in environment variables");
    return ""; // Return empty string as fallback
  } catch (error) {
    console.error("Error accessing environment variables:", error);
    return ""; // Return empty string on error
  }
};

// Initialize the Gemini API with error handling
let genAI;
let model;

try {
  const apiKey = getApiKey();
  if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } else {
    console.error("Cannot initialize Gemini API without an API key");
  }
} catch (error) {
  console.error("Error initializing Gemini API:", error);
}

const ChatContainer = ({ onClose }) => {
  // Safely get messages from localStorage
  const getInitialMessages = () => {
    try {
      const savedMessages = localStorage.getItem('travelChatHistory');
      return savedMessages ? JSON.parse(savedMessages) : [
        {
          role: 'assistant',
          content: '# Welcome to Your AI Travel Guide! 👋\n\nI can help you with:\n\n- **Destination recommendations**\n- **Trip planning and itineraries**\n- **Budget advice and cost estimates**\n- **Local attractions and activities**\n- **Travel tips and cultural information**\n\nWhere would you like to go?'
        }
      ];
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return [
        {
          role: 'assistant',
          content: '# Welcome to Your AI Travel Guide! 👋\n\nI can help you with:\n\n- **Destination recommendations**\n- **Trip planning and itineraries**\n- **Budget advice and cost estimates**\n- **Local attractions and activities**\n- **Travel tips and cultural information**\n\nWhere would you like to go?'
        }
      ];
    }
  };

  const [messages, setMessages] = useState(getInitialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [apiError, setApiError] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Save messages to localStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem('travelChatHistory', JSON.stringify(messages));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [messages]);

  const handleSendMessage = async (message) => {
    // Don't proceed if message is empty or API not initialized
    if (!message.trim() || !model) {
      if (!model) {
        setApiError(true);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: '## Sorry! 😔\n\nI cannot process your request because the AI service is not properly configured. Please check your API key and try again later.' 
        }]);
      }
      return;
    }

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      // Create a more detailed travel-focused prompt that outputs markdown
      const prompt = `
        As an AI travel guide, please respond to this query: "${message}"
        
        Format your response in Markdown with appropriate headings, bullet points, and emphasis.
        
        If this is about a specific destination, include:
        - Top attractions and must-see places
        - Local cuisine and food recommendations
        - Best time to visit and weather information
        - Estimated budget considerations (budget, moderate, luxury)
        - Cultural customs or etiquette to be aware of
        - Transportation options
        - Safety tips if relevant
        
        If this is about trip planning, include a suggested itinerary with days.
        
        If this is about budget, include approximate costs for different categories.
        
        Keep your response conversational, friendly and well-structured with clear headings and sections.
      `;

      // Get response from Gemini
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '## Oops! Something went wrong 😕\n\nI encountered an error while processing your request. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDestination = (destination) => {
    handleSendMessage(`I want to visit ${destination}`);
  };

  const handleSelectTripOption = (option) => {
    setInputMessage(option + " ");
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: '# Chat history cleared! ✨\n\nHow can I help with your travel plans today?'
      }
    ]);
    setApiError(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Travel Guide</h1>
        <div className="flex space-x-2">
          <button 
            onClick={clearChat}
            className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={onClose}
            className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>
      
      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">API Error!</strong>
          <span className="block sm:inline"> The AI service is not properly configured. Please check your API key.</span>
        </div>
      )}
      
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto"
      >
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-center my-2">
            <div className="animate-pulse flex items-center">
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-bounce"></div>
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-4 border-t border-gray-200 bg-gray-50">
        <DestinationSuggestions onSelectDestination={handleSelectDestination} />
        <TripPlanningOptions onSelectOption={handleSelectTripOption} />
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        disabled={apiError}
      />
    </div>
  );
};

export default ChatContainer;

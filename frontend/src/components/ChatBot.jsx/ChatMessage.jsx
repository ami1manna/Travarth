// src/components/ChatMessage.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Sample data for charts
const budgetData = [
  { name: 'Accommodation', cost: 500 },
  { name: 'Food', cost: 300 },
  { name: 'Transportation', cost: 200 },
  { name: 'Activities', cost: 250 },
  { name: 'Shopping', cost: 150 },
];

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Function to detect if the message contains budget information
  const containsBudgetInfo = (content) => {
    return content.toLowerCase().includes('budget') && 
           (content.toLowerCase().includes('cost') || 
            content.toLowerCase().includes('expense') || 
            content.toLowerCase().includes('price'));
  };
  
  // Function to detect if the message is about trip planning with dates
  const containsTripPlanning = (content) => {
    return (content.toLowerCase().includes('plan') || content.toLowerCase().includes('itinerary')) && 
           (content.toLowerCase().includes('day') || content.toLowerCase().includes('date'));
  };

  // Function to extract location from message
  const extractLocation = (content) => {
    const locationMatch = content.match(/visit\s+([A-Za-z\s,]+)/i) || 
                         content.match(/travel\s+to\s+([A-Za-z\s,]+)/i) ||
                         content.match(/going\s+to\s+([A-Za-z\s,]+)/i);
    return locationMatch ? locationMatch[1].trim() : null;
  };

  // Function to render appropriate visual elements based on message content
  const renderVisualElements = (content) => {
    if (isUser) return null;
    
    return (
      <div className="mt-4">
        {containsBudgetInfo(content) && (
          <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Estimated Budget Breakdown</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {containsTripPlanning(content) && (
          <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Trip Planning Calendar</h4>
            <Calendar className="border-0" />
          </div>
        )}
        
        {extractLocation(content) && (
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Location</h4>
            <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Map of {extractLocation(content)}</p>
              {/* In a real app, you would integrate with a maps API here */}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-xl font-bold my-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-bold my-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-md font-bold my-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
                li: ({node, ...props}) => <li className="my-1" {...props} />,
                p: ({node, ...props}) => <p className="my-2" {...props} />,
                a: ({node, ...props}) => <a className="text-blue-600 underline" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline 
                    ? <code className="bg-gray-200 px-1 rounded" {...props} />
                    : <pre className="bg-gray-800 text-white p-2 rounded my-2 overflow-x-auto"><code {...props} /></pre>
              }}
            >
              {message.content}
            </ReactMarkdown>
            {renderVisualElements(message.content)}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 ml-2 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;

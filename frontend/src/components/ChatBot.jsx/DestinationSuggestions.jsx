import React, { useState } from 'react';

const popularDestinations = [
  { name: "Paris, France", emoji: "🇫🇷" },
  { name: "Tokyo, Japan", emoji: "🇯🇵" },
  { name: "New York City, USA", emoji: "🇺🇸" },
  { name: "Rome, Italy", emoji: "🇮🇹" },
  { name: "Bali, Indonesia", emoji: "🇮🇩" },
  { name: "Barcelona, Spain", emoji: "🇪🇸" },
  { name: "London, UK", emoji: "🇬🇧" },
  { name: "Sydney, Australia", emoji: "🇦🇺" },
  { name: "Dubai, UAE", emoji: "🇦🇪" },
  { name: "Bangkok, Thailand", emoji: "🇹🇭" }
];

const DestinationSuggestions = ({ onSelectDestination }) => {
  const [showAll, setShowAll] = useState(false);
  const displayDestinations = showAll ? popularDestinations : popularDestinations.slice(0, 6);

  return (
    <div className="mt-4 mb-2">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-gray-600">Popular destinations:</p>
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          {showAll ? 'Show less' : 'Show more'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {displayDestinations.map((destination, index) => (
          <button
            key={index}
            onClick={() => onSelectDestination(destination.name)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-1.5 px-3 rounded-full transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200 flex items-center"
          >
            <span className="mr-1.5">{destination.emoji}</span>
            {destination.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DestinationSuggestions;

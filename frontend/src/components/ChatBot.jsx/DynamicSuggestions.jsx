// src/components/DynamicSuggestions.jsx
import React from 'react';
import DestinationSuggestions from './DestinationSuggestions';
import TripPlanningOptions from './TripPlanningOptions';

const DynamicSuggestions = ({ context, destination, onSelectDestination, onSelectOption }) => {
  const getContextOptions = () => {
    switch (context) {
      case 'destination':
        return (
          <div className="mt-4 mb-2">
            <p className="text-sm font-medium text-gray-600 mb-2">
              What would you like to know about {destination}?
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                `Best time to visit ${destination}`,
                `Top attractions in ${destination}`,
                `Local food in ${destination}`,
                `How to get around ${destination}`,
                `Budget for ${destination}`,
                `Plan a trip to ${destination}`
              ].map((option, index) => (
                <button
                  key={index}
                  onClick={() => onSelectOption(option)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm py-1.5 px-3 rounded-full transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200 flex items-center"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'planning':
        return (
          <div className="mt-4 mb-2">
            <p className="text-sm font-medium text-gray-600 mb-2">Planning options:</p>
            <div className="flex flex-wrap gap-2">
              {[
                `3-day itinerary for ${destination || 'my trip'}`,
                `5-day itinerary for ${destination || 'my trip'}`,
                `Family-friendly activities in ${destination || 'my destination'}`,
                `Weekend trip to ${destination || 'a nearby city'}`,
                `Transportation options in ${destination || 'my destination'}`
              ].map((option, index) => (
                <button
                  key={index}
                  onClick={() => onSelectOption(option)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm py-1.5 px-3 rounded-full transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200 flex items-center"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'budget':
        return (
          <div className="mt-4 mb-2">
            <p className="text-sm font-medium text-gray-600 mb-2">Budget options:</p>
            <div className="flex flex-wrap gap-2">
              {[
                `Budget breakdown for ${destination || 'my trip'}`,
                `Luxury options in ${destination || 'my destination'}`,
                `Budget accommodations in ${destination || 'my destination'}`,
                `Affordable dining in ${destination || 'my destination'}`,
                `Cost-saving tips for ${destination || 'travel'}`
              ].map((option, index) => (
                <button
                  key={index}
                  onClick={() => onSelectOption(option)}
                  className="bg-green-100 hover:bg-green-200 text-green-800 text-sm py-1.5 px-3 rounded-full transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200 flex items-center"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'initial':
      default:
        return (
          <>
            <DestinationSuggestions onSelectDestination={onSelectDestination} />
            <TripPlanningOptions onSelectOption={onSelectOption} />
          </>
        );
    }
  };

  return (
    <div className="py-2">
      {getContextOptions()}
    </div>
  );
};

export default DynamicSuggestions;

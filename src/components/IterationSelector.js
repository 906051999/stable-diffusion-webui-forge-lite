import React, { useState } from 'react';

const IterationSelector = ({ value, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLabelClick = (val) => {
    onChange({ target: { value: val } });
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'bg-white rounded-lg shadow-md w-full' : 'w-auto'}`}>
      {!isExpanded ? (
        <button
          onClick={toggleExpand}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 border border-gray-300 rounded flex justify-between items-center"
        >
          <span>步数：{value}</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        <div className="w-full">
          <div
            className="p-4 cursor-pointer flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            onClick={toggleExpand}
          >
            <span className="text-sm font-medium text-gray-700">点击可收起</span>
            <svg
              className="w-4 h-4 transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="p-4 border-t">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-700 mb-2 sm:mb-0">步数: {value}</span>
              <input
                type="range"
                min="10"
                max="30"
                step="1"
                value={value}
                onChange={onChange}
                className="w-full sm:w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[10, 15, 20, 25, 30].map((num) => (
                <button
                  key={num}
                  className={`py-2 px-1 text-sm font-medium rounded-full transition-colors ${
                    num === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => handleLabelClick(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IterationSelector;
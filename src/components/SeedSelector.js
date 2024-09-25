import React, { useState, useEffect } from 'react';

export default function SeedSelector({ seed, setSeed }) {
  const [inputValue, setInputValue] = useState(seed.toString());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setInputValue(seed.toString());
  }, [seed]);

  const handleRandom = () => setSeed(Math.floor(Math.random() * 10000000000));
  const handleReset = () => setSeed(-1);
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^-?\d*$/.test(value)) {
      setInputValue(value);
      setSeed(value === '' || value === '-' ? -1 : parseInt(value, 10) || -1);
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'bg-white rounded-lg shadow-md w-full' : 'w-auto'}`}>
      {!isExpanded ? (
        <button
          onClick={toggleExpand}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 border border-gray-300 rounded flex justify-between items-center"
        >
          <span>种子：{inputValue}</span>
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
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="seedInput" className="text-sm font-medium text-gray-700 w-16">种子：</label>
                <input
                  id="seedInput"
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  className="flex-grow border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="-1"
                />
              </div>
              <div className="flex justify-between gap-4">
                <button 
                  onClick={handleRandom} 
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  随机种子
                </button>
                <button 
                  onClick={handleReset} 
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  重置种子
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
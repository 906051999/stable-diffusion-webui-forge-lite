import React, { useState } from 'react';

const RESOLUTIONS = {
  '1': ['1'],
  '2': ['3'],
  '3': ['2', '4'],
  '4': ['3'],
  '9': ['16', '18', '21'],
  '16': ['9'],
  '18': ['9'],
  '21': ['9']
};

const RESOLUTION_DESCRIPTIONS = {
  '1:1': '1024 x 1024 (正方形)',
  '2:3': '800 x 1200 (竖版)',
  '3:2': '1200 x 800 (横版)',
  '3:4': '900 x 1200 (竖屏)',
  '4:3': '1200 x 900 (横屏)',
  '9:16': '675 x 1200 (手机标准)',
  '9:18': '600 x 1200 (手机全面屏)',
  '9:21': '514 x 1200 (手机超长屏)',
  '16:9': '1200 x 675 (宽屏)',
  '18:9': '1200 x 600 (电影比例)',
  '21:9': '1200 x 514 (超宽影院)'
};

const ResolutionSelector = () => {
  const [width, setWidth] = useState('1');
  const [height, setHeight] = useState('1');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    setHeight(RESOLUTIONS[newWidth][0]);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const currentResolution = `${width}:${height}`;
  const currentDescription = RESOLUTION_DESCRIPTIONS[currentResolution];

  return (
    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'bg-white rounded-lg shadow-md w-full' : 'w-auto'}`}>
      {!isExpanded ? (
        <button
          onClick={toggleExpand}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 border border-gray-300 rounded flex justify-between items-center"
        >
          <span>分辨率：{currentDescription}</span>
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
            <div className="text-lg font-semibold mb-4 text-center text-gray-700">
              {currentDescription}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">宽</label>
                <select
                  id="width"
                  value={width}
                  onChange={handleWidthChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.keys(RESOLUTIONS).map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">高</label>
                <select
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {RESOLUTIONS[width].map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResolutionSelector;
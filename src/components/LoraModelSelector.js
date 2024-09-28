import React, { useMemo, useRef, useEffect, useState } from 'react';

const LoraModelSelector = ({ models, onSelect }) => {
  const emptyModels = useMemo(() => Array(5).fill().map((_, index) => ({
    id: `empty${index + 1}`,
    name: `空白模型 ${index + 1}`,
    tag: `,${index + 1}`,
    image: '/images/test.png'
  })), []);

  const allModels = useMemo(() => [...emptyModels, ...(Array.isArray(models) ? models : [])], [emptyModels, models]);
  const scrollRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        setShowScrollHint(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [allModels]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative">
      <div className="mb-4 flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition-colors duration-200" onClick={toggleCollapse}>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Lora模型:</span>
          <span className="text-blue-600 font-bold text-lg">{allModels.length}</span>
        </div>
        <div className="flex items-center">
          {!isCollapsed && showScrollHint && (
            <span className="text-xs text-gray-500 mr-3">
              滑动查看更多
            </span>
          )}
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${!isCollapsed ? '' : 'transform rotate-180'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {!isCollapsed && (
        <div ref={scrollRef} className="overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {allModels.map((model) => (
              <div
                key={model.id}
                onClick={() => onSelect(model)}
                className={`flex-shrink-0 w-40 cursor-pointer transition transform hover:scale-105 ${
                  model.id.startsWith('empty') ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-800'
                } rounded-lg shadow-md overflow-hidden`}
              >
                <img 
                  src={model.image || '/images/test.png'} 
                  alt={model.name} 
                  className="w-full h-32 object-cover"
                />
                <div className="p-2 text-center">
                  <p className="text-sm font-medium truncate">{model.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoraModelSelector;
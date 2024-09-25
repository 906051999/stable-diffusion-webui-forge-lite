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

  return (
    <div className="relative">
      <div className="mb-4 flex justify-between items-center bg-slate-100 p-3 rounded-lg">
        <span className="text-sm text-slate-700">Lora模型数量: <span className="text-slate-900">{allModels.length}</span></span>
        {showScrollHint && (
          <span className="text-sm text-slate-500 flex items-center">
            <span>滑动查看更多</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
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
    </div>
  );
};

export default LoraModelSelector;
import React, { useRef, useEffect } from 'react';

const PromptInput = ({ value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (e) => {
    onChange(e);
    adjustTextareaHeight();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="relative mb-3">
        <textarea 
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder="输入你的提示词"
          className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-200 text-left"
          style={{ minHeight: '38px', height: 'auto', overflow: 'hidden' }}
        />
        {value && (
          <button
            onClick={() => onChange({ target: { value: '' } })}
            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.707 6.707a1 1 0 011.414 0L10 8.586l1.879-1.879a1 1 0 111.414 1.414L11.414 10l1.879 1.879a1 1 0 01-1.414 1.414L10 11.414l-1.879 1.879a1 1 0 01-1.414-1.414L8.586 10 6.707 8.121a1 1 0 010-1.414z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PromptInput;
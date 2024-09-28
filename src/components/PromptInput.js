import React, { useRef, useEffect, useState } from 'react';
import promptDefineMap from '../../public/localPromptDefineMap.json';

const PromptInput = ({ value, onChange }) => {
  const textareaRef = useRef(null);
  const promptContainerRef = useRef(null);
  const categoriesRef = useRef(null);
  const paginationRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [prompts, setPrompts] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedPrompts, setDisplayedPrompts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [promptsPerPage, setPromptsPerPage] = useState(10);
  const [isPromptSectionCollapsed, setIsPromptSectionCollapsed] = useState(true);
  const [promptContainerHeight, setPromptContainerHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPromptSectionReady, setIsPromptSectionReady] = useState(false);

  useEffect(() => {
    const uniqueCategories = [...new Set(Object.values(promptDefineMap).map(item => item.dir?.split('/')[0]).filter(Boolean))];
    setCategories(['全部', ...uniqueCategories]);
    handleCategoryClick('全部');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const calculatePromptsPerPage = () => {
      if (promptContainerRef.current && !isPromptSectionCollapsed) {
        const containerWidth = promptContainerRef.current.offsetWidth;
        const containerHeight = window.innerHeight * 0.4;
        const promptWidth = 120;
        const promptHeight = 32;
        const promptsPerRow = Math.floor(containerWidth / promptWidth);
        const maxRows = Math.floor(containerHeight / promptHeight);
        const maxPrompts = promptsPerRow * maxRows;
        setPromptsPerPage(Math.max(maxPrompts, 10));
        setPromptContainerHeight(maxRows * promptHeight);
        setIsPromptSectionReady(true);
      }
    };

    if (!isLoading && !isPromptSectionCollapsed) {
      calculatePromptsPerPage();
    }

    window.addEventListener('resize', calculatePromptsPerPage);

    return () => {
      window.removeEventListener('resize', calculatePromptsPerPage);
    };
  }, [isLoading, isPromptSectionCollapsed]);

  useEffect(() => {
    if (!isLoading) {
      const filteredPrompts = prompts.filter(prompt => 
        (prompt.lang_zh || prompt.text).toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedPrompts(filteredPrompts);
      setCurrentPage(1);
    }
  }, [searchTerm, prompts, selectedCategory, isLoading]);

  useEffect(() => {
    if (!isPromptSectionCollapsed) {
      setTimeout(() => {
        scrollToSelectedCategory();
        scrollToCurrentPage();
      }, 0);
    }
  }, [isPromptSectionCollapsed, selectedCategory, currentPage]);

  const scrollToSelectedCategory = () => {
    if (categoriesRef.current) {
      const selectedButton = categoriesRef.current.querySelector(`button[data-category="${selectedCategory}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const scrollToCurrentPage = () => {
    if (paginationRef.current) {
      const selectedButton = paginationRef.current.querySelector(`button[data-page="${currentPage}"]`);
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

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
    updateTags(e.target.value);
  };

  const updateTags = (text) => {
    const newTags = text.split(/[,，]/).map(tag => tag.trim()).filter(Boolean);
    setTags(newTags);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    let categoryPrompts;
    if (category === '全部') {
      categoryPrompts = Object.entries(promptDefineMap)
        .map(([key, item]) => ({ key, text: item.text, lang_zh: item.lang_zh }));
    } else {
      categoryPrompts = Object.entries(promptDefineMap)
        .filter(([_, item]) => item.dir?.startsWith(category))
        .map(([key, item]) => ({ key, text: item.text, lang_zh: item.lang_zh }));
    }
    setPrompts(categoryPrompts);
    setSearchTerm('');
    setCurrentPage(1);
    setDisplayedPrompts(categoryPrompts);
  };

  const handlePromptClick = (promptText) => {
    const currentTags = value.split(/[,，]/).map(tag => tag.trim());
    const promptIndices = currentTags.reduce((indices, tag, index) => {
      if (tag === promptText) indices.push(index);
      return indices;
    }, []);
    let newValue;
    
    if (promptIndices.length === 0) {
      // 如果提示词不存在，添加它
      newValue = value ? `${value}, ${promptText}` : promptText;
    } else {
      // 如果提示词已存在，移除所有该提示词
      newValue = currentTags.filter(tag => tag !== promptText).join(', ');
    }
    
    onChange({ target: { value: newValue } });
    updateTags(newValue);
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    const newValue = newTags.join(', ');
    onChange({ target: { value: newValue } });
    setTags(newTags);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedPrompts = displayedPrompts.slice(
    (currentPage - 1) * promptsPerPage,
    currentPage * promptsPerPage
  );

  const totalPages = Math.ceil(displayedPrompts.length / promptsPerPage);
  const hasResults = displayedPrompts.length > 0;

  const togglePromptSection = () => {
    setIsPromptSectionCollapsed(prev => !prev);
    setIsPromptSectionReady(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-1 text-blue-600 hover:text-blue-800">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </span>
        ))}
      </div>
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
            onClick={() => {
              onChange({ target: { value: '' } });
              setTags([]);
            }}
            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.707 6.707a1 1 0 011.414 0L10 8.586l1.879-1.879a1 1 0 111.414 1.414L11.414 10l1.879 1.879a1 1 0 01-1.414 1.414L10 11.414l-1.879 1.879a1 1 0 01-1.414-1.414L8.586 10 6.707 8.121a1 1 0 010-1.414z" />
            </svg>
          </button>
        )}
      </div>

      <div className="mb-3">
        <button
          onClick={togglePromptSection}
          className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200 shadow-sm"
        >
          <span className="flex items-center">提示词选择</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${isPromptSectionCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {!isPromptSectionCollapsed && !isLoading && (
        <div className="space-y-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索提示词..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="overflow-x-auto" ref={categoriesRef}>
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  data-category={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 flex-shrink-0 ${
                    selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {selectedCategory && (
            <div className="space-y-3">
              {totalPages > 1 && (
                <div className="overflow-x-auto" ref={paginationRef}>
                  <div className="flex items-center justify-start">
                    <div className="flex space-x-2 py-2 px-4 bg-gray-100 rounded-full">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          data-page={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                            currentPage === page
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div 
                ref={promptContainerRef} 
                className="bg-gray-50 rounded-lg p-3"
                style={{ 
                  height: isPromptSectionReady ? `${promptContainerHeight}px` : 'auto', 
                  maxHeight: '40vh',
                  overflowY: 'auto' 
                }}
              >
                <div className="flex flex-wrap gap-2">
                  {paginatedPrompts.map((prompt) => (
                    <button
                      key={prompt.key}
                      onClick={() => handlePromptClick(prompt.text)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${
                        tags.includes(prompt.text)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {prompt.lang_zh || prompt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromptInput;
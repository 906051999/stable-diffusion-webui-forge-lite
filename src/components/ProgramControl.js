import React, { useState, useEffect } from 'react';

const ProgramControl = ({ prompt, resolution, iterations, seed, onGenerate, onSkip }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isGenerating) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isGenerating]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    onGenerate({ prompt, resolution, iterations, seed });
  };

  const handleSkip = () => {
    setIsGenerating(false);
    setProgress(0);
    onSkip();
  };

  return (
    <div className="flex items-center space-x-4 w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={handleGenerate}
        className="flex-grow px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg text-lg font-semibold relative overflow-hidden"
        disabled={isGenerating}
      >
        <div className="relative z-10">
          {isGenerating ? `生成中... ${progress}%` : '生成'}
        </div>
        {isGenerating && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          </div>
        )}
      </button>
      {isGenerating && (
        <button
          onClick={handleSkip}
          className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg text-lg font-semibold"
        >
          跳过
        </button>
      )}
    </div>
  );
};

export default ProgramControl;

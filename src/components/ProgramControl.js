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
    <div className="flex flex-col items-center space-y-4">
      {!isGenerating ? (
        <button
          onClick={handleGenerate}
          className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md"
        >
          生成
        </button>
      ) : (
        <div className="w-full space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-in-out flex items-center justify-center text-xs font-semibold text-white"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-md"
          >
            跳过
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgramControl;

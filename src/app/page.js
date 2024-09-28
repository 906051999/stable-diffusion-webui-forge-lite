"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PromptInput from '../components/PromptInput';
import ResolutionSelector from '../components/ResolutionSelector';
import IterationSelector from '../components/IterationSelector';
import LoraModelSelector from '../components/LoraModelSelector';
import ProgramControl from '../components/ProgramControl';
import ImageGallery from '../components/ImageGallery';
import TaskQueue from '../components/TaskQueue';
import { txt2img, skip, getLoras, getProgress } from '../lib/sdApi';
import SeedSelector from '../components/SeedSelector';

export default function Home() {
  const [state, setState] = useState({
    model: "flux1-dev-bnb-nf4-v2",
    prompt: '',
    resolution: '16:9',
    iterations: 20,
    progress: 0,
    images: [],
    tasks: [],
    loras: [],
    seed: -1,
    activeTab: 'txt2img'
  });

  useEffect(() => {
    async function fetchLoras() {
      const loraModels = await getLoras();
      setState(prev => ({ ...prev, loras: Array.isArray(loraModels) ? loraModels : [] }));
    }
    fetchLoras();
  }, []);

  const handleGenerate = async (params) => {
    const generation = await txt2img(params);
    setState(prev => ({ ...prev, tasks: [...prev.tasks, generation.id] }));

    const interval = setInterval(async () => {
      const prog = await getProgress(generation.id);
      setState(prev => ({ ...prev, progress: prog }));
      if (prog >= 100) {
        clearInterval(interval);
        const result = await generation.getResult();
        setState(prev => ({
          ...prev,
          images: [...prev.images, ...result.images],
          tasks: prev.tasks.filter(id => id !== generation.id),
          progress: 0
        }));
      }
    }, 1000);
  };

  const handleSkip = async () => {
    await skip();
    setState(prev => ({ ...prev, progress: 0 }));
  };

  const updateState = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const renderTabContent = () => {
    switch (state.activeTab) {
      case 'txt2img':
        return (
          <>
            <div className="mb-4 p-3 bg-gray-100 rounded-lg shadow-sm">
              <span className="font-semibold text-gray-700">当前模型：</span>
              <span className="text-blue-600">{state.model || '未选择'}</span>
            </div>
            <PromptInput value={state.prompt} onChange={(e) => updateState('prompt', e.target.value)} />
            <LoraModelSelector models={state.loras} onSelect={(model) => updateState('prompt', `${state.prompt} ${model.tag}`)} />
            <div className="flex flex-wrap gap-4">
              <ResolutionSelector value={state.resolution} onChange={(e) => updateState('resolution', e.target.value)} />
              <IterationSelector value={state.iterations} onChange={(e) => updateState('iterations', e.target.value)} />
              <SeedSelector seed={state.seed} setSeed={(value) => updateState('seed', value)} />
              <ProgramControl
              {...state}
              onGenerate={handleGenerate}
              onSkip={handleSkip}
            />
            </div>
          </>
        );
      case 'gallery':
        return <ImageGallery images={state.images} onImageClick={(image) => console.log(image)} />;
      case 'taskQueue':
        return <TaskQueue tasks={state.tasks} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 md:p-12 lg:p-20">
      <main className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <nav className="mb-6">
          <ul className="flex border-b border-gray-200">
            {['txt2img', 'gallery', 'taskQueue'].map((tab) => (
              <li key={tab} className="flex-1">
                <button
                  className={`w-full px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                    state.activeTab === tab
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => updateState('activeTab', tab)}
                >
                  {tab === 'txt2img' ? '文生图' : tab === 'gallery' ? '图库' : '任务队列'}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="space-y-4">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}
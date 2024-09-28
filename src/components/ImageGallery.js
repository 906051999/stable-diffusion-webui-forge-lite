import React, { useState } from 'react';

const ImageGallery = ({ images, onImageClick }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onImageClick(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = selectedImage.src;
    link.download = selectedImage.alt || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 预设图片
  const presetImages = [
    { id: 'preset1', src: '/images/test.png', alt: '预设图片1', createdAt: '2023-06-01 10:30:45', prompt: 'sleeping blue hair girl in a cozy sweater laying on floor surrounded by a sleeping cat,viewed from above,long flowing hair, ,casting shadows style' },
  ];

  const allImages = [...presetImages, ...images];

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {allImages.map((image, index) => (
            <div 
              key={image.id || image.src} 
              className="relative cursor-pointer group overflow-hidden rounded-lg shadow-md transition duration-300 transform hover:scale-105"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-40 object-cover transition duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  查看详情
                </p>
              </div>
              <div className="absolute top-2 right-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 w-6 h-6 flex items-center justify-center text-xs font-semibold rounded-full shadow-sm transition-all duration-200 hover:scale-105 opacity-80 hover:opacity-100">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 flex flex-col max-h-[90vh]">
            <div className="p-4 border-b overflow-y-auto">
              {selectedImage.prompt && (
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Prompt:</span>
                  <p className="mt-1 whitespace-pre-wrap select-text">{selectedImage.prompt}</p>
                </div>
              )}
            </div>
            <div className="flex-grow p-4 overflow-y-auto flex items-center justify-center">
              <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex justify-between items-center p-4 border-t">
              {selectedImage.alt && selectedImage.createdAt && (
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 truncate">名称: <span className="font-semibold">{selectedImage.alt}</span></p>
                  <p className="text-sm text-gray-600">创建时间: <span className="font-semibold">{selectedImage.createdAt}</span></p>
                </div>
              )}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button onClick={downloadImage} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition duration-300">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <button onClick={closeModal} className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-2 transition duration-300">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
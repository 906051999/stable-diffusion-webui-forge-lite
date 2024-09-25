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
    { id: 'preset1', src: '/images/test.png', alt: '预设图片1', ratio: '16:9', createdAt: '2023-06-01 10:30:45' },
    { id: 'preset2', src: '/images/test.png', alt: '预设图片2', ratio: '4:3', createdAt: '2023-06-02 15:20:30' },
    { id: 'preset3', src: '/images/test.png', alt: '预设图片3', ratio: '1:1', createdAt: '2023-06-03 09:45:15' },
    { id: 'preset4', src: '/images/test.png', alt: '预设图片4', ratio: '1:1', createdAt: '2023-06-03 11:22:33' },
    { id: 'preset5', src: '/images/test.png', alt: '预设图片5', ratio: '1:1', createdAt: '2023-06-03 14:05:50' },
    { id: 'preset6', src: '/images/test.png', alt: '预设图片6', ratio: '1:1', createdAt: '2023-06-03 16:40:12' },
    { id: 'preset7', src: '/images/test.png', alt: '预设图片7', ratio: '1:1', createdAt: '2023-06-03 18:55:28' },
    { id: 'preset8', src: '/images/test.png', alt: '预设图片8', ratio: '1:1', createdAt: '2023-06-03 20:10:05' },
    { id: 'preset9', src: '/images/test.png', alt: '预设图片9', ratio: '1:1', createdAt: '2023-06-03 22:30:40' },
    { id: 'preset10', src: '/images/test.png', alt: '预设图片10', ratio: '1:1', createdAt: '2023-06-04 01:15:55' },
    { id: 'preset11', src: '/images/test.png', alt: '预设图片11', ratio: '1:1', createdAt: '2023-06-04 03:40:20' },
  ];

  const allImages = [...presetImages, ...images];

  return (
    <>
      <div className="h-[calc(100vh-200px)] overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {allImages.map((image) => (
            <div key={image.id || image.src} className="relative cursor-pointer" onClick={() => handleImageClick(image)}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover rounded hover:opacity-75 transition"
              />
              {image.ratio && image.createdAt && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs">
                  <p>{image.ratio}</p>
                  <p>{image.createdAt}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          <div className="max-w-3xl w-full">
          <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-[80vh] object-contain" />
            <div className="flex justify-between items-center bg-black bg-opacity-50 text-white p-2 mb-2">
              {selectedImage.ratio && selectedImage.createdAt && (
                <div>
                  <p className="text-sm">比例: {selectedImage.ratio}</p>
                  <p className="text-sm">创建时间: {selectedImage.createdAt}</p>
                </div>
              )}
              <div className="flex items-center">
                <button onClick={downloadImage} className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition mr-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <button onClick={closeModal} className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
       
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
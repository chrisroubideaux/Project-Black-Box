// OpenCV.js component
import Script from 'next/script';
import { useEffect } from 'react';

// TypeScript declaration for OpenCV.js global `cv` variable
declare global {
  interface Window {
    cv: unknown; 
  }
}

const OpenCV: React.FC = () => {
  useEffect(() => {
    const checkOpenCVLoaded = () => {
      if (typeof window.cv === 'undefined') {
        console.error('OpenCV.js is not loaded!');
      } else {
        console.log('OpenCV.js is loaded successfully!');
      }
    };

    // Check if OpenCV.js is already loaded
    if (window.cv) {
      checkOpenCVLoaded();
    } else {
      // Add event listener for when OpenCV.js finishes loading
      document.addEventListener('opencv.js-loaded', checkOpenCVLoaded);
    }

    // Cleanup event listener when the component is unmounted
    return () => {
      document.removeEventListener('opencv.js-loaded', checkOpenCVLoaded);
    };
  }, []);

  return (
    <>
      <h1>OpenCV.js in Next.js</h1>
      <Script
        src="https://docs.opencv.org/4.x/opencv.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('OpenCV.js script loaded.');
          const event = new Event('opencv.js-loaded');
          document.dispatchEvent(event); // Dispatch custom event when OpenCV.js is ready
        }}
        onError={(e: Event) => {
          console.error('Error loading OpenCV.js', e);
        }}
      />
      <div id="output"></div>
    </>
  );
};

export default OpenCV;


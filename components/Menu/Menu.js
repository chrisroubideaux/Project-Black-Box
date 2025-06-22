// Viedo player component
'use client';

const Menu = () => {
  <div>
    <h1>Menu</h1>
  </div>;
};

export default Menu;

{
  /*
import { useEffect, useRef } from 'react';
import videojs from 'video.js';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      // Initialize Video.js player
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        responsive: true,
        fluid: true,
      });
    }

    // Cleanup on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div>
   
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          playsInline
        />
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="menu">
      <VideoPlayer />
    </div>
  );
};

export default Menu;
*/
}

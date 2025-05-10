// Viedo player component
'use client';
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { FaInstagramSquare, FaYoutubeSquare, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Menu = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      responsive: true,
      fluid: true,
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <video
        ref={videoRef}
        className="video-js"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        className="pt-5"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          textAlign: 'center',
          padding: '10px 0',
        }}
      >
        <p className="nav d-block fs-xs text-center text-light pb-2 mb-0 ">
          &copy;2025, All rights reserved.
          <Link
            className="text-light nav-link d-inline-block p-0"
            href="/"
            rel="noopener"
          >
            Black Box
          </Link>
        </p>
        <div className="m-2">
          <Link href="#!" className="me-2">
            <FaInstagramSquare className="social-icons mt-1" />
          </Link>
          <Link href="#!" className="me-2">
            <FaYoutubeSquare className="social-icons mt-1" />
          </Link>
          <Link
            href="https://github.com/chrisroubideaux/Project-Black-Box"
            className="me-2"
          >
            <FaGithub className="social-icons mt-1" />
          </Link>
        </div>
      </div>
    </div>
  );
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

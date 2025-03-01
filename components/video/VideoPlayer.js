// Player video

'use client';
import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaRegHeart,
  FaShare,
  FaBookmark,
} from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

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

  // Toggle play/pause
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  // Toggle mute
  const handleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  // Full-screen toggle
  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <div className="container">
      <div
        className="pt-3"
        style={{ position: 'relative', width: '100%', height: '100vh' }}
      >
        <video
          ref={videoRef}
          className="video-js"
          style={{
            width: '700px',
            height: '65vh',
            objectFit: 'cover',
            borderRadius: '30px',
          }}
        />

        <div
          className=""
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <h5 className=" font-bold text-white align-middle">Video Title</h5>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="btn btn-sm bg-transparent"
            >
              {playing ? (
                <FaPause className="social-icon" />
              ) : (
                <FaPlay className="social-icon" />
              )}
            </button>
            <button onClick={handleMute} className="btn btn-sm bg-transparent">
              {muted ? (
                <FaVolumeMute className="social-icon" />
              ) : (
                <FaVolumeUp className="social-icon" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="btn btn-sm bg-transparent">
              <FaRegHeart className="social-icon" />
            </button>
            <button className="btn btn-sm bg-transparent">
              <FaShare className="social-icon" />
            </button>
            <button className="btn btn-sm bg-transparent">
              <FaBookmark className="social-icon" />
            </button>
            <button
              onClick={handleFullScreen}
              className="btn btn-sm bg-transparent"
            >
              <FaExpand className="social-icon" />
            </button>
            <button className="btn btn-sm bg-transparent">
              <IoMdSettings className="social-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

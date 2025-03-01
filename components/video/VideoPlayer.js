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
  FaAngleRight,
  FaClosedCaptioning,
  FaTable,
  FaChromecast,
} from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: false,
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
    <div className="pt-5">
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
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
            className="absolute bottom-5 left-0 right-0 mx-auto flex justify-center items-center space-x-4 w-full"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '10px',
              borderRadius: '30px',
              width: '700px',
              height: '65vh',
              textAlign: 'center',
            }}
          >
            {/* All icons in a single flex container */}
            <button
              onClick={handlePlayPause}
              className="btn btn-sm bg-transparent text-white"
            >
              {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button
              onClick={handleMute}
              className="btn btn-sm bg-transparent text-white"
            >
              {muted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>
            <button className="btn btn-sm bg-transparent text-white">
              <FaAngleRight size={20} />
            </button>
            <button className="btn btn-sm bg-transparent text-white">
              <FaClosedCaptioning size={20} />
            </button>
            <button className="btn btn-sm bg-transparent text-white">
              <FaTable size={20} />
            </button>
            <button className="btn btn-sm bg-transparent text-white">
              <FaChromecast size={20} />
            </button>
            <button
              onClick={handleFullScreen}
              className="btn btn-sm bg-transparent text-white"
            >
              <FaExpand size={20} />
            </button>
            <button className="btn btn-sm bg-transparent text-white">
              <IoMdSettings size={20} />
            </button>
          </div>
        </div>
        <h5 className="text-white font-bold mb-2">Video Title</h5>
      </div>
    </div>
  );
};

export default VideoPlayer;

{
  /*
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
*/
}

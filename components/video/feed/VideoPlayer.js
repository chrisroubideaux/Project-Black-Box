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
import { Tab } from '../Tab';
import { Tooltip } from 'bootstrap';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

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
      <div className="relative flex justify-center items-center">
        <video
          ref={videoRef}
          className="video-js"
          style={{
            backgroundImage: 'url(/images/videos/demo.png)',
            width: '700px',
            height: '65vh',
            objectFit: 'cover',
            borderRadius: '30px',
          }}
        />
        <div
          className="absolute bottom-3 left-0 right-0 flex justify-center items-center space-x-4 p-3"
          style={{
            backgroundImage: 'url(/images/videos/demo.png)',
            padding: '10px',
            borderRadius: '30px',
            width: '700px',
            height: '65vh',
            textAlign: 'center',
          }}
        >
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
          <button
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Closed Captioning"
          >
            <FaClosedCaptioning size={20} />
          </button>

          <button
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Mini player"
          >
            <FaTable size={20} />
          </button>

          <button
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Play on TV"
          >
            <FaChromecast size={20} />
          </button>
          <button
            onClick={handleFullScreen}
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Fullscreen"
          >
            <FaExpand size={20} />
          </button>
          <button
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Settings"
          >
            <IoMdSettings size={20} />
          </button>
        </div>
      </div>
      <Tab />
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
  FaAngleRight,
  FaClosedCaptioning,
  FaTable,
  FaChromecast,
} from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { Tab } from '../Tab';

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
      <div className="relative flex justify-center items-center">
        <video
          ref={videoRef}
          className="video-js"
          style={{
            backgroundImage: 'url(/images/videos/demo.png)',
            width: '700px',
            height: '65vh',
            objectFit: 'cover',
            borderRadius: '30px',
          }}
        />
        <div
          className="absolute bottom-3 left-0 right-0 flex justify-center items-center space-x-4 p-3"
          style={{
            backgroundImage: 'url(/images/videos/demo.png)',
            padding: '10px',
            borderRadius: '30px',
            width: '700px',
            height: '65vh',
            textAlign: 'center',
          }}
        >
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
          <button
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Closed Captioning"
          >
            <FaClosedCaptioning size={20} />
          </button>

          <button
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Mini player"
          >
            <FaTable size={20} />
          </button>

          <button
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Play on TV"
          >
            <FaChromecast size={20} />
          </button>
          <button
            onClick={handleFullScreen}
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Fullscreen"
          >
            <FaExpand size={20} />
          </button>
          <button
            className="btn btn-sm text-white"
            data-bs-toggle="tooltip"
            title="Settings"
          >
            <IoMdSettings size={20} />
          </button>
        </div>
      </div>
      <Tab />
    </div>
  );
};

export default VideoPlayer;

*/
}

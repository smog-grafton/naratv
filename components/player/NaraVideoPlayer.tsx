'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Play } from 'lucide-react';
import PlayerControls from './PlayerControls';
import PlayerContentSwitcher from './PlayerContentSwitcher';
import PlayerSettingsMenu from './PlayerSettingsMenu';

const Player = dynamic(() => import('react-player'), { ssr: false }) as any;

interface NaraVideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  isLive?: boolean;
}

export default function NaraVideoPlayer({ src, poster, title, isLive = false }: NaraVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(true);
  const [showContentSwitcher, setShowContentSwitcher] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsHovering(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (isPlaying) {
        hideTimerRef.current = setTimeout(() => setIsHovering(false), 3000);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', () => {
        if (isPlaying) setIsHovering(false);
      });
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        container.removeEventListener('mouseleave', () => {});
      }
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (state: { playedSeconds: number; loadedSeconds: number }) => {
    if (!isBuffering) {
      setCurrentTime(state.playedSeconds);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (value: number) => {
    setCurrentTime(value);
    playerRef.current?.seekTo(value, 'seconds');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (value === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  const skipForward = () => {
    const newTime = Math.min(duration, currentTime + 10);
    handleSeek(newTime);
  };
  
  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 10);
    handleSeek(newTime);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-black flex flex-col group overflow-hidden" 
      style={{ aspectRatio: isFullscreen ? 'auto' : '16/9', height: isFullscreen ? '100vh' : 'auto', maxHeight: isFullscreen ? 'none' : '85vh' }}
    >
      <div 
        className="w-full h-full cursor-pointer absolute inset-0 z-0 bg-black"
        onClick={togglePlay}
      >
        <Player
          ref={playerRef}
          url={src}
          width="100%"
          height="100%"
          playing={isPlaying}
          playbackRate={playbackRate}
          volume={volume}
          muted={isMuted}
          onReady={() => setIsReady(true)}
          onBuffer={() => setIsBuffering(true)}
          onBufferEnd={() => setIsBuffering(false)}
          onError={() => setHasError(true)}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={() => setIsPlaying(false)}
          playsinline
          config={{
            file: {
              attributes: {
                poster: poster,
              }
            }
          }}
        />
      </div>

      {hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 text-white pointer-events-none">
          <div className="text-center max-w-sm px-4">
            <h3 className="text-xl font-bold mb-2">Stream Unavailable</h3>
            <p className="text-gray-400 text-sm">Please check back when the event goes live, or try a different source.</p>
            {/* BACKEND INTEGRATION: Could trigger a retry or fetch alternative stream endpoint here */}
          </div>
        </div>
      )}

      {isBuffering && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 border-4 border-white/20 border-t-[#eaff04] rounded-full animate-spin"></div>
        </div>
      )}

      {/* Paused Overlay */}
      {!isPlaying && isReady && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm">
          <div className="text-center flex flex-col items-center mb-16">
            <h2 className="text-white text-2xl md:text-4xl font-bold tracking-tight mb-3 drop-shadow-lg">{title}</h2>
            <div className="flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300 drop-shadow-md">
               <span className="bg-[#eaff04] text-black px-2 py-0.5 rounded-sm">Premium</span>
               <span>Nara Boxing</span>
               <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
               <span>2024</span>
               {!isLive && <span className="w-1 h-1 bg-gray-500 rounded-full"></span>}
               {!isLive && <span className="font-mono text-gray-400">Duration Info</span>}
            </div>
            
            <button 
              onClick={togglePlay}
              className="mt-8 pointer-events-auto w-16 h-16 md:w-20 md:h-20 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all group backdrop-blur-md"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-current group-hover:scale-110 transition-transform ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Overlay gradient for controls */}
      <div 
        className={`absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none transition-opacity duration-300 ${
          isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Title Bar inside player */}
      <div 
        className={`absolute top-0 left-0 right-0 z-20 p-4 md:p-6 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
          isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex-1" />
        {isLive && (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider animate-pulse shadow-lg">
            Live
          </span>
        )}
      </div>

      {/* Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 transition-opacity duration-300 ${
           isHovering || !isPlaying || showSettingsMenu || showContentSwitcher ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <PlayerControls 
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={handleVolumeChange}
          toggleMute={toggleMute}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          isLive={isLive}
          skipForward={skipForward}
          skipBackward={skipBackward}
          onToggleContentSwitcher={() => {
            setShowSettingsMenu(false);
            setShowContentSwitcher(!showContentSwitcher);
          }}
          onToggleSettings={() => {
            setShowContentSwitcher(false);
            setShowSettingsMenu(!showSettingsMenu);
          }}
        />
        
        {showSettingsMenu && (
          <div className="absolute bottom-[80px] right-4 md:right-6 z-30">
            <PlayerSettingsMenu 
              onClose={() => setShowSettingsMenu(false)} 
              isLive={isLive}
              currentSpeed={playbackRate}
              onSpeedChange={setPlaybackRate}
            />
          </div>
        )}
      </div>

      {/* Content Switcher Overlay */}
      {showContentSwitcher && (
        <div 
          className="absolute inset-0 z-30 bg-black/90 flex items-center justify-center backdrop-blur-sm transition-all duration-300 pb-10"
          onClick={() => setShowContentSwitcher(false)}
        >
           <div onClick={e => e.stopPropagation()}>
             <PlayerContentSwitcher onClose={() => setShowContentSwitcher(false)} />
           </div>
        </div>
      )}
    </div>
  );
}

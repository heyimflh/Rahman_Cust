import { useState, useCallback, useRef, useEffect } from "react";

type MediaState = "playing" | "paused" | "stopped";

// Basic global state to coordinate media across components without context overhead
let globalVideoPlayingId: string | null = null;
let listeners: Array<(videoId: string | null) => void> = [];

const notifyListeners = (videoId: string | null) => {
  listeners.forEach(l => l(videoId));
};

export function useMediaCoordinator(id: string, isVideo: boolean = false) {
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRef = useRef<HTMLMediaElement | null>(null);

  useEffect(() => {
    const handleGlobalPlay = (playingVideoId: string | null) => {
      // If a video starts playing, and THIS is not that video, pause it.
      // If THIS is background music (isVideo=false) and ANY video is playing, pause it.
      if (playingVideoId !== null && playingVideoId !== id) {
        if (isPlaying && mediaRef.current) {
          mediaRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    listeners.push(handleGlobalPlay);
    return () => {
      listeners = listeners.filter(l => l !== handleGlobalPlay);
      // If this video unmounts while playing, clear the global state
      if (globalVideoPlayingId === id) {
        globalVideoPlayingId = null;
        notifyListeners(null);
      }
    };
  }, [id, isPlaying]);

  const play = useCallback(async () => {
    if (mediaRef.current) {
      try {
        await mediaRef.current.play();
        setIsPlaying(true);
        if (isVideo) {
          globalVideoPlayingId = id;
          notifyListeners(id);
        }
      } catch (err) {
        console.warn(`Playback failed for ${id}:`, err);
        setIsPlaying(false);
      }
    }
  }, [id, isVideo]);

  const pause = useCallback(() => {
    if (mediaRef.current) {
      mediaRef.current.pause();
      setIsPlaying(false);
      if (isVideo && globalVideoPlayingId === id) {
        globalVideoPlayingId = null;
        notifyListeners(null);
      }
    }
  }, [id, isVideo]);
  
  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Sync internal state with DOM state in case of native controls usage
  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;

    const onPlay = () => {
      setIsPlaying(true);
      if (isVideo) {
        globalVideoPlayingId = id;
        notifyListeners(id);
      }
    };
    const onPause = () => {
      setIsPlaying(false);
      if (isVideo && globalVideoPlayingId === id) {
        globalVideoPlayingId = null;
        notifyListeners(null);
      }
    };

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [id, isVideo]);

  return {
    mediaRef,
    isPlaying,
    play,
    pause,
    toggle
  };
}

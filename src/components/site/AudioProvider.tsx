import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import backgroundAudioUrl from "@/assets/background-audio.mp3";

const KEY = "rm-entered";
const TARGET_VOLUME = 0.35;

type AudioContextValue = {
  soundOn: boolean;
  hasChosen: boolean;
  enter: (soundOn: boolean) => void;
  toggle: () => void;
  duck: () => void;
  unduck: () => void;
};

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [hasChosen, setHasChosen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const already = sessionStorage.getItem(KEY);
    if (already) {
      setHasChosen(true);
      setSoundOn(already === "sound");
      if (already === "sound") audioRef.current?.play().catch(() => {});
    }
  }, []);

  const fadeTo = (target: number, thenPause = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    const step = () => {
      if (!audio) return;
      const diff = target - audio.volume;
      if (Math.abs(diff) < 0.02) {
        audio.volume = target;
        if (thenPause) audio.pause();
        return;
      }
      audio.volume += diff * 0.15;
      requestAnimationFrame(step);
    };
    step();
  };

  const startPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.play().then(() => fadeTo(TARGET_VOLUME)).catch(() => {});
  };

  const enter = (on: boolean) => {
    sessionStorage.setItem(KEY, on ? "sound" : "muted");
    setHasChosen(true);
    setSoundOn(on);
    if (on) startPlayback();
  };

  const toggle = () => {
    const next = !soundOn;
    sessionStorage.setItem(KEY, next ? "sound" : "muted");
    setSoundOn(next);
    if (next) startPlayback();
    else fadeTo(0, true);
  };

  const duck = () => audioRef.current?.pause();
  const unduck = () => {
    if (soundOn) audioRef.current?.play().catch(() => {});
  };

  return (
    <AudioCtx.Provider value={{ soundOn, hasChosen, enter, toggle, duck, unduck }}>
      <audio ref={audioRef} src={backgroundAudioUrl} loop preload="auto" />
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}

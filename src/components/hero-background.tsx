"use client";
import { useEffect, useRef, useState } from "react";
type BackgroundProps = { image?: string; video?: string; poster?: string };

/** Video is opt-in; a poster remains visible when motion is reduced or playback fails. */
export function HeroBackground({ image, video, poster }: BackgroundProps) {
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  function toggle() {
    const element = videoRef.current;
    if (!element) return;
    if (paused) {
      void element
        .play()
        .then(() => setPaused(false))
        .catch(() => setPaused(true));
    } else {
      element.pause();
      setPaused(true);
    }
  }
  return (
    <>
      <div className="hero-background" aria-hidden="true">
        {(poster || image) && (
          <img src={poster || image} alt="" className="hero-media" />
        )}
        {video && motionAllowed && (
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster={poster || image}
            onError={() => setMotionAllowed(false)}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
        <div className="hero-grid" />
        <div className="hero-shade" />
      </div>
      {video && motionAllowed && (
        <button className="video-toggle" onClick={toggle}>
          {paused ? "Reproducir fondo" : "Pausar fondo"}
        </button>
      )}
    </>
  );
}

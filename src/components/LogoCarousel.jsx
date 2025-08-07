import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [
  "/logoimages/hive-logo.svg",
  "/logoimages/brand-alpha.png",
  "/logoimages/brand-vaillant.png",
  "/logoimages/MainheatingLogo_RGB.png",
  "/logoimages/worcester.png",
  "/logoimages/brand-vaillant.png",
  "/logoimages/hive-logo.svg",
  "/logoimages/brand-alpha.png",
];

export default function LogoCarousel() {
  const trackRef = useRef(null);
  const totalWidth = useRef(0);
  const xOffset = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragStartOffset = useRef(0);
  const requestRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const imgs = track.querySelectorAll("img");
    const waitForImages = Array.from(imgs).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        })
    );

    Promise.all(waitForImages).then(() => {
      if (!trackRef.current) return;
      totalWidth.current = trackRef.current.scrollWidth / 2;
      xOffset.current = 0;
      gsap.set(trackRef.current, { x: xOffset.current });
      startAnimation();
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(requestRef.current);
      } else {
        startAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(requestRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const startAnimation = () => {
    let lastTime = 0;
    const speed = 0.5;

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!isDragging.current) {
        xOffset.current -= speed * (delta / 16); // Normalize to 60fps
        wrapAround();
        if (trackRef.current) {
          gsap.set(trackRef.current, { x: xOffset.current });
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
  };

  const wrapAround = () => {
    if (xOffset.current <= -totalWidth.current) {
      xOffset.current += totalWidth.current;
    } else if (xOffset.current >= 0) {
      xOffset.current -= totalWidth.current;
    }
  };

  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches[0].clientX;
    dragStartOffset.current = xOffset.current;
    document.body.style.cursor = "grabbing";
  };

  const handleMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const delta = currentX - startX.current;
    xOffset.current = dragStartOffset.current + delta;
    if (trackRef.current) {
      gsap.set(trackRef.current, { x: xOffset.current });
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
    document.body.style.cursor = "";
  };

  return (
    <div
      className="w-full overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 py-1 h-30"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-amber-500 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-amber-600 to-transparent pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-16 px-4 items-center select-none"
          style={{
            willChange: "transform",
            cursor: isDragging.current ? "grabbing" : "grab",
          }}
        >
          {[...logos, ...logos].map((src, i) => (
            <div key={i} className="flex-shrink-0">
              <img
                src={src}
                alt={`logo-${i}`}
                className="w-28 h-28 object-contain opacity-90 hover:opacity-100 hover:scale-105 transition-transform duration-300"
                loading="eager"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  autoPlayInterval?: number;
  heightClass?: string; // e.g. "h-48" or "h-96"
  isMobile?: boolean;
}

export default function ImageCarousel({
  images,
  autoPlayInterval = 4000,
  heightClass = "h-48",
  isMobile = false
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, images.length, autoPlayInterval]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`w-full ${heightClass} bg-zinc-900 flex items-center justify-center text-zinc-600 font-mono text-xs`}>
        No Images Available
      </div>
    );
  }

  // Animation variants for smooth sliding
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <div className={`relative w-full ${heightClass} bg-zinc-950 overflow-hidden group select-none flex items-center justify-center`}>
      {/* Sliding Image Animation Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {isMobile ? (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              className="relative h-[95%] aspect-[19.5/40] bg-black rounded-[2.5rem] p-1.5 shadow-2xl z-10 transition-all duration-300 group-hover:scale-[1.02] flex items-center justify-center border-[3px] border-[#434B5D]"
              style={{
                boxShadow: "inset 0 0 4px 1px rgba(255,255,255,0.2), 0 20px 40px -10px rgba(0,0,0,0.8)"
              }}
            >
              {/* Hardware Buttons */}
              <div className="absolute -left-[5px] top-[15%] w-1 h-6 bg-[#434B5D] rounded-l-md" /> {/* Mute */}
              <div className="absolute -left-[5px] top-[22%] w-1 h-10 bg-[#434B5D] rounded-l-md" /> {/* Volume Up */}
              <div className="absolute -left-[5px] top-[30%] w-1 h-10 bg-[#434B5D] rounded-l-md" /> {/* Volume Down */}
              <div className="absolute -right-[5px] top-[25%] w-1 h-12 bg-[#434B5D] rounded-r-md" /> {/* Power */}

              <div className="relative w-full h-full bg-zinc-900 rounded-[2.2rem] overflow-hidden border-[4px] border-black">
                <img
                  src={images[currentIndex]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  alt={`Carousel screen ${currentIndex + 1}`}
                />
              </div>
            </motion.div>
          ) : (
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              referrerPolicy="no-referrer"
              className="absolute w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.02]"
              alt={`Carousel screen ${currentIndex + 1}`}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />

      {/* Dark gradient edge vignettes */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Next/Prev Navigation Buttons (Hidden on touch, shown on group-hover) */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-black/80 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-black/80 hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Interactive Bottom Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleDotClick(idx, e)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? "w-4.5 bg-cyan-400" : "w-1.5 bg-zinc-500/60 hover:bg-zinc-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

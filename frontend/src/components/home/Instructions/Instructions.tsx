import { useState, useRef, type TouchEvent } from "react";
import CloseCross from "../../common/CloseCross/CloseCross";
import OutlineButton from "../../common/OutlineButton/OutlineButton";
import css from "./Instructions.module.css";

type Props = {
  selectedTool: "a" | "b" | "c";
  onClose: () => void;
};

export default function Instructions({ selectedTool, onClose }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const images = [
    { src: "/instructions/1.png", alt: "Instruction step 1" },
    { src: "/instructions/2.png", alt: "Instruction step 2" },
    {
      src: `/instructions/${selectedTool}.png`,
      alt: `Instruction step 3 - ${selectedTool}`,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && currentSlide < images.length - 1) {
        // Swipe left - next slide
        nextSlide();
      } else if (swipeDistance < 0 && currentSlide > 0) {
        // Swipe right - previous slide
        prevSlide();
      }
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.closeButton} onClick={onClose}>
          <CloseCross color="dark" />
        </div>

        {/* Desktop view - все картинки в ряд */}
        <div className={css.desktopView}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={css.card}
            />
          ))}
        </div>

        {/* Mobile slider view */}
        <div className={css.sliderView}>
          <div
            className={css.sliderContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={css.sliderTrack}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className={css.slide}>
                  <img src={image.src} alt={image.alt} className={css.card} />
                </div>
              ))}
            </div>

            {/* Desktop/tablet navigation arrows - positioned absolutely */}
            {currentSlide > 0 && (
              <div className={css.prevButton}>
                <OutlineButton onClick={prevSlide}>
                  <img src="/small-left-arrow-dark.png" alt="Previous" />
                </OutlineButton>
              </div>
            )}
            {currentSlide < images.length - 1 && (
              <div className={css.nextButton}>
                <OutlineButton onClick={nextSlide}>
                  <img src="/small-right-arrow-dark.png" alt="Next" />
                </OutlineButton>
              </div>
            )}
          </div>

          {/* Mobile navigation under slider */}
          <div className={css.mobileNavigation}>
            {currentSlide > 0 && (
              <OutlineButton onClick={prevSlide}>
                <img src="/small-left-arrow-dark.png" alt="Previous" />
              </OutlineButton>
            )}
            {currentSlide < images.length - 1 && (
              <OutlineButton onClick={nextSlide}>
                <img src="/small-right-arrow-dark.png" alt="Next" />
              </OutlineButton>
            )}
          </div>

          {/* Dots indicator */}
          <div className={css.dotsContainer}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${css.dot} ${
                  index === currentSlide ? css.activeDot : ""
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

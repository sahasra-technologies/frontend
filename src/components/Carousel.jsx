import Carousel from "react-spring-3d-carousel";
import { useState, useEffect, useRef } from "react";
import { config } from "react-spring";

export default function Carroussel(props) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(4);
  const [showArrows, setShowArrows] = useState(false);
  const [cards] = useState(table);
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null);
  const activeCardRef = useRef(props.activeCard);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);
  const [goToSlide, setGoToSlide] = useState(props.activeCard);

  useEffect(() => {
    activeCardRef.current = props.activeCard;
  }, [props.activeCard]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGoToSlide((activeCardRef.current + 1) % cards.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [cards.length]);

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
    clearInterval();
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      if (touchEndX < touchStartX) {
        setGoToSlide((activeCardRef.current + 1) % cards.length);
      } else if (touchEndX > touchStartX) {
        setGoToSlide(
          activeCardRef.current === 0
            ? cards.length - 1
            : activeCardRef.current - 1
        );
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };
  return (
    <div
      style={{ width: props.width, height: props.height, margin: props.margin }}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
}

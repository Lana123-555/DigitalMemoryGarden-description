import css from "./InteractiveMap.module.css";
import popoverCss from "./popover.module.css";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { getAllMapEvents } from "../../../services/mapEvent";
import type { MapEvent } from "../../../types/mapEvent";

// Просте форматування дати (dd.MM.yyyy)
function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("uk-UA");
}

type InteractiveMapProps = {
  mapImage: string;
  className?: string;
  showMobileVersion?: boolean;
};

export default function InteractiveMap({
  mapImage,
  className = "",
  showMobileVersion = false,
}: InteractiveMapProps) {
  const [events, setEvents] = useState<MapEvent[]>([]);
  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);
  const [visibleFlowers, setVisibleFlowers] = useState<Set<string>>(new Set());
  const mapRef = useRef<HTMLDivElement>(null);
  const mapMobileRef = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(600);
  const [mapWidthMobile, setMapWidthMobile] = useState(320);
  const animationTimeouts = useRef<number[]>([]);

  // Intersection Observer для анімації
  const { ref: animationRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useLayoutEffect(() => {
    function updateSize() {
      if (mapRef.current) setMapWidth(mapRef.current.offsetWidth);
      if (mapMobileRef.current)
        setMapWidthMobile(mapMobileRef.current.offsetWidth);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const flowerSize = Math.round(mapWidth / 25);
  const flowerSizeMobile = Math.round(mapWidthMobile / 25);

  useEffect(() => {
    getAllMapEvents().then(setEvents);
  }, []);

  useEffect(() => {
    const close = () => setActivePopoverId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    if (inView && events.length > 0) {
      animationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
      animationTimeouts.current = [];

      const sortedFlowers = [...events].sort((a, b) => a.x - b.x);

      sortedFlowers.forEach((flower, index) => {
        const timeout = setTimeout(() => {
          setVisibleFlowers((prev) => new Set([...prev, flower._id]));
        }, index * 200);

        animationTimeouts.current.push(timeout);
      });
    }

    // Cleanup function
    return () => {
      animationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [inView, events]);

  const renderFlowers = (
    eventsToRender: MapEvent[],
    flowerSizeToUse: number
  ) => {
    return eventsToRender.map((ev) => {
      const half = flowerSizeToUse / 2;
      const isActive = activePopoverId === ev._id;
      const isVisible = visibleFlowers.has(ev._id);

      return (
        <motion.div
          key={ev._id}
          className={css.flowerWrapper}
          initial={{ scale: 0, rotate: -360, opacity: 0 }}
          animate={
            isVisible
              ? {
                  scale: [0, 1.2, 1],
                  rotate: [0, 180, 0],
                  opacity: 1,
                }
              : { scale: 0, rotate: -360, opacity: 0 }
          }
          transition={{
            duration: 1.2,
            delay: 0, // Тепер delay не потрібен, бо ми керуємо через setTimeout
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: {
              times: [0, 0.8, 1],
              duration: 1.2,
            },
            rotate: {
              duration: 1.0,
              ease: "easeOut",
            },
            opacity: {
              duration: 0.6,
              ease: "easeOut",
            },
          }}
          style={{
            left: `calc(${ev.x}% - ${half}px)`,
            top: `calc(${ev.y}% - ${half}px)`,
            width: flowerSizeToUse,
            height: flowerSizeToUse,
            zIndex: (ev.zIndex || 1) + 10,
          }}
        >
          <img
            src={ev.miniatureImage}
            alt={ev.title}
            className={css.flowerMarker}
            style={{ width: flowerSizeToUse, height: flowerSizeToUse }}
            onClick={(e) => {
              e.stopPropagation();
              setActivePopoverId(isActive ? null : ev._id);
            }}
            title={ev.title}
          />
          {isActive && (
            <div
              className={`${popoverCss.popover} ${css.popoverWrapper}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={popoverCss.popoverTitle}>{ev.title}</div>
              <div className={popoverCss.popoverDate}>
                {formatDate(ev.createdAt)}
              </div>
            </div>
          )}
        </motion.div>
      );
    });
  };

  return (
    <div className={`${css.container} ${className}`} ref={animationRef}>
      {/* Desktop карта */}
      <div ref={mapRef} className={css.mapContainer}>
        <img src={mapImage} alt="Interactive Map" className={css.mapImage} />
        {renderFlowers(events, flowerSize)}
      </div>

      {/* Мобільна карта (якщо потрібна) */}
      {showMobileVersion && (
        <div ref={mapMobileRef} className={css.mapContainerMobile}>
          <img
            src={mapImage}
            alt="Interactive Map Mobile"
            className={css.mapImageAbsolute}
          />
          {renderFlowers(events, flowerSizeMobile)}
        </div>
      )}
    </div>
  );
}

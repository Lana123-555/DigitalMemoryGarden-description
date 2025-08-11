import React, { useEffect, useRef, useState } from "react";
import css from "./PopupOverlay.module.css";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

export default function PopupOverlay({ children, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Анімація появи
  useEffect(() => {
    setVisible(true);
  }, []);

  // Закриття по Esc
  useEffect(() => {
    if (!onClose) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Закриття по кліку на оверлей
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current && onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`${css.overlay} ${visible ? css.overlayVisible : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${css.popupContent} ${
          visible ? css.popupContentVisible : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

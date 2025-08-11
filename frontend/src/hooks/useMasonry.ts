import { useEffect, useRef } from 'react';

export const useMasonry = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updateSpan = () => {
            const img = element.querySelector('img') as HTMLImageElement;
            const video = element.querySelector('video') as HTMLVideoElement;

            if (!img && !video) return;

            const onMediaLoad = () => {
                // Дозволяємо елементу отримати свій природний розмір
                requestAnimationFrame(() => {
                    const rowHeight = 20; // matches grid-auto-rows
                    const gap = 24; // matches grid gap
                    const elementHeight = element.offsetHeight;
                    const spans = Math.ceil((elementHeight + gap) / rowHeight);
                    element.style.gridRowEnd = `span ${spans}`;
                });
            };

            if (img) {
                if (img.complete && img.naturalHeight > 0) {
                    onMediaLoad();
                } else {
                    img.addEventListener('load', onMediaLoad, { once: true });
                }
            }

            if (video) {
                if (video.readyState >= 2) {
                    onMediaLoad();
                } else {
                    video.addEventListener('loadedmetadata', onMediaLoad, { once: true });
                }
            }
        };

        // Initial update with delay to ensure layout is complete
        const timeoutId = setTimeout(updateSpan, 100);

        // Update on window resize
        const handleResize = () => {
            setTimeout(updateSpan, 50);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return ref;
};

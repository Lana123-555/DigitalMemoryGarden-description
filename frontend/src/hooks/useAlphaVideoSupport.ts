import { useEffect, useState } from 'react';

// Detect browsers (Safari / iOS) that don't properly support transparent WebM (alpha)
export function useAlphaVideoSupport() {
    const [supported, setSupported] = useState(true);

    useEffect(() => {
        if (typeof navigator === 'undefined') return;
        const ua = navigator.userAgent;
        const isIOS = /iP(hone|ad|od)/.test(ua);
        const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/Chromium\//.test(ua);
        if (isIOS || isSafari) {
            setSupported(false);
        }
    }, []);

    return supported;
}

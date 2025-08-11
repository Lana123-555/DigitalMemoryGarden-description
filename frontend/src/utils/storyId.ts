// Utility functions for generating story IDs

export const generateStoryId = (source: 'flower' | 'candle' | 'archive' | 'gallery'): string => {
    const prefix = source === 'flower' ? 'F' : source === 'candle' ? 'C' : source === 'archive' ? 'A' : 'G';
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    // Take last 5 digits of timestamp + 3 random digits = 8 digits total
    const id = timestamp.slice(-5) + randomNum;
    return `${prefix}${id}`;
};

export const validateStoryId = (storyId: string): boolean => {
    return /^[FCAG]\d{8}$/.test(storyId);
};

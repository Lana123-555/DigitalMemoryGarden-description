// types/Gallery.ts

export type MediaType = 'photo' | 'video' | 'audio';

export type GalleryStory = {
    _id: string;
    title?: string;
    comment?: string;
    name?: string;
    category: {
        _id: string;
        name: string;
    };
    media: {
        photo?: string;
        audio?: string;
        video?: string;
    };
    source: "flower" | "candle" | "archive";
    createdAt: string;
};

export type GalleryParams = {
    mediaType: MediaType;
    categoryId?: string;
    page: number;
    limit: number;
};

export type GalleryResponse = {
    stories: GalleryStory[];
    totalCount: number;
    hasMore: boolean;
};

// Legacy type - може бути видалений пізніше
export type GalleryItemType = {
    _id?: string;
    title: string;
    description: string;
    contentType: 'image' | 'video' | 'audio';
    media: string[];
    category: string;
    name?: string;
    location: string;
    date?: string;
    imported?: boolean;
}
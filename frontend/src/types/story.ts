// types/story.ts
import type { Category } from "./category";
import type { CandleType } from "./candleType";

export type StoryMedia = {
    photo?: string;
    audio?: string;
    video?: string;
};

export type Story = {
    _id: string;
    title?: string;
    comment?: string;
    name?: string;
    age?: number;
    location?: string;
    dateOfBirth?: string;
    dateOfDeath?: string;
    category: string | Category;
    candleType?: string | CandleType;
    createdAt: string;
    media?: StoryMedia;
    storyId?: string;
    source: "flower" | "candle" | "archive" | "gallery";
};

export type CreateStoryPayload = {
    title?: string;
    comment?: string;
    name?: string;
    age?: number | string | null;
    location?: string;
    dateOfBirth?: string;
    dateOfDeath?: string;
    category: string;
    candleType?: string;
    source: "flower" | "candle" | "archive" | "gallery";
    photo?: File;
    audio?: File;
    video?: File;
};

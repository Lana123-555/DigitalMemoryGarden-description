// Пагінація по категорії
export const getStoriesByCategory = async (categoryId: string, page = 1, limit = 4): Promise<{ stories: Story[]; totalCount: number }> => {
    const response = await apiClient.get(`/stories/category/${categoryId}`, {
        params: { page, limit },
    });
    return response.data;
};

// Контекст (шуканий + сусіди)
export const getStoriesContextByCategory = async (categoryId: string, storyId: string, limit = 4): Promise<Story[]> => {
    const response = await apiClient.get(`/stories/category/${categoryId}/context/${storyId}`, {
        params: { limit },
    });
    return response.data;
};
export const getNextFlowerStory = async (current: { id?: string; storyId?: string }): Promise<Story | null> => {
    const response = await apiClient.post("/stories/next", current, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

export const getPrevFlowerStory = async (current: { id?: string; storyId?: string }): Promise<Story | null> => {
    const response = await apiClient.post("/stories/prev", current, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

import apiClient from "./apiClient";
import type { Story } from "../types/story";

export const getAllStories = async (params?: { source?: string }): Promise<Story[]> => {
    const response = await apiClient.get("/stories", { params });
    return response.data;
};

export const getStoryById = async (id: string): Promise<Story> => {
    const response = await apiClient.get(`/stories/${id}`);
    return response.data;
};

export const getStoryByStoryId = async (storyId: string): Promise<Story> => {
    const response = await apiClient.get(`/stories/story/${storyId}`);
    return response.data;
};

export const addStory = async (data: {
    storyId: string;
    title?: string;
    comment?: string;
    name?: string;
    age?: number | string;
    location?: string;
    dateOfBirth?: string;
    dateOfDeath?: string;
    category: string;
    candleType?: string;
    source: "flower" | "candle" | "archive" | "gallery";
    photo?: File;
    audio?: File;
    video?: File;
}): Promise<Story> => {
    console.log('📤 Starting story upload:', {
        storyId: data.storyId,
        source: data.source,
        title: data.title,
        hasPhoto: !!data.photo,
        hasAudio: !!data.audio,
        hasVideo: !!data.video,
        photoSize: data.photo ? data.photo.size : 0,
        audioSize: data.audio ? data.audio.size : 0,
        videoSize: data.video ? data.video.size : 0
    });

    try {
        const formData = new FormData();
        formData.append("storyId", data.storyId);
        if (data.title) formData.append("title", data.title);
        if (data.comment) formData.append("comment", data.comment);
        if (data.name) formData.append("name", data.name);
        if (data.age !== undefined && data.age !== null) formData.append("age", String(data.age));
        if (data.location) formData.append("location", data.location);
        if (data.dateOfBirth) formData.append("dateOfBirth", data.dateOfBirth);
        if (data.dateOfDeath) formData.append("dateOfDeath", data.dateOfDeath);
        formData.append("category", data.category);
        if (data.candleType) formData.append("candleType", data.candleType);
        formData.append("source", data.source);
        if (data.photo) formData.append("photo", data.photo);
        if (data.audio) formData.append("audio", data.audio);
        if (data.video) formData.append("video", data.video);

        console.log('📤 Sending FormData to server...');
        const response = await apiClient.post("/stories", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log('✅ Story upload successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Story upload failed:', error);

        // Log detailed error information
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }

        // Re-throw the error to be handled by the calling component
        throw error;
    }
};

export const updateStory = async (
    id: string,
    data: Partial<Omit<Story, "_id" | "createdAt" | "media" | "storyId">> & {
        photo?: File;
        audio?: File;
        video?: File;
    }
): Promise<Story> => {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.comment) formData.append("comment", data.comment);
    if (data.name) formData.append("name", data.name);
    if (data.age !== undefined && data.age !== null) formData.append("age", String(data.age));
    if (data.location) formData.append("location", data.location);
    if (data.dateOfBirth) formData.append("dateOfBirth", data.dateOfBirth);
    if (data.dateOfDeath) formData.append("dateOfDeath", data.dateOfDeath);
    if (data.category) {
        const categoryValue = typeof data.category === "string"
            ? data.category
            : data.category._id || data.category.name;
        formData.append("category", categoryValue);
    }
    if (data.source) formData.append("source", data.source);
    if (data.photo) formData.append("photo", data.photo);
    if (data.audio) formData.append("audio", data.audio);
    if (data.video) formData.append("video", data.video);

    const response = await apiClient.patch(`/stories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteStory = async (id: string): Promise<void> => {
    await apiClient.delete(`/stories/${id}`);
};

export const searchStories = async (query: string, source?: 'flower' | 'candle' | 'archive'): Promise<Story[]> => {
    const payload: { query: string; source?: string } = { query };
    if (source) payload.source = source;

    const response = await apiClient.post("/stories/search", payload, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

export const addCandle = async (data: {
    storyId: string;
    name?: string;
    dateOfBirth?: string;
    dateOfDeath?: string;
    comment?: string;
    category: string;
    candleType: string;
    photo?: File;
    audio?: File;
    video?: File;
}): Promise<Story> => {
    return addStory({
        ...data,
        source: "candle",
    });
};

// Get a random flower story (source: 'flower')
export const getRandomFlowerStory = async (): Promise<Story> => {
    const response = await apiClient.get("/stories/random-flower");
    return response.data;
};
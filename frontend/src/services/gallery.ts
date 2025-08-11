// services/gallery.ts
import apiClient from "./apiClient";
import type { GalleryResponse, GalleryParams } from "../types/Gallery";

export const getGalleryStories = async ({
    mediaType,
    categoryId,
    page = 1,
    limit = 12
}: GalleryParams): Promise<GalleryResponse> => {
    const params: Record<string, string | number> = {
        mediaType,
        page,
        limit
    };

    if (categoryId) {
        params.categoryId = categoryId;
    }

    const response = await apiClient.get("/stories/gallery", { params });
    return response.data;
};

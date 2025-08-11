import apiClient from "./apiClient";
import type { CandleType } from "../types/candleType";

export const getAllCandleTypes = async (): Promise<CandleType[]> => {
    const response = await apiClient.get("/candle-types");
    return response.data;
};

export const getAllCandleTypesForAdmin = async (): Promise<CandleType[]> => {
    const response = await apiClient.get("/candle-types/admin");
    return response.data;
};

export const getCandleTypeById = async (id: string): Promise<CandleType> => {
    const response = await apiClient.get(`/candle-types/${id}`);
    return response.data;
};

export const addCandleType = async (data: {
    name: string;
    image?: File;
    isActive?: boolean;
}): Promise<CandleType> => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image) formData.append("image", data.image);
    if (data.isActive !== undefined) formData.append("isActive", String(data.isActive));

    const response = await apiClient.post("/candle-types", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const updateCandleType = async (
    id: string,
    data: {
        name?: string;
        image?: File;
        isActive?: boolean;
    }
): Promise<CandleType> => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.image) formData.append("image", data.image);
    if (data.isActive !== undefined) formData.append("isActive", String(data.isActive));

    const response = await apiClient.patch(`/candle-types/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteCandleType = async (id: string): Promise<void> => {
    await apiClient.delete(`/candle-types/${id}`);
};

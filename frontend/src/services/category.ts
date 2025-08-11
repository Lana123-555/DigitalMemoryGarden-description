
import apiClient from "./apiClient";
import type { Category } from "../types/category";

export type AddCategoryPayload = {
    name: string;
    description?: string;
    flowerImage?: File | string;
    flowerAnimation?: File | string;
    miniatureImage?: File | string;
};

export type UpdateCategoryPayload = {
    name?: string;
    description?: string;
    flowerImage?: File | string;
    flowerAnimation?: File | string;
    miniatureImage?: File | string;
};

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await apiClient.get("/categories");
    return response.data.map((cat: unknown) => {
        const category = cat as Category;
        return {
            ...category,
            flowerImage: category.flowerImage || "",
        };
    }) as Category[];
};

export const addCategory = async (data: AddCategoryPayload): Promise<Category> => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.flowerImage instanceof File) formData.append("flowerImage", data.flowerImage);
    if (data.flowerAnimation instanceof File) formData.append("flowerAnimation", data.flowerAnimation);
    if (data.miniatureImage instanceof File) formData.append("miniatureImage", data.miniatureImage);

    const response = await apiClient.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return { ...response.data, flowerImage: response.data.flowerImage || "", miniatureImage: response.data.miniatureImage || "" };
};

export const updateCategory = async (
    id: string,
    data: UpdateCategoryPayload
): Promise<Category> => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.flowerImage instanceof File) formData.append("flowerImage", data.flowerImage);
    if (data.flowerAnimation instanceof File) formData.append("flowerAnimation", data.flowerAnimation);
    if (data.miniatureImage instanceof File) formData.append("miniatureImage", data.miniatureImage);

    const response = await apiClient.patch(`/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return { ...response.data, flowerImage: response.data.flowerImage || "", miniatureImage: response.data.miniatureImage || "" };
};

export const deleteCategory = async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
};
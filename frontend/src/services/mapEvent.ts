import apiClient from "./apiClient";
import type { MapEvent } from "../types/mapEvent";

export type AddMapEventPayload = {
    x: number;
    y: number;
    category: string;
    title: string;
    zIndex: number;
};

export type UpdateMapEventPayload = AddMapEventPayload;

export const getAllMapEvents = async (): Promise<MapEvent[]> => {
    const response = await apiClient.get("/map-events");
    return response.data;
};

export const addMapEvent = async (data: AddMapEventPayload): Promise<MapEvent> => {
    const response = await apiClient.post("/map-events", data);
    return response.data;
};

export const updateMapEvent = async (
    id: string,
    data: UpdateMapEventPayload
): Promise<MapEvent> => {
    const response = await apiClient.put(`/map-events/${id}`, data);
    return response.data;
};

export const deleteMapEvent = async (id: string): Promise<void> => {
    await apiClient.delete(`/map-events/${id}`);
};

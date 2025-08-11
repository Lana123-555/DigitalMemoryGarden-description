import type { Category } from "./category";

export type MapEvent = {
    _id: string;
    x: number;
    y: number;
    category: string | Category;
    title: string;
    miniatureImage: string;
    zIndex: number;
    createdAt?: string;
};

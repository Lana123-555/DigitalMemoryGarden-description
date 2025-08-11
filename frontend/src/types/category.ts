// types/category.ts
export type Category = {
    _id: string;
    name: string;
    description?: string;
    flowerImage: string; // always string, never undefined
    flowerAnimation?: string;
    miniatureImage?: string;
};

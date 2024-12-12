// types/Post.ts
export type Post = {
    id: number; // ID が必須
    title: string;
    content: string;
    is_locked: boolean;
};
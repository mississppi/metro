import {Post} from '../types/Post';

const API_URL = 'http://localhost:3000';

const createNewPost = async (): Promise<Post> => {
    const postData = {
        title: 'new post',
        content: ' ',
    }
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const data = await response.json();
        const post = await getPostById(data.postId);
        return post;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

const getPosts = async () => {
    try {
        const response = await fetch(`${API_URL}/posts`);        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

const getPostById = async (postId: number) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch the post');
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Error fetching the post:', error);
        throw error;
    }
};

const updatePost = async (postId: number, updatedData: { title?: string; content?: string }) => {
    // もしidが0の場合は更新しない（リセット後はidが0の可能性がある）
    if (postId === 0) {
        console.log('Post update skipped: id is 0');
        return;  // 処理をスキップ
    }
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error('Failed to update post');
        }
        const post = await getPostById(postId);
        return post;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

const deletePost = async (postId: number) => {
    try {
        const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({postId}),
        });
        if (!response.ok) {
            throw new Error('Failed to delete post');
        }
        return response.json();
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}

export { createNewPost, getPosts, getPostById, updatePost, deletePost };
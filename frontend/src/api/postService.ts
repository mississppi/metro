// 投稿のデータ型を定義
interface Post {
    title: string;
    content: string;
}

// 新しい投稿を作成する関数
const createNewPost = async (postData: Post): Promise<void> => {
    console.log("newpost fromservice")
    try {
        const response = await fetch('http://localhost:3000/newpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        console.log('return frontend');
        
        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

const API_URL = 'http://localhost:3000';

export const getPosts = async () => {
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

export { createNewPost };
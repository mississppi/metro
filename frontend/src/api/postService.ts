// 投稿のデータ型を定義
interface Post {
    title: string;
    content: string;
}

// 新しい投稿を作成する関数
const createNewPost = async (postData: Post): Promise<void> => {
    console.log("from front new p")
    try {
        const response = await fetch('http://localhost:3000/newpost', {
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
        console.log(data.message);
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

export { createNewPost };
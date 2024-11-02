import React, { ReactNode, useEffect, useState } from 'react';
import PostList from '../components/Postlist';
import PostDetail from '../components/PostDetail';

// interface MainLayoutProps {
//     children?: ReactNode;
// }

interface Post {
    id: number;
    title: string;
    content: string;
}

const MainLayout: React.FC= () => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const handlePostClick = (id: number) => {
        const post = posts.find(p => p.id === id)
        setSelectedPost(post || null);
    }

    const [posts, setPosts] = useState<Post[]>([
        { id: 1, title: 'Post 1', content: 'Content for post 1.' },
        { id: 2, title: 'Post 2', content: 'Content for post 2.' },
        { id: 3, title: 'Post 3', content: 'Content for post 3.' },
    ]);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //     try {
    //         // APIからのデータ取得
    //         const response = await fetch('/api/posts'); // 実際のAPIエンドポイントに変更
    //         const data = await response.json();
    //         setPosts(data); // APIデータで上書き
    //     } catch (error) {
    //         console.error('Failed to fetch posts:', error);
    //     }
    //     };
    
    //     fetchPosts();
    // }, []);

    return (
        <div className="flex">
            <div className="w-1/4 p-4">  {/* 左カラム */}
                <PostList 
                    posts={posts} 
                    onPostClick={handlePostClick}
                    selectedPostId={selectedPost?.id || null}
                />
            </div>
            <div className="w-3/4 p-4">  {/* 右カラム */}
                {selectedPost && (
                    <PostDetail 
                        title={selectedPost.title}
                        content={selectedPost.content}
                    />
                )}
            </div>
        </div>
    );
};

export default MainLayout
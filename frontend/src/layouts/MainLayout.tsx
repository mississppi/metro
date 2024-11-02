import React, { ReactNode, useEffect, useState } from 'react';
import PostList from '../components/Postlist';

// interface MainLayoutProps {
//     children?: ReactNode;
// }

interface Post {
    id: number;
    title: string;
}

const MainLayout: React.FC= () => {
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

    const selectPost = (id: number) => {
        setSelectedPostId(id);
        console.log("call parent", id)
    }

    const [posts, setPosts] = useState<Post[]>([
        { id: 1, title: 'Sample Post 1' },
        { id: 2, title: 'Sample Post 2' },
        { id: 3, title: 'Sample Post 3' },
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
                <PostList posts={posts} onPostClick={selectPost}/>
            </div>
            <div className="w-3/4 p-4">  {/* 右カラム */}
            </div>
        </div>
    );
};

export default MainLayout
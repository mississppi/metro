import React, { ReactNode, useEffect, useState } from 'react';
import PostList from '../components/PostList';
import PostDetail from '../components/PostDetail';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import { createNewPost, getPosts } from '../api/postService';

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
    const [post, setPost] = useState({ title: 'Initial Title', content: 'Initial Content' });

    // コールバック関数を定義
    const handleSave = () => {
        console.log("メモを保存しました！");
        console.log(selectedPost);
        // 保存の処理をここに記述
    };

    const handleNewPost = () => {
        console.log("新規メモを作成しました！");
        const postData = {
            title: '新しい投稿',
            content: 'ここに投稿の内容を入力します。',
        };
        createNewPost(postData);
        // 新規メモの作成処理をここに記述
    };

    const handleSearch = () => {
        console.log("メモを検索しました！");
        // 検索処理をここに記述
    };

    const handlePostClick = (id: number) => {
        const post = posts.find(p => p.id === id)
        setSelectedPost(post || null);
    }

    const [posts, setPosts] = useState<Post[]>([
        { id: 1, title: 'Post 1', content: 'Content for post 1.' },
        { id: 2, title: 'Post 2', content: 'Content for post 2.' },
        { id: 3, title: 'Post 3', content: 'Content for post 3.' },
    ]);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            // APIからのデータ取得
            const response = await getPosts();
            setPosts(response)
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
        };
    
        fetchPosts();
    }, []);

    const updateTitle = (newTitle: string) => {
        console.log("updateTitle!!")
        console.log(newTitle);
        setSelectedPost((prevPost) => prevPost? { ...prevPost, title: newTitle } : null);
    };

    const updateContent = (newContent: string) => {
        setSelectedPost((prevPost) => prevPost? { ...prevPost, content: newContent } : null);
    };

    useKeyboardShortcuts(handleSave, handleNewPost, handleSearch);
    return (
        <div className="flex">
            <div className="w-1/4 p-4 h-full">  {/* 左カラム */}
                <PostList 
                    posts={posts} 
                    onPostClick={handlePostClick}
                    selectedPostId={selectedPost?.id || null}
                />
            </div>
            <div className="w-3/4 p-4 h-full">  {/* 右カラム */}
                {selectedPost && (
                    <PostDetail 
                        title={selectedPost.title}
                        content={selectedPost.content}
                        onNewPost={handleNewPost}
                        onTitleChange={updateTitle}
                        onContentChange={updateContent}
                    />
                )}
            </div>
        </div>
    );
};

export default MainLayout
import React, { ReactNode, useEffect, useState } from 'react';
import PostList from '../components/PostList';
import PostDetail from '../components/PostDetail';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import { createNewPost, getPostById, getPosts, updatePost } from '../api/postService';

interface Post {
    id: number;
    title: string;
    content: string;
}

const MainLayout: React.FC= () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const response = await getPosts();
            setPosts(response)
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
        };
        fetchPosts();
    }, []);

    const handleNewPost = async () => {
        const postData = {
            title: '新しい投稿',
            content: 'ここに投稿の内容を入力します。',
        };
        createNewPost(postData);
        // 新規メモの作成処理をここに記述
    };

    const handleUpdatePost = async () => {
        if(!selectedPost) {
            console.error("No post selected for update");
            return;
        }
        try {
            const updatedPost = await updatePost(selectedPost.id, {
                title: selectedPost.title,
                content: selectedPost.content,
            });
            setPosts((prevPosts) => 
                prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
            )
            console.log('Post updated successfully');
        } catch (error) {
            console.error('Failed to update post:', error);
        } finally {
        }
    };

    const handleSearch = () => {
        console.log("メモを検索しました！");
        // 検索処理をここに記述
    };

    const handlePostClick = (id: number) => {
        const post = posts.find(p => p.id === id)
        setSelectedPost(post || null);
    }

    const updateTitle = (newTitle: string) => {
        setSelectedPost((prevPost) => prevPost? { ...prevPost, title: newTitle } : null);
    };

    const updateContent = (newContent: string) => {
        setSelectedPost((prevPost) => prevPost? { ...prevPost, content: newContent } : null);
    };

    useKeyboardShortcuts(handleNewPost, handleUpdatePost, handleSearch);
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
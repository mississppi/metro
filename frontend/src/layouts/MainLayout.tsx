import React, { ReactNode, useEffect, useState } from 'react';
import PostList from '../components/PostList';
import PostDetail from '../components/PostDetail';
import useKeyboardShortcuts from '../hooks/useKeyboardShortcuts';
import { createNewPost, getPostById, getPosts, updatePost, deletePost } from '../api/postService';
import { Post } from '../types/Post';

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
        try {
            const createdPost = await createNewPost();
            if (createdPost) {
                setPosts((prevPosts) => [...prevPosts, createdPost]);
            }
        } catch(error) {
            console.error('新規投稿の作成に失敗しました:', error);
            alert('新規投稿の作成中にエラーが発生しました。もう一度お試しください。');
        }
    };

    const handleDeletePost = async () => {
        if(!selectedPost) {
            console.error("No post selected for delete");
            return;
        }
        try {
            await deletePost(selectedPost.id);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPost.id));
            setSelectedPost(null)
            // setSelectedPost({id: 0, title: '', content: ''})
        } catch (error) {
            console.error('Failed to delete post:', error);
            alert('投稿の削除中にエラーが発生しました。');
        }
    }

    const handleUpdatePost = async () => {
        if(!selectedPost) {
            console.error("No post selected for update");
            return;
        }
        if(selectedPost.id === 0){
            console.error("Post update skipped: id is 0");
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

    const handleDelete = (id: number) => {
        console.log("delte start");
        
    }

    const updateTitle = (newTitle: string) => {
        setSelectedPost((prevPost) => prevPost? { ...prevPost, title: newTitle } : null);
    };

    const updateContent = (newContent: string) => {
        setSelectedPost((prevPost) => prevPost? { ...prevPost, content: newContent } : null);
    };

    useKeyboardShortcuts(handleNewPost, handleUpdatePost, handleSearch);
    return (
        <div className="flex h-screen">
            <div 
                className="scrollable w-1/4 px-4 pt-4 pb-4 pr-0 h-full overflow-y-auto border-r border-gray-800">  {/* 左カラム */}
                <PostList 
                    posts={posts} 
                    onPostClick={handlePostClick}
                    selectedPostId={selectedPost?.id || null}
                    onDeletePost={handleDeletePost}
                />
            </div>
            <div className="w-3/4 p-4 h-full overflow-y-auto">  {/* 右カラム */}
                {selectedPost !== null && (
                    <PostDetail 
                        title={selectedPost.title}
                        content={selectedPost.content}
                        onNewPost={handleNewPost}
                        onDeletePost={handleDeletePost}
                        onTitleChange={updateTitle}
                        onContentChange={updateContent}
                    />
                )}
            </div>
        </div>
    );
};

export default MainLayout
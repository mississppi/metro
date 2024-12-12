import React, { useState } from 'react';
import {Post} from '../types/Post';
import PostItem from './PostItem';

const PostList = ({ posts, onPostClick, selectedPostId, onDeletePost, onLockPost }: 
    { 
        posts: Post[], 
        onPostClick: (id: number) => void,
        selectedPostId: number | null,
        onDeletePost: () => void;
        onLockPost: () => void;
    }
) => {
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
    const toggleMenu = (id: number) => {
        setMenuOpenId(menuOpenId === id ? null : id);
    }

    const [contextMenuPosition, setContextMenuPosition] = useState(null);

    return (
            <div
                style={{
                    height: '100%',
                    overflowY: 'auto',
                }}
            >
                <ul>
                    {posts.map(post => (
                        <PostItem
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            isSelected={selectedPostId === post.id}
                            menuOpenId={menuOpenId}
                            onClick={() => onPostClick(post.id)}
                            toggleMenu={toggleMenu}
                            onDeletePost={onDeletePost}
                            onLockPost={onLockPost}
                        />
                    ))}
                </ul>
            </div>
    )
}

export default PostList
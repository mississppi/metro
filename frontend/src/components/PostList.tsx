import React, { useState } from 'react';

interface Post {
    id: number;
    title: string;
}

const PostList = ({ posts, onPostClick, selectedPostId, onDelete }: 
    { 
        posts: Post[], 
        onPostClick: (id: number) => void,
        selectedPostId: number | null,
        onDelete: (id: number) => void,
    }
) => {
    const [contextMenuPosition, setContextMenuPosition] = useState(null);

    
    return (
            <div>
                <ul>
                    {posts.map(post => (
                        <li 
                            key={post.id} 
                            className="flex h-full justify-between items-center p-2 cursor-pointer"
                            style={{
                                backgroundColor: selectedPostId === post.id ? '#4A90E2' : 'transparent'
                            }}
                            onClick={() => onPostClick(post.id)}
                        >
                            {post.title}
                        </li>
                    ))}
                </ul>
            </div>
    )
}

export default PostList
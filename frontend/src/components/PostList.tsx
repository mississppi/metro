import React, { useState } from 'react';

interface Post {
    id: number;
    title: string;
}

const PostList = ({ posts, onPostClick, selectedPostId }: 
    { 
        posts: Post[], 
        onPostClick: (id: number) => void,
        selectedPostId: number,
    }
) => {

    return (
        <div>
            <ul>
                {posts.map(post => (
                    <li 
                        key={post.id} 
                        className={`flex justify-between items-center p-2 border-b cursor-pointer ${
                            selectedPostId === post.id ? 'bg-gray-200' : ''
                        }`}
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
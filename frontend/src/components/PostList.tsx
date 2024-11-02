import React, { useState } from 'react';

interface Post {
    id: number;
    title: string;
}

const PostList = ({ posts, onPostClick }: 
    { 
        posts: Post[], 
        onPostClick: (id: number) => void 
    }
) => {

    return (
        <div>
            <ul className='space-y-2'>
                {posts.map(post => (
                    <li 
                        key={post.id} 
                        className='flex justify-between items-center p-2 border-b cursor-pointer'
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
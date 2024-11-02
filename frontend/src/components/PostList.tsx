import React, { useState } from 'react';

interface Post {
    id: number;
    title: string;
}

const PostList = (
    { posts }: { posts: Post[] }
) => {

    return (
        <div>
            <ul className='space-y-2'>
                {posts.map(post => (
                    <li key={post.id} className='p-2 border-b'>
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostList
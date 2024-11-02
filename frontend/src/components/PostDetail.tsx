// src/components/PostDetail.tsx
import React from 'react';
import PostTitle from './PostTitle';
import PostContent from './PostContent';


const PostDetail = ({title, content}:
    {
        title: string;
        content: string
    }
) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow-0 flex-shrink-0 bg-gray-100 p-4" style={{ flex: '2' }}>
                <PostTitle title={title}/>
            </div>
            <div className="flex-grow bg-white p-4" style={{ flex: '8' }}>
                <PostContent content={content}/>
            </div>
        </div>
    );
};

export default PostDetail;
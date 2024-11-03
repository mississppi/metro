// src/components/PostDetail.tsx
import React from 'react';
import PostTitle from './PostTitle';
import PostContent from './PostContent';


const PostDetail = ({title, content,onTitleChange,onContentChange}:
    {
        title: string;
        content: string;
        onTitleChange: (newTitle: string) => void;
        onContentChange: (newContent: string) => void;
    }
) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow-0 h-full flex-shrink-0 p-4" style={{ flex: '2' }}>
                <PostTitle 
                    title={title}
                    onTitleChange={onTitleChange}
                />
            </div>
            <div className="flex-grow h-full" style={{ flex: '8' }}>
                <PostContent 
                    content={content}
                    onContentChange={onContentChange}
                />
            </div>
        </div>
    );
};

export default PostDetail;
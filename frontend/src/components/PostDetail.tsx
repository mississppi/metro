// src/components/PostDetail.tsx
import React, {useState} from 'react';
import PostTitle from './PostTitle';
import PostContent from './PostContent';

const PostDetail = ({title, content,is_locked,onDeletePost,onLockPost,onTitleChange,onContentChange}:
    {
        title: string;
        content: string;
        is_locked: boolean;
        onDeletePost: () => void;
        onLockPost: () => void;
        onTitleChange: (newTitle: string) => void;
        onContentChange: (newContent: string) => void;
    }
) => {
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow-0 h-full flex-shrink-0 p-4" style={{ flex: '2' }}>
                <PostTitle 
                    title={title}
                    is_locked={is_locked}
                    onTitleChange={onTitleChange}
                    onDeletePost={onDeletePost}
                    onLockPost={onLockPost}
                />
            </div>
            <div className="flex-grow h-full" style={{ flex: '8' }}>
                <PostContent 
                    content={content}
                    is_locked={is_locked}
                    onContentChange={onContentChange}
                />
            </div>
        </div>
    );
};

export default PostDetail;
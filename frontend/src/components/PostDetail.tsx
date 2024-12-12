// src/components/PostDetail.tsx
import React, {useState} from 'react';
import PostTitle from './PostTitle';
import PostContent from './PostContent';

const PostDetail = ({title, content,onNewPost,onDeletePost,onLockPost,onTitleChange,onContentChange}:
    {
        title: string;
        content: string;
        onNewPost: () => void;
        onDeletePost: () => void;
        onLockPost: () => void;
        onTitleChange: (newTitle: string) => void;
        onContentChange: (newContent: string) => void;
    }
) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeletePost = () => {
        setIsModalOpen(true);
    }

    const handleConfirmDelete = () => {
        // onDeletePost(selectedPost.id);
        setIsModalOpen(false);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow-0 h-full flex-shrink-0 p-4" style={{ flex: '2' }}>
                <PostTitle 
                    title={title}
                    onTitleChange={onTitleChange}
                    onNewPost={onNewPost}
                    onDeletePost={onDeletePost}
                    onLockPost={onLockPost}
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
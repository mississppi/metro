import React, { useEffect, useState } from 'react';
import LockButton from './Button/LockButton';

const PostTitle = ({ title, is_locked, onTitleChange, onDeletePost, onLockPost}:{
    title:string;
    is_locked:boolean;
    onTitleChange: (newTitle: string) => void;
    onDeletePost: () => void;
    onLockPost: () => void;
}) => {
    // 初期値としてpropsのcontentを設定
    const [editableTitle, setEditableTitle] = useState(title);

    useEffect(() => {
        setEditableTitle(title);
    }, [title]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setEditableTitle(newTitle);
        onTitleChange(newTitle);
    }
    return (
        <div className="flex items-center justify-between space-x-1">
            <input 
                type="text"
                value={editableTitle}
                onChange={handleTitleChange}
                className="h-full text-2xl font-bold  focus:outline-none bg-[#2C2C2C] p-2 rounded"
            />
            <LockButton 
                is_locked={is_locked}
                onLockPost={onLockPost}
            />
        </div>
    );
};

export default PostTitle;
import React, { useEffect, useState } from 'react';

const PostTitle = ({ title, onTitleChange}:{
    title:string;
    onTitleChange: (newTitle: string) => void;
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
        <input 
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            className="text-2xl font-bold border-b-2 focus:outline-none"
        />
    );
};

export default PostTitle;
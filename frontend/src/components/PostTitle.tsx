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
            className="h-full text-2xl font-bold  focus:outline-none bg-[#383838] text-white p-2 rounded"
        />
    );
};

export default PostTitle;
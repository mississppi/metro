import React, { useEffect, useState } from 'react';

const PostTitle = ({ title }:{
    title:string
}) => {
    // 初期値としてpropsのcontentを設定
    const [editableTitle, setEditableTitle] = useState(title);

    useEffect(() => {
        setEditableTitle(title);
    }, [title]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(e.target.value);
    }
    return (
        <input 
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            className="text-2xl font-bold border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
        />
    );
};

export default PostTitle;
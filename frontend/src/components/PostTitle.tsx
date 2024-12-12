import React, { useEffect, useState } from 'react';

const PostTitle = ({ title, onTitleChange, onNewPost,onDeletePost, onLockPost}:{
    title:string;
    onTitleChange: (newTitle: string) => void;
    onNewPost: () => void;
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
            {/* <div className="flex space-x-2 justify-end">
                <button 
                    onClick={onNewPost} // ボタンのクリックで新規追加の処理を実行
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                    <img 
                        src="/icons/plus.svg" 
                        alt="新規追加" 
                        className="w-5 h-5" 
                    />
                </button>
            </div> */}
        </div>
        
    );
};

export default PostTitle;
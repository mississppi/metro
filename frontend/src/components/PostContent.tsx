import React, { useEffect, useState } from 'react';

const PostContent = ({ content, is_locked, onContentChange }: {
    content: string;
    is_locked: boolean;
    onContentChange: (newContent: string) => void
}) => {
    // 初期値としてpropsのcontentを設定
    const [editableContent, setEditableContent] = useState(content);

    useEffect(() => {
        setEditableContent(content);
    }, [content]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setEditableContent(newContent)
        onContentChange(newContent)
    }
    return (
        <div className="text-base">
            <textarea 
                value={editableContent}
                onChange={handleContentChange}
                className="w-full h-[80vh]  bg-[#2C2C2C] resize-none focus:outline-none"
                placeholder='ここにメモの内容'
            />
        </div>
    );
};

export default PostContent;
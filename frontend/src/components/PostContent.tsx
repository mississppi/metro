import React, { useEffect, useState } from 'react';

const PostContent = ({ content, onContentChange }: {
    content: string;
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
                className="w-full h-40 p-2 border rounded"
                placeholder='ここにメモの内容'
            />
        </div>
    );
};

export default PostContent;
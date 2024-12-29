import React, { useEffect, useRef, useState } from 'react';

const PostContent = ({ content, is_locked, onContentChange }: {
    content: string;
    is_locked: boolean;
    onContentChange: (newContent: string) => void
}) => {
    // 初期値としてpropsのcontentを設定
    const [editableContent, setEditableContent] = useState(content);
    // const [value, setValue] = useState("編集不可のテキストです");
    // const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setEditableContent(content);
    }, [content]);

    // const handleLockedContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     if(textareaRef.current) {
    //         const caretPosition = textareaRef.current.selectionStart;

    //         textareaRef.current.value = value;
    //         textareaRef.current.setSelectionRange(caretPosition, caretPosition);
    //     }
    // };

    const handleUnlockedContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setEditableContent(newContent)
        onContentChange(newContent)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const isCopyCommand = (isMac && e.metaKey && e.key === "c") || (!isMac && e.ctrlKey && e.key === "c");
        const isAddCommand = (isMac && e.metaKey && e.key === "n") || (!isMac && e.ctrlKey && e.key === "n");
        const isArrowKey = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key);
        if (!isCopyCommand && !isAddCommand && !isArrowKey) {
            e.preventDefault();
        }
    }
    return (
        <div className="text-base">
            <textarea 
                value={editableContent}
                onChange={handleUnlockedContentChange}
                onKeyDown={is_locked ? handleKeyDown: undefined}
                className="w-full h-[80vh]  bg-[#2C2C2C] resize-none focus:outline-none"
                placeholder='ここにメモを入力します'
            />
        </div>
    );
};

export default PostContent;
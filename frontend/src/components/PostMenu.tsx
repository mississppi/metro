import React from 'react';

const PostMenu = ({postId, isOpen, toggleMenu, onDeletePost}: {
    postId: number;
    isOpen: boolean;
    toggleMenu: (id:number) => void;
    onDeletePost: () => void;
}) => {
    return(
        <div className="relative">
            <button
                className="text-gray-600 hover:text-gray-800 px-2 py-1"
                style={{ 
                    backgroundColor: '#3A3A3A',
                    height: '24px',
                    lineHeight: '1',
                }}
                onClick={() => toggleMenu(postId)}
            >
                ･･ {/* 半角中点を2つ */}
            </button>
            {isOpen && (
                <div className="absolute right-0 bg-white shadow-md border rounded-lg w-30">
                    <ul>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                            onClick={onDeletePost}
                        >
                            delete
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}
export default PostMenu;

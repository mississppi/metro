import React, { useState } from 'react';
import DeletePostModal from './Modal/DeletePostModal';

const PostMenu = ({postId, isOpen, toggleMenu, onDeletePost}: {
    postId: number;
    isOpen: boolean;
    toggleMenu: (id:number) => void;
    onDeletePost: () => void;
}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);

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
            <span style={{
                color:'#E0E0E0'
                }}
            >･･ {/* 半角中点を2つ */}
            </span>
            </button>
            {isOpen && (    
                <div className="absolute right-0 bg-white shadow-md border rounded-lg w-30">
                    <ul>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                            // onClick={onDeletePost}
                            onClick={openDeleteModal}
                        >
                            delete
                        </li>
                    </ul>

                    {/* 削除確認モーダル */}
                    {showDeleteModal && (
                        <DeletePostModal 
                            onClose={closeDeleteModal}
                            onDelete={onDeletePost}
                        />
                    )}
                    {/* <DeletePostModal
                        postId={postId}
                        isOpen={showDeleteModal}
                        onClose={closeDeleteModal}
                        onDelete={(id) => {
                            onDeletePost(id);
                            toggleMenu(null); // メニューを閉じる
                        }}
                    /> */}
                </div>
            )}
        </div>
    )
}
export default PostMenu;

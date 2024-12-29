import React, { useState, useRef, useEffect } from 'react';
import DeletePostModal from './Modal/DeletePostModal';
import LockModal from './Modal/LockModal';

const PostMenu = ({postId, isOpen, toggleMenu, onDeletePost}: {
    postId: number;
    isOpen: boolean;
    toggleMenu: (id:number) => void;
    onDeletePost: () => void;
}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLockModal, setShowLockModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);
    const openLockModal = () => setShowLockModal(true);
    const closeLockModal = () => setShowLockModal(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if(event.key === 'Escape' && isOpen) {
                toggleMenu(postId);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, postId, toggleMenu]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
                toggleMenu(postId);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [isOpen, postId, toggleMenu]);

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
                <div
                    ref={menuRef}
                    className="absolute right-0 bg-white shadow-md border rounded-lg w-30"
                >
                    <ul>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
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
                </div>
            )}
        </div>
    )
}
export default PostMenu;

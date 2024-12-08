import React, { useState } from 'react';

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

                    {showDeleteModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                                <p className="mb-6">
                                    Are you sure you want to delete this post? This action cannot be undone.
                                </p>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        onClick={closeDeleteModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={onDeletePost}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default PostMenu;

import React from 'react';

const DeletePostModal = ({onClose, onDelete}: {
    onClose: () => void;
    onDelete: () => void;
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-gray-600 text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this post? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletePostModal;
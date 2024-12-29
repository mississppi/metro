import React from "react";

const UnlockModal = ({ onUnlock,onClose }: { 
    onUnlock: () => void; 
    onClose: () => void; 
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">ロックを解除しますか？</h2>
                <p className="mb-4 text-gray-300">
                    ロックを解除すると、この投稿を編集できるようになります。
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                        onClick={onClose}
                    >
                        キャンセル
                    </button>
                    <button
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                        onClick={() => {
                            onUnlock();
                            onClose();
                        }}
                    >
                        ロックを解除
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnlockModal;

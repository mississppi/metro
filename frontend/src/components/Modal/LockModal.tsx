import React from "react";

const LockModal = ({onClose, onLock} : {
    onClose: () => void;
    onLock:() => void;
}) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">ロックしますか？</h2>
                <p className="mb-4 text-gray-300">
                    編集をロックすると、内容を変更できなくなります。
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                        onClick={onClose}
                    >
                        キャンセル
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                        onClick={() => {
                            onLock();
                            onClose();
                        }}
                    >
                        ロックする
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LockModal
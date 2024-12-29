import React from 'react';

const LockButton = ({is_locked, onLockPost}: {
  is_locked: boolean;
  onLockPost:() => void;
}) => {
  const iconPath = is_locked ? '/icons/lock.svg' : '/icons/unlock.svg'; // アンロック中のアイコン

    return (
        <button
        onClick={onLockPost}
        className="flex items-center justify-center p-2 bg-gray-800 rounded hover:bg-gray-700 transition"
        >
        <img src={iconPath} className="w-6 h-6" />
        </button>
    );
};

export default LockButton;
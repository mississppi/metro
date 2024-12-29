import React, { useState, useRef, useEffect } from 'react';
import LockModal from '../Modal/LockModal';
import UnlockModal from '../Modal/UnLockModal';

const LockButton = ({is_locked, onLockPost}: {
  is_locked: boolean;
  onLockPost:() => void;
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  
  const iconPath = is_locked ? '/icons/lock.svg' : '/icons/unlock.svg'; // アンロック中のアイコン
  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if(!showModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    //cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

    return (
      <div>
        <button
        onClick={openModal}
        className="flex items-center justify-center p-2 bg-gray-800 rounded hover:bg-gray-700 transition"
        >
        <img src={iconPath} className="w-6 h-6" />
        </button>

        {/* lock確認モーダル */}
        {showModal && (
          is_locked ? (
            <LockModal onLock={onLockPost} onClose={closeModal}/>
          ): (
            <UnlockModal onUnlock={onLockPost} onClose={closeModal}/>
          )
        )}
      </div>
    );
};

export default LockButton;
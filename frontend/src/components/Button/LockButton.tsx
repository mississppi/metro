import React, { useState, useEffect } from 'react';
import LockModal from '../Modal/LockModal';
import UnlockModal from '../Modal/UnLockModal';

const LockButton = ({is_locked, onLockPost}: {
  is_locked: boolean;
  onLockPost:() => void;
}) => {

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

  const buttonStyle = is_locked 
  ? 'bg-gray-800 hover:bg-gray-700'
  : 'bg-green-500 hover:bg-green-400 text-gray-800';

    return (
      <div>
        <button
        onClick={openModal}
        className={`flex items-center justify-center p-2 rounded transition ${buttonStyle}`}

        >
        <img src={iconPath} className="w-6 h-6" />
        </button>

        {/* lock確認モーダル */}
        {showModal && (
          is_locked ? (
            <UnlockModal onUnlock={onLockPost} onClose={closeModal}/>
          ): (
            <LockModal onLock={onLockPost} onClose={closeModal}/>
          )
        )}
      </div>
    );
};

export default LockButton;
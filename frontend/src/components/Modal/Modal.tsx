import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, onConfirm, message }:
{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}
) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>{message}</h3>
                <div className={styles.actions}>
                    <button onClick={onClose} className="btn-cancel">キャンセル</button>
                    <button onClick={onConfirm} className="btn-confirm">削除する</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
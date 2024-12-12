import React, { useState } from 'react';
import {Post} from '../types/Post';
import PostMenu from './PostMenu';

const PostItem = ({ id, title, isSelected, menuOpenId, onClick, toggleMenu, onDeletePost, onLockPost }:{
    id: number;
    title: string; 
    isSelected: boolean;
    menuOpenId: number | null;
    onClick: () => void;
    toggleMenu: (id: number) => void;
    onDeletePost: () => void;
    onLockPost: () => void;
}) => {
    return(
        <>
            <li 
                key={id} 
                className="flex h-full justify-between items-center p-2 cursor-pointer"
                style={{
                    backgroundColor: isSelected ? '#3A3A3A' : 'transparent'
                }}
                onClick={onClick}
            >
                {title.length > 20 ? `${title.substring(0, 20)}...` : title}
                {isSelected && (
                    <PostMenu 
                        postId={id}
                        isOpen={menuOpenId === id}
                        toggleMenu={toggleMenu}
                        onDeletePost={onDeletePost}
                        onLockPost={onLockPost}
                    />
                )}
            </li>
        </>
    )
}

export default PostItem
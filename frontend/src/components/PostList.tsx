import React, { useState } from 'react';
import {Post} from '../types/Post';

const PostList = ({ posts, onPostClick, selectedPostId, onDelete }: 
    { 
        posts: Post[], 
        onPostClick: (id: number) => void,
        selectedPostId: number | null,
        onDelete: (id: number) => void,
    }
) => {
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

    const toggleMenu = (id: number) => {
        console.log('clicked');
        console.log(id);
        setMenuOpenId(menuOpenId === id ? null : id);
    }

    const [contextMenuPosition, setContextMenuPosition] = useState(null);

    
    return (
            <div
                style={{
                    height: '100%',
                    overflowY: 'auto',
                }}
            >
                <ul>
                    {posts.map(post => (
                        <li 
                            key={post.id} 
                            className="flex h-full justify-between items-center p-2 cursor-pointer"
                            style={{
                                backgroundColor: selectedPostId === post.id ? '#4A90E2' : 'transparent'
                            }}
                            onClick={() => onPostClick(post.id)}
                        >
                            <span>{post.title}</span>
                            {selectedPostId === post.id && (
                                
                                <div className="relative">
                                    <button
                                        className="text-gray-600 hover:text-gray-800 px-2 py-1"
                                        onClick={() => toggleMenu(post.id)}
                                    >
                                        &#x22EE; {/* 縦に3点リーダー */}
                                    </button>
                                    {menuOpenId === post.id && (
                                                <div className="absolute right-0 bg-white shadow-md border rounded-lg w-40">
                                                    <ul>
                                                        <li
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                                            onClick={() => {
                                                                setMenuOpenId(null);
                                                            }}
                                                        >
                                                            delete
                                                        </li>
                                                    </ul>
                                                </div>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
    )
}

export default PostList
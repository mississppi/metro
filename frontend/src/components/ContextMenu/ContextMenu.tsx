import React, { useState, useEffect } from 'react';

const ContextMenu = ({ position, onClose }: {
    position: any;
    onClose: any;
}) => {
    return (
        <div 
            style={{
                position: 'absolute',
                top: position.y,
                left: position.x,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                zIndex: 1000,
            }}
            onMouseLeave={onClose}
        >
            <ul>
                <li onClick={() => { console.log('Edit clicked'); onClose(); }}>Edit</li>
                <li onClick={() => { console.log('Delete clicked'); onClose(); }}>Delete</li>
            </ul>
        </div>
    );
};
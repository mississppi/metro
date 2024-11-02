import React from 'react';

const PostTitle = ({ title }:
    {
        title:string
    }) => {
    return (
        <h2 className="text-2xl font-bold">{title}</h2>
    );
};

export default PostTitle;
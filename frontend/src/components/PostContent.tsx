import React from 'react';

const PostContent = ({ content }: {
    content: string;
}) => {
    return (
        <div className="text-base">
            {content}
        </div>
    );
};

export default PostContent;
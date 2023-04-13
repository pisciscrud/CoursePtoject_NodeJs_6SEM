import React from 'react';

const CommentItem = ({comment}) => {
    return (
        <div>
              <p>Comment</p>
            <p>{comment.content}</p>
        </div>
    );
};

export default CommentItem;
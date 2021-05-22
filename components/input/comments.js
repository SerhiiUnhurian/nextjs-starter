import { useState, useEffect } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [commentItems, setCommnetItems] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then(response => response.json())
        .then(comments => setCommnetItems(comments));
    }
  }, [showComments]);

  function handleToggleComments() {
    setShowComments(prevStatus => !prevStatus);
  }

  function handleAddComment(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(comment => console.log(comment));
  }

  return (
    <section className={classes.comments}>
      <button onClick={handleToggleComments}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={handleAddComment} />}
      {showComments && <CommentList items={commentItems} />}
    </section>
  );
}

export default Comments;

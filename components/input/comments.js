import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false);
  const [commentItems, setCommnetItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);

      fetch(`/api/comments/${eventId}`)
        .then(response => {
          if (response.ok) return response.json();

          return response.json().then(error => {
            throw new Error(error.message);
          });
        })
        .then(commentItems => {
          setCommnetItems(commentItems);
        })
        .catch(error => {
          notificationCtx.showNotification({
            title: 'Error!',
            message: error.message || 'Something went wrong.',
            status: 'error',
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [showComments]);

  function handleToggleComments() {
    setShowComments(prevStatus => !prevStatus);
  }

  function handleAddComment(commentData) {
    notificationCtx.showNotification({
      title: 'Adding comment...',
      message: 'Adding comment to the event.',
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) return response.json();

        return response.json().then(error => {
          throw new Error(error.message);
        });
      })
      .then(comment => {
        setCommnetItems([comment, ...commentItems]);
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Comment successfully added.',
          status: 'success',
        });
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong.',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={handleToggleComments}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={handleAddComment} />}
      {showComments && !isLoading && <CommentList items={commentItems} />}
      {showComments && isLoading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;

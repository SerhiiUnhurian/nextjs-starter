import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function handleSubmit(event) {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const reqBody = { email: enteredEmail };

    // optional: validate input

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Subscribing for newsletters.',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
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
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully subscribed.',
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
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

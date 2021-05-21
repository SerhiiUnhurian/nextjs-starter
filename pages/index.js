import { useRef } from 'react';

export default function HomePage() {
  const emailRef = useRef();
  const feedbackRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;
    const reqBody = { email: enteredEmail, feedback: enteredFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(feedback => {} /* console.log(feedback) */);
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea id="feedback" rows="3" ref={feedbackRef} />
        </div>
        <button>Send</button>
      </form>
    </div>
  );
}

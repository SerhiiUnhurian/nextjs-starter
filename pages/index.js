import { useRef, useState } from 'react';

export default function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;
    const reqBody = { email: enteredEmail, feedback: enteredFeedback };

    fetch('/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(feedback => setFeedbackItems([...feedbackItems, feedback]));
  }

  function handleLoadFeedbacks() {
    fetch('/api/feedbacks')
      .then(response => response.json())
      .then(feedbackItems => setFeedbackItems(feedbackItems));
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
      <hr />
      <button onClick={handleLoadFeedbacks}>Load Feedbacks</button>
      {feedbackItems.length && (
        <ul>
          {feedbackItems.map(({ id, feedback }) => (
            <li key={id}>{feedback}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

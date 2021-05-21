import { buildFeedbackPath, extractFeedbacks } from '../api/feedbacks';

const FeedbacksPage = ({ feedbackItems }) => {
  return (
    <ul>
      {feedbackItems.map(({ id, feedback }) => (
        <li key={id}>{feedback}</li>
      ))}
    </ul>
  );
};

export default FeedbacksPage;

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const feedbackItems = extractFeedbacks(filePath);

  return {
    props: { feedbackItems },
  };
}

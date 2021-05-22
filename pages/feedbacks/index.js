import { buildFeedbackPath, extractFeedbacks } from '../api/feedbacks/index';
import { useRouter } from 'next/router';

const FeedbacksPage = ({ feedbackItems }) => {
  const router = useRouter();

  const handleShowDetails = id => {
    const path = router.pathname + `/${id}`;
    router.push(path);
  };

  return (
    <ul>
      {feedbackItems.map(({ id, feedback }) => (
        <li key={id}>
          {feedback}
          <button onClick={() => handleShowDetails(id)}>Show Details</button>
        </li>
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

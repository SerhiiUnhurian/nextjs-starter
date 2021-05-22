import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const FeedbackDetailPage = () => {
  const [feedbackData, setFeedbackData] = useState();
  const router = useRouter();
  const { feedbackId } = router.query;

  const { data: loadedFeedback, error } = useSWR(
    `/api/feedbacks/${feedbackId}`
  );

  useEffect(() => {
    if (loadedFeedback) {
      setFeedbackData(loadedFeedback);
    }
  }, [loadedFeedback]);

  if (error) return <p>Failed to load.</p>;

  return !feedbackData ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p>Id: {feedbackData.id}</p>
      <p>Feedback: {feedbackData.feedback}</p>
    </div>
  );
};

export default FeedbackDetailPage;

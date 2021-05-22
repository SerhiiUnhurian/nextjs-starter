import { buildFeedbackPath, extractFeedbacks } from './index';

function handler(req, res) {
  const { feedbackId } = req.query;
  const filePath = buildFeedbackPath();
  const feedbacksItems = extractFeedbacks(filePath);
  const feedback = feedbacksItems.find(feedback => feedback.id === feedbackId);
  res.status(200).json(feedback);
}

export default handler;

import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedbacks.json');
}

export function extractFeedbacks(path) {
  const fileData = fs.readFileSync(path);
  return JSON.parse(fileData);
}

function handler(req, res) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    const filePath = buildFeedbackPath();
    const feedbacks = extractFeedbacks(filePath);
    feedbacks.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(feedbacks));
    res.status(201).json(newFeedback);
  } else {
    const filePath = buildFeedbackPath();
    const feedbacks = extractFeedbacks(filePath);
    res.status(200).json(feedbacks);
  }
}

export default handler;

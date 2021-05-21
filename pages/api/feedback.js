import fs from 'fs';
import path from 'path';

function handler(req, res) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    // Store data in database or in a file
    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const fileData = fs.readFileSync(filePath);
    const feedbacks = JSON.parse(fileData);

    feedbacks.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(feedbacks));
    res.status(201).json(newFeedback);
  } else {
    res.status(200).json({ message: 'This works!' });
  }
}

export default handler;

const comments = [];

function handler(req, res) {
  if (req.method === 'POST') {
    const commentData = req.body;
    comments.push(commentData);
    res.status(201).json(commentData);
  } else if (req.method === 'GET') {
    res.status(200).json(comments);
  }
}

export default handler;

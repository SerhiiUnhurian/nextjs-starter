const comments = [
  {
    id: 1,
    name: 'John',
    text: 'Fist comment',
  },
];

function handler(req, res) {
  if (req.method === 'POST') {
    const { eventId } = req.query;
    const { name, email, text } = req.body;

    // Validate data
    if (
      email?.trim() === '' ||
      !email?.includes('@') ||
      name?.trim() === '' ||
      text?.trim() === ''
    ) {
      return res.status(422).json({ message: 'Invalid data.' });
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
    return res.status(201).json(newComment);
  }
  if (req.method === 'GET') {
    // const { eventId } = req.query;
    return res.status(200).json(comments);
  }
}

export default handler;

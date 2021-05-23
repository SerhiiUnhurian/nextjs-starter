import { MongoClient } from 'mongodb';

const comments = [
  {
    id: 1,
    name: 'John',
    text: 'Fist comment',
  },
];

const url =
  'mongodb+srv://serhii:391q6pM1Mk65WXJD@cluster0.4v8ry.mongodb.net/events?retryWrites=true&w=majority';

async function handler(req, res) {
  const client = await MongoClient.connect(url);
  const db = client.db();

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
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection('comments').insertOne(newComment);
    console.log(result);

    return res.status(201).json(newComment);
  }
  if (req.method === 'GET') {
    // const { eventId } = req.query;
    return res.status(200).json(comments);
  }

  client.close();
}

export default handler;

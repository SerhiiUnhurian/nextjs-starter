import { MongoClient } from 'mongodb';

const url =
  'mongodb+srv://serhii:391q6pM1Mk65WXJD@cluster0.4v8ry.mongodb.net/events?retryWrites=true&w=majority';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Validate data
    if (!email || !email.includes('@')) {
      return res.status(422).json({ message: 'Invalid email address.' });
    }

    const client = await MongoClient.connect(url);
    const db = client.db();
    const collection = db.collection('newsletters');
    await collection.insertOne({ email });
    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;

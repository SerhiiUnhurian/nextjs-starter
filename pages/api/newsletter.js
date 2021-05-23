import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Validate data
    if (!email || !email.includes('@')) {
      return res.status(422).json({ message: 'Invalid email address.' });
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Connecting to the database failed.' });
    }

    try {
      await insertDocument(client, 'newsletters', { email });
    } catch (error) {
      client.close();
      return res
        .status(500)
        .json({ message: 'Inserting data to the database failed.' });
    }

    client.close();
    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;

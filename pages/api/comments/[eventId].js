import {
  connectDatabase,
  insertDocument,
  findDocuments,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const { eventId } = req.query;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Connecting to the database failed.' });
  }

  if (req.method === 'POST') {
    const { name, email, text } = req.body;

    // Validate data
    if (
      email?.trim() === '' ||
      !email?.includes('@') ||
      name?.trim() === '' ||
      text?.trim() === ''
    ) {
      client.close();
      return res.status(422).json({ message: 'Invalid data.' });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      await insertDocument(client, 'comments', newComment);
      res.status(201).json(newComment);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Inserting data to the database failed.' });
    }
  }

  if (req.method === 'GET') {
    try {
      const comments = await findDocuments(
        client,
        'comments',
        { eventId },
        { _id: -1 }
      );
      res.status(200).json(comments);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Getting comments from database failed.' });
    }
  }

  client.close();
  return res;
}

export default handler;

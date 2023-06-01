import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { connectDatabase } from '../../../utils/db-utils';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  // Make sure the user is authenticated
  if (!session) {
    res.status(401).json({ message: 'Not authenticated.' });
    return;
  }

  const username = session.user.username;

  try {
    const client = await connectDatabase();
    const usersCollection = client.db().collection('users');
    const cardsCollection = client.db().collection('cards');

    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const cardResult = await cardsCollection.insertOne({
      user: username,
      archived: false,
      squares: [
        {
          id: '1A',
          req: 'Title with a Title',
          book: null,
          color: null,
        },
        {
          id: '1B',
          req: 'Superheroes',
          book: null,
          color: null,
        },
        {
          id: '1C',
          req: 'Bottom of TBR',
          book: null,
          color: null,
        },
        {
          id: '1D',
          req: 'Magical Realism',
          book: null,
          color: null,
        },
        {
          id: '1E',
          req: 'Young Adult',
          book: null,
          color: null,
        },
        {
          id: '2A',
          req: 'Mundane Jobs',
          book: null,
          color: null,
        },
        {
          id: '2B',
          req: 'Published in 2000s',
          book: null,
          color: null,
        },
        {
          id: '2C',
          req: 'Angels and Demons',
          book: null,
          color: null,
        },
        {
          id: '2D',
          req: '5 Short Stories',
          book: null,
          color: null,
        },
        {
          id: '2E',
          req: 'Horror',
          book: null,
          color: null,
        },
        {
          id: '3A',
          req: 'Self/Indie Published',
          book: null,
          color: null,
        },
        {
          id: '3B',
          req: 'Set in Middle East',
          book: null,
          color: null,
        },
        {
          id: '3C',
          req: 'Published in 2023',
          book: null,
          color: null,
        },
        {
          id: '3D',
          req: 'Multiverses',
          book: null,
          color: null,
        },
        {
          id: '3E',
          req: 'POC Author',
          book: null,
          color: null,
        },
        {
          id: '4A',
          req: 'Book Club or Readalong Book',
          book: null,
          color: null,
        },
        {
          id: '4B',
          req: 'Novella',
          book: null,
          color: null,
        },
        {
          id: '4C',
          req: 'Mythical Beasts',
          book: null,
          color: null,
        },
        {
          id: '4D',
          req: 'Elemental Magic',
          book: null,
          color: null,
        },
        {
          id: '4E',
          req: 'Myths and Retellings',
          book: null,
          color: null,
        },
        {
          id: '5A',
          req: 'Queernorm Setting',
          book: null,
          color: null,
        },
        {
          id: '5B',
          req: 'Coastal Setting',
          book: null,
          color: null,
        },
        {
          id: '5C',
          req: 'Druid',
          book: null,
          color: null,
        },
        {
          id: '5D',
          req: 'Features Robots',
          book: null,
          color: null,
        },
        {
          id: '5E',
          req: 'Sequel',
          book: null,
          color: null,
        },
      ],
    });

    const newCardId = cardResult.insertedId.toString();

    client.close();
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Unable to connect to database. Try again later.' });
    return;
  }

  res.status(200).json({ message: 'Added new card!' });
}

export default handler;

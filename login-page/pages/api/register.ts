import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/db';
import User from '../../lib/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  try {
    await connectDB();

     const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email has been registered' });
    }

   const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
}

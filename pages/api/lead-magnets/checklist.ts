import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, consent } = req.body;

    if (!name || !email || !consent) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Checklist form submission:', {
      name,
      email,
      consent
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error processing checklist form:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

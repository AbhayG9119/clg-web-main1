import { getProfile } from '../../Backend/src/controllers/studentController.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method ' + req.method + ' Not Allowed' });
  }
  try {
    await getProfile(req, res);
  } catch (error) {
    console.error('Error in profile API:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

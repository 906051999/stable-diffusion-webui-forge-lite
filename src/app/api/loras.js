// Next.js API Route: pages/api/loras.js

export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const response = await fetch('http://127.0.0.1:7860/sdapi/v1/loras');
  
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error || 'Failed to get loras' });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Loras fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch loras from sdapi' });
    }
  }
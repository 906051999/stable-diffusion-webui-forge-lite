// Next.js API Route: pages/api/progress.js

export default async function handler(req, res) {
    const { job_id } = req.query;
  
    if (!job_id) {
      return res.status(400).json({ error: 'Missing job_id' });
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:7860/sdapi/v1/progress?job_id=${job_id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error || 'Failed to get progress' });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Progress fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch progress from sdapi' });
    }
  }
const API_BASE_URL = '/api';

export async function txt2img(params) {
  try {
    const response = await fetch(`${API_BASE_URL}/txt2img`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate image');
    }

    const data = await response.json();
    return {
      id: data.job_id,
      getResult: async () => data,
    };
  } catch (error) {
    console.error('txt2img error:', error);
    throw error;
  }
}

export async function skip() {
  try {
    const response = await fetch(`${API_BASE_URL}/skip`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to skip');
    }

    return await response.json();
  } catch (error) {
    console.error('skip error:', error);
    throw error;
  }
}

export async function getSchedulers() {
  try {
    const response = await fetch(`${API_BASE_URL}/schedulers`);

    if (!response.ok) {
      throw new Error('Failed to get schedulers');
    }

    return await response.json();
  } catch (error) {
    console.error('getSchedulers error:', error);
    throw error;
  }
}

export async function getLoras() {
  try {
    const response = await fetch(`${API_BASE_URL}/loras`);

    if (!response.ok) {
      throw new Error('Failed to get loras');
    }

    return await response.json();
  } catch (error) {
    console.error('getLoras error:', error);
    throw error;
  }
}

export async function getProgress(jobId) {
  try {
    const response = await fetch(`${API_BASE_URL}/progress?job_id=${jobId}`);

    if (!response.ok) {
      throw new Error('Failed to get progress');
    }

    const data = await response.json();
    return data.progress; // 假设API返回 { progress: 50 }
  } catch (error) {
    console.error('getProgress error:', error);
    throw error;
  }
}
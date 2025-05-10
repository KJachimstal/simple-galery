import config from '../config';

export const fetchCats = async (limit = config.IMAGE_LIMIT) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const response = await fetch(`${config.API_BASE_URL}/images/search?limit=${limit}`, {
    headers: {
      'x-api-key': apiKey
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cats');
  }

  return response.json();
};

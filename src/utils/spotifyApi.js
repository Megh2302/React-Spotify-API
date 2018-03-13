import axios from 'axios';

const CLIENT_ID = '7e0f9c0006884816bfa8aed4ee813d08',
  CLIENT_SECRET = '6c114dc8654341769812033b09df8820';

const b64 = new Buffer(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const config = [
  {
    headers: {
      Authorization: `Basic ${b64}`
    }
  },
  (q, token) => ({
    params: {
      q,
      type: 'track',
      market: 'US'
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
];

export const Auth = async () => {
  const url = 'https://cs-554-spotify-proxy.herokuapp.com/api/token';
  const { data } = await axios.post(url,'grant_type=client_credentials',config[0]);
  return data;
};

export const searchForSongs = async (q, token) => {
  const url = 'https://cs-554-spotify-proxy.herokuapp.com/v1/search';
  const { data } = await axios.get(url,config[1](q, token));
  return data;
};


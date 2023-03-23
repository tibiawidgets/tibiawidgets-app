import fetch from 'axios';

const HOST = 'http://localhost:3000';

export const login = async (email: string) => {
  const result = await fetch.post(`${HOST}/login`, { email });
  return result;
};

export default {
  login
};

import fetch from 'axios';

const HOST = 'http://localhost:3000';

const withAuth = async (method: string, url: string, data: any) => {
  const token = localStorage.getItem('token');
  return fetch(url, { method, headers: { Authorization: `Bearer ${token}` }, data });
};

export const login = async (email: string) => {
  const result = await fetch.post(`${HOST}/login`, { email });
  return result;
};

export const validateCode = async (email: string, code: string) => {
  const result = await fetch.post(`${HOST}/verify-code`, { email, code });
  return result;
};

export const getUserByEmail = async (email: string) => {
  const data = { email };
  const result = await withAuth('get', `${HOST}/user`, data);
  return result;
};

export default {
  login,
  validateCode,
  getUserByEmail
};

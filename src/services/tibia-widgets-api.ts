import fetch from 'axios';
import { Character } from '../types/types';

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
  const result = await withAuth('get', `${HOST}/user`, data).catch((e) => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  });
  return result;
};

export const getWorlds = async () => {
  const worlds = await fetch.get(`${HOST}/misc/worlds`);
  return worlds.data.worlds;
};

export const addCharacter = async (character: Character) => {
  const response = await withAuth('post', `${HOST}/user/characters`, character);
  return response.data;
};

export const getCharacters = async () => {
  const chars = await withAuth('get', `${HOST}/user/characters`, null);
  return chars;
};

export const deleteCharacter = async (id: string) => {
  const chars = await withAuth('delete', `${HOST}/user/characters/${id}`, null);
  return chars;
};

export default {
  login,
  validateCode,
  getUserByEmail,
  getWorlds,
  addCharacter,
  getCharacters,
  deleteCharacter
};

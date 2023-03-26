/**
 * Using Tibia Api to get the data
 * https://docs.tibiadata.com/
 */ import axios from 'axios';

// const host = 'https://api.tibiadata.com';
const host = 'https://dev.tibiadata.com/v4';

export const imagesUrl = 'https://static.tibia.com/images/library/';

export const getBosses = async () => {
  const bosses = await axios.get(`${host}/boostablebosses`);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  return bosses.data;
};

export const getCreatures = async () => {
  const creatures = await axios.get(`${host}/creatures`);
  return creatures.data;
};

export const getRashidLocation = () => {
  const dayCityMap = {
    monday: 'Svargrond',
    tuesday: 'Liberty Bay',
    wednesday: 'Port Hope',
    thursday: 'Ankrahmun',
    friday: 'Darashia',
    saturday: 'Edron',
    sunday: 'Carlin'
  };
  const date = new Date();
  const dayName = date.toLocaleDateString('en', { weekday: 'long' }).toLowerCase();
  return dayCityMap[dayName];
};

export const getCharacterInformation = async (characterName) => {
  const characterInfo = await axios.get(`${host}/character/${characterName}`);
  const json = await characterInfo.json();
  return json;
};

export const getRandomNumber = (min = 10, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isEmptyArray = (arr) => arr.length === 0;

export const hasChanged = (initial, current) => initial !== current;

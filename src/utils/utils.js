export const getRandomNumber = (min = 10, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomNumber = (min = 10, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const sortByAge = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].age < arr[i].age) {
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }

  return arr;
};

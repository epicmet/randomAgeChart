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

export const constructArr = (arr) => {
  const results = [];
  for (let profile of arr) {
    const {
      dob: { age },
    } = profile;
    if (results.some((obj) => obj.age === age)) {
      const index = results.findIndex((obj) => obj.age === age);
      results[index].amount++;
    } else {
      results.push({ age, amount: 1 });
    }
  }
  return results;
};

export const setBoundries = (min, max, arr) => {
  min = Number(min);
  max = Number(max);

  const res = [];
  for (const data of arr) {
    if (data.age >= min && data.age <= max) res.push(data);
  }
  return res;
};

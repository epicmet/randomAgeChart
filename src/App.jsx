import React, { useState, useEffect } from "react";

import { getRandomNumber, sortByAge } from "./utils";

const url = "https://randomuser.me/api/";

const App = () => {
  const [people, setPeople] = useState([]);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  useEffect(async () => {
    const resp = await fetch(`${url}?results=${getRandomNumber()}`);
    const data = await resp.json();
    console.log(data);
    const sortedArr = sortByAge(data.results);
    setPeople(sortedArr);
    setMin(sortedArr[0].dob.age);
    setMax(sortedArr[sortedArr.length - 1].dob.age);
  }, []);

  return <div></div>;
};

export default App;

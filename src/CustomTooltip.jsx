import React from "react";

const CustomTooltip = ({ active, payload, label, people }) => {
  if (active) {
    const currPeople = people.results.filter(
      (p) => p.dob.age === payload[0].payload.age
    );

    return (
      <div className="tooltip-container">
        <p className="age">Age: {label}</p>
        <p className="amount">Amount: {payload[0].payload.amount}</p>
        <div className="underline"></div>
        {currPeople.map((p, index) => (
          <article className="person" key={index}>
            <p className="name">{p.name.first}</p>
            <img
              className="thumbnail"
              src={p.picture.thumbnail}
              alt="thumbnail"
            />
          </article>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;

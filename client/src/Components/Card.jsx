import React from 'react';
import '../Styles/Card.css';

export default function Card({
  image,
  name,
  temperaments,
  min_weight,
  max_weight,
}) {
  return (
    <div className="card">
      <h1 className="info">{name}</h1>
      <h3 className="info">
        {(function (temperaments) {
          if (typeof temperaments === "string") {
            return temperaments;
          }
          if (Array.isArray(temperaments)) {
            let temps = temperaments.map((el) => el.name);
            return temps.join(", ");
          }
        })(temperaments)}
      </h3>
      <img
        src={image}
        alt={`${name}`}
        width="250px"
        heigth="200px"
        className="imageDog"
      />
      {name !== "Sorry, looks like we dont have that dog breed" ? (
        <h3 className="info">
          Weight: {min_weight} - {max_weight} kg
        </h3>
      ) : (
        <></>
      )}
    </div>
  );
}

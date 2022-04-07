import React from "react";

import "../styles/Card.css";
function Card({ pokemon, loading, infpok }) {
  console.log(pokemon);
  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <div className="container-card">
              <div className="Card" key={item.id} onClick={() => infpok(item)}>
                <h2>{item.id}</h2>
                <img src={item.sprites.back_default} />
                <h1>{item.name}</h1>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default Card;

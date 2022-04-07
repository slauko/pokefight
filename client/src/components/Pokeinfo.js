import React from "react";
import "../styles/Pokeinfo.css";

function Pokeinfo({ data }) {
  console.log(data);
  return (
    <div>
      {!data ? (
        ""
      ) : (
        <>
          <h1>{data.name}</h1>
          <img
            className="image"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt="charmander"
          />
          <div className="abilities">
            {data.abilities.map((poke) => {
              return (
                <div className="group">
                  <h1>{poke.ability.name}</h1>
                </div>
              );
            })}
          </div>
          <div className="base-stats">
            {data.stats.map((poke) => {
              return (
                <>
                  <h3>
                    {poke.stat.name}:{poke.base_stat}
                  </h3>
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Pokeinfo;

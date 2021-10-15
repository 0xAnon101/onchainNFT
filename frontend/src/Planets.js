import React from "react";

const Planets = () => {
  return (
    <>
      <div className="planet-1 hidden-mobile">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://static.hatchxr.com/images/landing/kids/planet_1.png"
            type="image/png"
          />
          <source
            media="(max-width: 1900px)"
            srcSet="https://static.hatchxr.com/images/landing/kids/planet_1@2x.png"
            type="image/png"
          />
          <img
            src="https://static.hatchxr.com/images/landing/kids/planet_1@3x.png"
            alt="planet_1"
          />
        </picture>
      </div>
      <div className="planet-2 hidden-mobile">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://static.hatchxr.com/images/landing/kids/planet_2.png"
            type="image/png"
          />
          <source
            media="(max-width: 1900px)"
            srcSet="https://static.hatchxr.com/images/landing/kids/planet_2@2x.png"
            type="image/png"
          />
          <img
            src="https://static.hatchxr.com/images/landing/kids/planet_2@3x.png"
            alt="planet_2"
          />
        </picture>
      </div>
    </>
  );
};

export default Planets;

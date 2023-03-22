import { useState, useEffect } from "react";

import AttributeCard from "./AttributeCard";
import axios from "axios";

import "./Dashboard.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
function checkRestrict(banAttribute, attributes) {
  if (!attributes) return false;
  for (let attribute of attributes) {
    if (banAttribute.has(attribute)) return false;
  }
  return true;
}
function DashBoard(props) {
  const [attributes, setAttributes] = useState({});
  const getCatFromAPI = async () => {
    let cat;
    do {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search",
        {
          params: {
            limit: 1,
            has_breeds: 1,
            api_key: ACCESS_KEY,
          },
        }
      );
      const origin = [response.data[0].breeds[0].origin];
      const life_span = [response.data[0].breeds[0].life_span + " years"];
      const characteristics =
        response.data[0].breeds[0].temperament.split(", ");

      if (
        checkRestrict(props.banAttribute.origin, origin) &&
        checkRestrict(props.banAttribute.characteristics, characteristics) &&
        checkRestrict(props.banAttribute.life_span, life_span)
      ) {
        cat = response.data[0];
      }
    } while (!cat);

    return cat;
  };

  const [currentCat, setCurrentCat] = useState(getCatFromAPI());

  function generateNewCat() {
    getCatFromAPI().then((cat) => {
      setCurrentCat(cat);
      setAttributes({
        origin: cat.breeds[0].origin,
        characteristics: cat.breeds[0].temperament.split(", ")[0],
        life_span: cat.breeds[0].life_span + " years",
      });
			
    });
  }

  function addBanAttribute(attribute, attribute_content) {
    props.updateBanAttribute(attribute, attribute_content);
  }

  useEffect(() => {
    generateNewCat();
  }, []);

  return (
    <div className="container">
      <h1>Veni Vici!</h1>
      <h3>Discover your dream cats!</h3>
			<br />
			<br />
      <h2>{currentCat && currentCat.breeds && currentCat.breeds[0].name}</h2>
      <div className="m-30">
        <div className="d-flex flex-row justify-content-center">
          {Object.keys(attributes).map((attribute) => (
            <AttributeCard
              content={attributes[attribute]}
              key={attribute}
              onClick={(e) => addBanAttribute(attribute, attributes[attribute])}
            />
          ))}
        </div>
        {currentCat && (
          <img src={currentCat.url} alt="cat" className="cat-img" />
        )}
      </div>
      <button type="button" className="btn btn-info" onClick={generateNewCat}>
        Discover
      </button>
    </div>
  );
}

export default DashBoard;

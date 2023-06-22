import { useState } from "react";
import "./index.css";

import windIcon from "./assets/wind-icon.svg";
import dropIcon from "./assets/drop-icon.svg";
import windSideIcon from "./assets/wind-side.svg";

const api = {
  key: "dc27e06df1d60ff82983f10702351304",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  function toTextualDescription(degree) {
    if (degree > 337.5) return "Northerly";
    if (degree > 292.5) return "North Westerly";
    if (degree > 247.5) return "Westerly";
    if (degree > 202.5) return "South Westerly";
    if (degree > 157.5) return "Southerly";
    if (degree > 122.5) return "South Easterly";
    if (degree > 67.5) return "Easterly";
    if (degree > 22.5) {
      return "North Easterly";
    }
    return "Northerly";
  }

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day} ${date} ${month}`;
  };

  const currentDate = new Date();
  const formattedDate = dateBuilder(currentDate);

  function Greeting() {
    if (typeof weather.main == "undefined") {
      return (
        <div className="greeting-container" type>
          <div className="greeting-text">
            <p className="typed-text">
              Hello! Wanna know some forecast? <br />
              Just enter your location :)
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <Greeting />
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            <div className="date-container">
              <div className="date">{formattedDate}</div>
            </div>
            <div className="weather-box">
              <div className="weather-container">
                <div className="weather"></div>
                {weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1)}
              </div>

              <div className="temp">{Math.round(weather.main.temp)}°</div>
              <div className="description-container">
                <h2>Description</h2>
                <p>
                  Now it feels like {Math.round(weather.main.feels_like)}°,
                  actually {Math.round(weather.main.temp)}°. Today the
                  temperature is felt in the range from{" "}
                  {Math.round(weather.main.temp_min)}° to{" "}
                  {Math.round(weather.main.temp_max)}°.
                </p>
              </div>

              <div className="weather-info-box">
                <div className="weather-info-containers">
                  <img src={windIcon} alt="" className="svg-icon" />
                  <div className="weather-info-text">
                    <p>{weather.wind.speed}km/h</p>
                  </div>
                </div>

                <div className="weather-info-containers">
                  <img src={dropIcon} alt="" className="svg-icon" />
                  <div className="weather-info-text">
                    <p>{weather.main.humidity}%</p>
                  </div>
                </div>

                <div className="weather-info-containers">
                  <img src={windSideIcon} alt="" className="svg-icon" />
                  <div className="weather-info-text">
                    <p>{toTextualDescription()}</p>
                  </div>
                </div>

              </div>

              <div className="sunset-and-sunrise-container">
                <p>
                  Sunrise:{" "}
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                </p>
                <p>
                  Sunset:{" "}
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

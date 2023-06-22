import { useState } from "react";
import "./index.css";

import windIcon from "./assets/wind-icon.svg";
import dropIcon from "./assets/drop-icon.svg";
import windSideIcon from "./assets/wind-side.svg";

import Description from "./components/description/description.component";
import Greeting from "./components/greeting/greeting.component";
import DateContainer from "./components/date/date.component";
// import WeatherInfo from "./components/weather-info-icons/weather-info.component";

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
        <Greeting weather={weather} />
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            <DateContainer formattedDate={formattedDate} />
            <div className="weather-box">
              <div className="weather-container">
                <div className="weather"></div>
                {weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1)}
              </div>
              <div className="temp">{Math.round(weather.main.temp)}°</div>

              <Description weather={weather} />
              {/* <WeatherInfo
                weather={weather}
                windIcon={windIcon}
                dropIcon={dropIcon}
                windSideIcon={windSideIcon}
              /> */}
              <div className="weather-info-box">
                <div className="weather-info-containers">
                  <img src={windIcon} alt="" className="svg-icon" />
                  <div className="weather-info-text">
                    <p>
                      {weather.wind.speed}
                      <a>km/h</a>
                    </p>
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
                    <p>{toTextualDescription(weather.wind.deg)}</p>
                  </div>
                </div>
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

import { useState, useEffect, React } from "react";
import "./index.css";

import windIcon from "./assets/wind-icon.svg";
import dropIcon from "./assets/drop-icon.svg";
import windSideIcon from "./assets/wind-side.svg";

import Description from "./components/description/description.component";
import Greeting from "./components/greeting/greeting.component";
import DateContainer from "./components/date/date.component";
// import Weather5Days from "./components/weather5days/weather5days.component";


const api = {
  key: "dc27e06df1d60ff82983f10702351304",
  base: "https://api.openweathermap.org/data/2.5/",
};

const api5 = {
  key: "8e80e70cb975e37c5a4e7006b03e4a72",
  base: "https://api.openweathermap.org/data/2.5/",
};


function App() {
  const [query, setQuery] = useState("");
  const [forecastQuery, setForecastQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherData, setForecastWeather] = useState({});


  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });

      fetch(`${api5.base}forecast?q=${query}&units=metric&&appid=${api5.key}`)
        .then((res) => res.json())
        .then((result) => {
          setForecastWeather(result.list);
          setForecastQuery("");
          console.log(result);
        });
    }
  };

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    setQuery(value);
    setForecastQuery(value);
    console.log("Query:", query);
    console.log("Forecast Query:", forecastQuery);
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
            onChange={handleInputChange}
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
            <div>
              {weatherData && weatherData.length > 0 ? (
                weatherData.slice(0, 5).map((list, index) => {
                  const minTemperature = Number(list.main.temp_min - 273.15).toFixed(1);
                  const maxTemperature = Number(list.main.temp_max - 273.15).toFixed(2);
                  const weatherIcon = `http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`;

                  return (
                    <div key={index}>
                      <p>Min: {minTemperature}°</p>
                      <p>Max: {maxTemperature}°</p>
                      <img src={weatherIcon} alt="Weather Icon" />
                    </div>
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
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

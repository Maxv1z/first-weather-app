import { useState, useEffect, React } from "react";

import "./index.scss";

import windIcon from "./assets/wind-icon.svg";
import dropIcon from "./assets/drop-icon.svg";
import windSideIcon from "./assets/wind-side.svg";
import rightArrow from "./assets/right-arrow.svg";

import Popup from "./components/popup/popup.component";
import Description from "./components/description/description.component";
import SearchBox from "./components/search-box/search-box.compoent.jsx";
import Greeting from "./components/greeting/greeting.component";
import DateContainer from "./components/date/date.component";
import Weather5Days from "./components/weather5days/weather5days.component";
import WeatherInfoBox from "./components/weather-info-box/weatherInfobox.component.jsx";
import { isVisible } from "@testing-library/user-event/dist/utils";
import { render } from "@testing-library/react";

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
  const [city, setCity] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setCity(storedCity);
      setQuery(storedCity);
      fetchWeatherData(storedCity);
      // Render the popup component
      setShowPopup(true);
    }
  }, []);

  const [theme, setTheme] = useState("default-class");
  const [isYellow, setYellow] = useState(true);

  const toggleTheme = () => {
    setYellow(!isYellow);
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetchWeatherData(query);
    }
  };

  const fetchWeatherData = (cityName) => {
    fetch(`${api.base}weather?q=${cityName}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });

    fetch(`${api5.base}forecast?q=${cityName}&units=metric&&appid=${api5.key}`)
      .then((res) => res.json())
      .then((result) => {
        setForecastWeather(result.list);
        setForecastQuery("");
        console.log(result);
      });
  };

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    setQuery(value);
    setCity(value);
    localStorage.setItem("city", value.toString());
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

  var hr = new Date().getHours();

  return (
    <div
      className={
        typeof weather.main !== "undefined" ? (isYellow ? "dark" : "light") : ""
      }
      id="app"
    >
      <div>{showPopup && <Popup />}</div>
      <SearchBox
        handleInputChange={handleInputChange}
        query={query}
        search={search}
      />
      <Greeting weather={weather} />
      {typeof weather.main != "undefined" ? (
        <>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
          </div>
          <DateContainer formattedDate={formattedDate} />
          <div className="weather-box">
            <div className="weather-container">
              <div></div>
              <p className="weather">
                {weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1)}
              </p>
            </div>
            <div className="temp">{Math.round(weather.main.temp)}°</div>

            <Description weather={weather} />
            <WeatherInfoBox
              weather={weather}
              windIcon={windIcon}
              dropIcon={dropIcon}
              windSideIcon={windSideIcon}
            />
          </div>
          <Weather5Days weatherData={weatherData} rightArrow={rightArrow} />
          <button onClick={toggleTheme} className="theme-button">Change theme?</button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

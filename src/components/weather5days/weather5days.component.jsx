import { React, useEffect, useRef } from "react";

import "./weather5days.style.scss";

import "./weather-icons.css";

const WeatherInfo5Days = ({ weatherData, rightArrow }) => {
  const weatherInfoRef = useRef(null);

  useEffect(() => {
    if (weatherInfoRef.current) {
      setTimeout(() => {
        const dayBlocks = weatherInfoRef.current.querySelectorAll(".day-block");
        dayBlocks.forEach((block, index) => {
          const delay = index * 0.2; // Adjust the delay value as needed
          block.style.animationDelay = `${delay}s`;
          block.classList.add("slide-in");
        });
      }, 5000); // Delay of 2000 milliseconds (2 seconds)
    }
  }, [weatherData]);

  return (
    <>
      <div className="hourly-forecast">
        <h2>Hourly forecast </h2>
        <img src={rightArrow} className="right-arrow" alt="img" />
      </div>

      <ul className="weather-info-5-days" ref={weatherInfoRef}>
        {weatherData && weatherData.length > 0 ? (
          weatherData.slice(0, 20).map((list, index) => {
            const temp5Days = Number(list.main.temp).toFixed(0);
            const date5Days = new Date(list.dt * 1000);
            const formattedDate = date5Days.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
            const date = new Date(list.dt_txt);
            const options = {
              hour: "numeric",
              hour12: true,
            };

            const time5Days = date
              .toLocaleString("en-US", options)
              .replace(":", "")
              .replace(" ", "")
              .toLocaleLowerCase();

            const dict = {
              "01d": "wi-day-sunny",
              "02d": "wi-day-cloudy",
              "03d": "wi-cloud",
              "04d": "wi-cloudy",
              "09d": "wi-showers",
              "10d": "wi-day-rain-mix",
              "11d": "wi-thunderstorm",
              "13d": "wi-snow",
              "50d": "wi-fog",
              "01n": "wi-night-clear",
              "02n": "wi-night-alt-cloudy",
              "03n": "wi-night-alt-cloudy-high",
              "04n": "wi-cloudy",
              "09n": "wi-night-alt-sprinkle",
              "10n": "wi-night-alt-showers",
              "11n": "wi-night-alt-thunderstorm",
              "13n": "wi-night-alt-snow",
              "50n": "wi-night-fog",
            };

            const weatherIcon = dict[list.weather[0].icon];

            const iconStyle = {
              fontSize: "2rem",
              color: "var(--text-color)",
              margin: "0.5em auto 0.5em auto",
            };

            return (
              <li className="day-block" key={index}>
                <div>
                  <div className="temp-5-days">
                    <p>{temp5Days}°</p>
                  </div>
                  <i class={`wi ${weatherIcon}`} style={iconStyle}></i>
                  <div>
                    <p className="date-5-days">{formattedDate}</p>
                    <p className="time-5-days">{time5Days}</p>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </>
  );
};

export default WeatherInfo5Days;

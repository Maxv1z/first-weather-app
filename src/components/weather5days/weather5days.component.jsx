import React from "react";

import "./weather5days.style.css";

const WeatherInfo5Days = ({ weatherData }) => {
  return (
    <>
      <div className="hourly-forecast">
        <h2>Hourly forecast</h2>
      </div>
      <ul className="weather-info-5-days">
        {weatherData && weatherData.length > 0 ? (
          weatherData.slice(0, 10).map((list, index) => {
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
            const weatherIcon = `http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`;

            return (
              <li className="day-block" key={index}>
                <div>
                  <div className="temp-5-days">
                    <p>{temp5Days}°</p>
                  </div>
                  <img src={weatherIcon} alt="Weather Icon" />
                  <div className="date-5-days">
                    <p>{formattedDate}</p>
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

import { React, useEffect, useRef } from "react";

import "./weather5days.style.scss";

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

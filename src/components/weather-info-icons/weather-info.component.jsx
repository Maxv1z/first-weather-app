// import React from "react";

// import windIcon from "./assets/wind-icon.svg";
// import dropIcon from "./assets/drop-icon.svg";
// import windSideIcon from "./assets/wind-side.svg";

// const WeatherInfo = ({ weather, windIcon, dropIcon, windSideIcon }) => {
//   const toTextualDescription = (degree) => {
//     if (degree > 337.5) return "Northerly";
//     if (degree > 292.5) return "North Westerly";
//     if (degree > 247.5) return "Westerly";
//     if (degree > 202.5) return "South Westerly";
//     if (degree > 157.5) return "Southerly";
//     if (degree > 122.5) return "South Easterly";
//     if (degree > 67.5) return "Easterly";
//     if (degree > 22.5) {
//       return "North Easterly";
//     }
//     return "Northerly";
//   };
//   return (
//     <div className="weather-info-box">
//       <div className="weather-info-containers">
//         <img src={windIcon} alt="" className="svg-icon" />
//         <div className="weather-info-text">
//           <p>
//             {weather.wind.speed}
//             <a>km/h</a>
//           </p>
//         </div>
//       </div>

//       <div className="weather-info-containers">
//         <img src={dropIcon} alt="" className="svg-icon" />
//         <div className="weather-info-text">
//           <p>{weather.main.humidity}%</p>
//         </div>
//       </div>

//       <div className="weather-info-containers">
//         <img src={windSideIcon} alt="" className="svg-icon" />
//         <div className="weather-info-text">
//           <p>{toTextualDescription(weather.wind.deg)}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherInfo;

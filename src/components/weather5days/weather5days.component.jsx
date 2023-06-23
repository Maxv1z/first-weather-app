// const Weather5Days = ({ query }) => {
//   return (
//     <div>
//       <input
//         type="text"
//         className="search-bar"
//         placeholder="Search..."
//         onKeyPress={handleForecastSearch}
//       />
//       {weatherData && weatherData.length > 0 ? (
//         weatherData.map((item, index) => {
//           const minTemperature = Number(item.main.temp_min - 273.15).toFixed(1);
//           const maxTemperature = Number(item.main.temp_max - 273.15).toFixed(2);
//           const weatherIcon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

//           return (
//             <div key={index}>
//               <p>Min: {minTemperature}°</p>
//               <p>Max: {maxTemperature}°</p>
//               <img src={weatherIcon} alt="Weather Icon" />
//             </div>
//           );
//         })
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Weather5Days;

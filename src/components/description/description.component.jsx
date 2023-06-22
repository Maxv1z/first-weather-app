const Description = ({ weather }) => {
  return (
    <div className="description-container">
      <h2>Description</h2>
      <p>
        Now it feels like {Math.round(weather.main.feels_like)}°, actually{" "}
        {Math.round(weather.main.temp)}°. Today the temperature is felt in the
        range from {Math.round(weather.main.temp_min)}° to{" "}
        {Math.round(weather.main.temp_max)}°.
      </p>
    </div>
  );
};

export default Description;

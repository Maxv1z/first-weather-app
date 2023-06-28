import "./greeting.style.scss";

const Greeting = ({ weather }) => {
  if (typeof weather.main == "undefined") {
    return (
      <div className="greeting-container">
        <div className="greeting-text">
          <p className="typed-text">
            Hello! Wanna know some forecast? <br />
            Just enter your location :)
          </p>
        </div>
      </div>
    );
  }
};

export default Greeting;

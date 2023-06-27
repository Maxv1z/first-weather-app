import "./date.style.scss";

const DateContainer = ({ formattedDate }) => {
  return (
    <div className="date-container">
      <div className="date">{formattedDate}</div>
    </div>
  );
};

export default DateContainer;

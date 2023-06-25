import React from "react";

import "./search-box.style.css";

const SearchBox = ({ handleInputChange, query, search }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-bar"
        placeholder="Enter your city"
        onChange={handleInputChange}
        value={query}
        onKeyPress={search}
      />
    </div>
  );
};

export default SearchBox;

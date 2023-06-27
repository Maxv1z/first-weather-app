import React from "react";

import "./search-box.style.scss";

const SearchBox = ({ handleInputChange, query, search }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-bar"
        placeholder="City, country"
        onChange={handleInputChange}
        value={query}
        onKeyPress={search}
      />
    </div>
  );
};

export default SearchBox;

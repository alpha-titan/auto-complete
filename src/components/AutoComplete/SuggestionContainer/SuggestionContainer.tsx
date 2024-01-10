import React from "react";
import "../styles/autocomplete.styles.css";
import "./styles/suggestion.styles.css";
import Highlighter from "../Highlighter/Highlighter";
import { NO_RESULTS_FOUND } from "../constants";
import { ISuggestionContainer } from "../types";

const SuggestionContainer: React.FC<ISuggestionContainer> = ({
  filteredData,
  handleSuggestionClick,
  getDataKey,
  inputValue,
}) => {
  console.log({ filteredData });
  if (filteredData?.length === 0) {
    return (
      <ul className="suggestion-box">
        <li aria-disabled>{NO_RESULTS_FOUND}</li>
      </ul>
    );
  }
  return (
    <ul className="suggestion-box">
      {filteredData?.map((item) => (
        <li key={getDataKey(item)} onClick={() => handleSuggestionClick(item)}>
          <Highlighter query={inputValue} text={item} />
        </li>
      ))}
    </ul>
  );
};

export default SuggestionContainer;

import React from "react";
import "../styles/styles.css";
import Highlighter from "../Highlighter/Highlighter";

interface ISuggestionContainer<T = string> {
  filteredData: T[];
  inputValue: string;
  handleSuggestionClick: (item: T) => void;
  getDataKey: (item: T) => string;
}

const SuggestionContainer: React.FC<ISuggestionContainer> = ({
  filteredData,
  handleSuggestionClick,
  getDataKey,
  inputValue,
}) => {
  if (filteredData?.length === 0) {
    <ul className="suggestion-box">
      <li>"No results found"</li>
    </ul>;
  }
  return (
    <ul className="suggestion-box">
      {filteredData?.map((item) => (
        <li key={getDataKey(item)} onClick={() => handleSuggestionClick(item)}>
          <Highlighter query={inputValue} text={item} />
          {/* {item} */}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionContainer;

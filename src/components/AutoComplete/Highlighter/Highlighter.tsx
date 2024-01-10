import React from "react";
import "./styles/highlighter.styles.css";
import { IHighlighterProps } from "../types";

const Highlighter: React.FC<IHighlighterProps> = ({ query, text }) => {
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="highlight">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export default Highlighter;

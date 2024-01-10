import React from "react";
import "./styles/highlighter.styles.css";

interface IHighlighterProps {
  query: string;
  text: string;
}

const Highlighter: React.FC<IHighlighterProps> = ({
  query,
  text,
}): React.ReactNode[] => {
  const result: React.ReactNode[] = [];
  let index = 0;

  if (query) {
    while (index < text.length) {
      const matchIndex = text.toLowerCase().indexOf(query.toLowerCase(), index);

      if (matchIndex === -1) {
        result.push(<span key={index}>{text.substring(index)}</span>);
        break;
      }

      const nonMatchPart = text.substring(index, matchIndex);
      const matchPart = text.substring(matchIndex, matchIndex + query.length);

      result.push(
        <React.Fragment key={index}>
          {nonMatchPart && <span>{nonMatchPart}</span>}
          {matchPart && <span className="highlight">{matchPart}</span>}
        </React.Fragment>
      );

      index = matchIndex + query.length;
    }
  }

  return result;
};

export default Highlighter;

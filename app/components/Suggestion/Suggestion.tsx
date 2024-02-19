import React from "react";
import "./Suggestion.scss";

interface SuggestionProps {
  label: string;
}

const Suggestion: React.FC<SuggestionProps> = ({ label }) => {
  return (
    <div className="suggestion">
      {label}
    </div>
  );
};

export default Suggestion;

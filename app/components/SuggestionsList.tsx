import React from "react";
import Suggestion from "./Suggestion";

interface SuggestionsListProps {
  suggestions: string[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions }) => {
  return (
    <div className="suggstions-container">
      {suggestions.map((suggestion, index) => (
        <Suggestion key={index} label={suggestion} />
      ))}
    </div>
  );
};

export default SuggestionsList;

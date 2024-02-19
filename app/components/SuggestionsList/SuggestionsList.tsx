import React from "react";
import Suggestion from "../Suggestion/Suggestion";
import "./SuggestionsList.scss";

export interface Suggestions {
  title: string;
  items: string[];
}

interface SuggestionsListProps {
  suggestionsList: Suggestions[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestionsList = []}) => {
  return (
    <div className="suggstions-list-container">
      {suggestionsList.map((suggestions, index) => (
        <div className="suggestions" key={index}>
          <h3 className="suggestions-title">{suggestions.title}</h3>
          {suggestions.items.map((item, index) => (
            <Suggestion key={index} label={`${index + 1}) ${item}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SuggestionsList;

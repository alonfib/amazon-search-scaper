import React from "react";
import Suggestion from "./Suggestion";

export interface Suggestions {
  title: string;
  items: string[];
}

interface SuggestionsListProps {
  suggestionsList: Suggestions[];
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestionsList = []}) => {
  return (
    <div className="suggstions-list-container" style={{
      display: "flex",
      padding: "20px",
      flexWrap: "wrap",
    
    }}>
      {suggestionsList.map((suggestions, index) => (
        <div className="suggestions" key={index} style={{minWidth: '20%', flex: 1}}>
          <h3 className="suggestions-title" style={{textAlign: 'center'}}>{suggestions.title}</h3>
          {suggestions.items.map((item, index) => (
            <Suggestion key={index} label={item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SuggestionsList;

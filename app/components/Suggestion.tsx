import React from "react";

interface SuggestionProps {
  label: string;
}

const Suggestion: React.FC<SuggestionProps> = ({ label }) => {
  return (
    <div className="suggestion" style={{  color: "black" }}>
      {label}
    </div>
  );
};

export default Suggestion;

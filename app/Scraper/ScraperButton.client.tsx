'use client';

import React from "react";
import Button from "../components/Button/Button.client";

interface ScraperButtonProps {
  onClick?: () => void;
}

const ScraperButton: React.FC<ScraperButtonProps> = ({onClick}) => {
  return (  
    <Button
      label="Scrape"
      onClick={onClick} 
    />
  );
};

export default ScraperButton;

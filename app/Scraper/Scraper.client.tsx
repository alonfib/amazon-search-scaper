'use client';

import React from "react";
import { scrape } from "./scraperUtils";
import Button from "../components/Button/Button.client";

const Scraper: React.FC = () => {
  const handleScraper = async () => {
    scrape();
  };
  
  return (  
    <Button
      label="Scrape"
      onClick={handleScraper} 
    />
  );
};

export default Scraper;

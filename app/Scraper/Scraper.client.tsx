import React, { useState } from "react";
import Button from "../components/Button/Button.client";
import useSWR from "swr";
import SuggestionsList from "../components/SuggestionsList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Scraper: React.FC = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, error, mutate } = useSWR(shouldFetch ? "/api/amazon" : null, fetcher);
  const [isLoading, setIsLoading] = useState(false);

  const handleScraper = async () => {
    setIsLoading(true);
    setShouldFetch(true);
    await mutate("/api/amazon");
  };

  return (
    <div>
      <Button label="Scrape" onClick={handleScraper} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <SuggestionsList suggestions={data.suggestions as string[]}/>}
    </div>
  );
};

export default Scraper;
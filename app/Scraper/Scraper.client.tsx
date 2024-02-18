import React, { useState } from "react";
import Button from "../components/Button/Button.client";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Scraper: React.FC = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, error } = useSWR(shouldFetch ? "/api/amazon" : null, fetcher);
  const isLoading = shouldFetch && !data && !error;

  const handleScraper = () => {
    setShouldFetch(true);
    mutate("/api/amazon");
  };

  return (
    <div>
      <Button label="Scrape" onClick={handleScraper} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data.suggestions, null, 2)}</pre>}
    </div>
  );
};

export default Scraper;
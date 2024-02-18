import React, { useState } from "react";
import Button from "../components/Button/Button.client";
import useSWR from "swr";
import SuggestionsList, { Suggestions } from "../components/SuggestionsList";
import { ScrapperError, ScraperContainer, SubTitle, Title, Header } from "./Scraper.styled";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Scraper: React.FC = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldFetchUk, setShouldFetchUk] = useState(false);
  const { data, error, mutate } = useSWR(shouldFetch ? "/api/amazon" : null, fetcher);
  const { data: ukData, error: ukError, mutate: ukMutate } = useSWR(shouldFetchUk ? "/api/amazonUk" : null, fetcher);
  const [isLoading, setIsLoading] = useState(false);
  const [isUkLoading, setIsUkLoading] = useState(false);

  const handleScraper = async () => {
    setIsLoading(true);
    setShouldFetch(true);
    await mutate("/api/amazon");
  };

  const handleScraperUk = async () => {
    setIsUkLoading(true);
    setShouldFetchUk(true);
    await ukMutate("/api/amazonUk");
  };

  return (
    <ScraperContainer>
      <Header>
        <Title className="title">Amazon Suggestions</Title>
      </Header>
      <SubTitle>Click the button to scrape Amazon for suggestions</SubTitle>
      <SubTitle>It may take a few seconds to load</SubTitle>

      <Button label="Scrape Amazon" onClick={handleScraper} />
      {error && <ScrapperError>Error: {error.message}</ScrapperError>}
      <Button label="Scrape AmazonUk" onClick={handleScraperUk} />
      {ukError && <ScrapperError>Error: {ukError.message}</ScrapperError>}
      {isLoading && <p>Loading...</p>}
      {ukData && (
        <div>
          <h1>Amazon Uk Suggestions</h1>
          <SuggestionsList suggestionsList={ukData.suggestions as Suggestions[]} />
        </div>
      )}
      {data && (
        <div>
          <h1>Amazon Suggestions</h1>
          <SuggestionsList suggestionsList={data.suggestions as Suggestions[]} />
        </div>
      )}
    </ScraperContainer>
  );
};

export default Scraper;

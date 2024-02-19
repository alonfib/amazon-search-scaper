import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button.client";
import useSWR from "swr";
import SuggestionsList, { Suggestions } from "../components/SuggestionsList/SuggestionsList";
import "./Scraper.scss";
interface Data {
  suggestions: Suggestions[];
}

const buttonData = [
  {
    label: "Amazon UK",
    url: "http://amazon.co.uk"
  },
  {
    label: "Amazon US",
    url: "http://amazon.com"
  },
  {
    label: "Amazon CA",
    url: "http://amazon.ca"
  },
  {
    label: "Amazon DE",
    url: "http://amazon.de"
  },
  {
    label: "Amazon FR",
    url: "http://amazon.fr"
  },
  {
    label: "Amazon IT",
    url: "http://amazon.it"
  },
  {
    label: "Amazon ES",
    url: "http://amazon.es"
  },
  {
    label: "Amazon BR",
    url: "http://amazon.com.br"
  },
  {
    label: "Amazon IN",
    url: "http://amazon.in"
  },
  {
    label: "Amazon AU",
    url: "http://amazon.com.au"
  }
];

const fetcher = ([url, params]: [string, { url: string }]) => fetch(`${url}?url=${params.url}`).then((res) => res.json());

const Scraper: React.FC = () => {
  const [urlStrig, setUrlString] = useState("");
  const { data, error, isLoading } = useSWR(urlStrig.length ? ["/api/amazon", { url: urlStrig }] : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const handleButtonClick = (url: string) => {
    setUrlString(url);
  }

  return (
    <div className="scraper-container">
      <div className="header">
        <div className="title">Amazon Suggestions</div>
      </div>
      <div className="subtitles-cutontainer">
        <div className="subTitle">Click a button to get autocomplete suggestions from Amazon site </div>
        <div className="subTitle">It may take a few seconds to load</div>
      </div>
      <div className="buttons">
        {buttonData.map((button, index) => (
          <Button key={index} label={button.label} onClick={() => handleButtonClick(button.url)} />
        ))}
      </div>
      {error && <div className="error">Oops, an error occurred. Please try again.</div>}
      {isLoading && <p>Loading...</p>}
      {data && (
        <div className="">
          <h1 className="suggestions-container-title">Amazon Suggestions</h1>
          <SuggestionsList suggestionsList={data.suggestions as Suggestions[]} />
        </div>
      )}
    </div>
  );
};

export default Scraper;

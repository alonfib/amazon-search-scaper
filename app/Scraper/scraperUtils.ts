import axios from 'axios';
import { load } from 'cheerio';
import { Builder, logging } from 'selenium-webdriver';
// import { getAmazonHomePage } from '../api/scrape';

'server-only';

export const scrape = async () => {
  const url = 'http://amazon.com';
  const response = await axios.get('https://www.amazon.com/s?crid=36QNR0DBY6M7J&k=shelves&ref=glow_cls&refresh=1&sprefix=s%2Caps%2C309');
  // const response = await getAmazonHomePage(true, true);
  console.log("response", response);
  // const driver = await getDriver();
  // console.log("dirver", driver);
  return;
  // const scrapedData = $('.example-class').map((i, element) => $(element).text()).get();
  // res.status(200).json({ scrapedData });
};
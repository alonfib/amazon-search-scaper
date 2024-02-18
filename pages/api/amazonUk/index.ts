import puppeteer, { Browser, Page } from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";

const allLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const loginToAmazonUk = async () => {
  const browser = await puppeteer.launch({ headless: true});
  const page = await browser.newPage();
  await page.goto("http://amazon.co.uk");
  await page.waitForSelector("#twotabsearchtextbox", { timeout: 30000 });
  return { browser, page };
};

interface Suggestions {
  title: string;
  items: string[];
}

const getSuggests = async (page: Page, letter: string): Promise<Suggestions> => {
  await page.evaluate(() => ((document.querySelector("#twotabsearchtextbox") as HTMLInputElement).value = ""));
  await page.waitForSelector("#twotabsearchtextbox", { timeout: 1000 });
  await page.type("#twotabsearchtextbox", letter);
  await page.waitForSelector(".s-suggestion-container", { timeout: 1000 });
  let divTexts: string[] = [];
  let isGood = false;
  while (!isGood) {
    divTexts = (await page.$$eval(".s-suggestion", (elements) => elements.map((element) => element.textContent))).filter(
      (text) => typeof text === "string"
    ) as string[];
    if (divTexts.length > 0) {
      isGood = divTexts.every((text) => text[0] === letter);
    } else {
      isGood = true;
    }
  }

  const filteredTexts = divTexts.filter((text) => typeof text === "string") as string[];

  return { title: letter, items: filteredTexts };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, browser } = await loginToAmazonUk();
  let suggestions: Suggestions[] = [];

  for (let letter of allLetters) {
    const newSuggestions = await getSuggests(page, letter);
    suggestions = [...suggestions, newSuggestions];
    await new Promise((resolve) => setTimeout(resolve, 20)); // Wait 50 ms before fetching the next set of suggestions (to aviod bugs on collect data)
  }

  await browser.close();

  res.status(200).json({ suggestions });
}

import React from "react";
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

const loginToAmazon = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://amazon.com");
  await page.waitForSelector("#twotabsearchtextbox", { timeout: 30000 });
  return { browser, page };
};

const getSuggests = async (page: Page, letter: string) => {
  await page.evaluate(() => ((document.querySelector("#twotabsearchtextbox") as HTMLInputElement).value = ""));
  await page.waitForSelector("#twotabsearchtextbox", { timeout: 1000 });
  await page.type("#twotabsearchtextbox", letter);
  await page.waitForSelector(".s-suggestion-container", { timeout: 1000 });
  let divTexts: string[] = [];
  let isGood = false;
  while (!isGood) {
    divTexts = (await page.$$eval(".s-suggestion", (elements) => elements.map((element) => element.textContent))).filter((text) => typeof text === "string") as string[];
    if (divTexts.length > 0) {
      isGood = divTexts.every((text) => text[0] === letter);
    } else {
      isGood = true
    }
  }


  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Use setTimeout instead
  const filteredTexts = divTexts.filter((text) => typeof text === "string") as string[];
  return filteredTexts;
};

const getAllSuggestions = async () => {
  const { page, browser } = await loginToAmazon();
  let texts: string[] = [];

  for (let letter of allLetters) {
    const text = await getSuggests(page, letter);
    texts = [...texts, ...text];
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 2 seconds before fetching the next set of suggestions
  }

  console.log(texts);
  await browser.close();
  return texts;
};
// const CurrentPage = async () => {
//   console.log("fetch Data"); // Logs the number of 'a' elements on the page
//   // const number = fetchData();
//   const suggestion = await getAllSuggestions();
//   console.log("fetch Data end"); // Logs the number of 'a' elements on the page
//   re
//   // return (  );
// };

// export default CurrentPage;

// export default function handler(
//   _req: NextApiRequest,
//   res: NextApiResponse<{status: number}>,
// ) {
//   return res.status(200).json({status: 200});
// }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, browser } = await loginToAmazon();
  let texts: string[] = [];

  for (let letter of allLetters) {
    const text = await getSuggests(page, letter);
    texts = [...texts, ...text];
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before fetching the next set of suggestions
  }

  await browser.close();

  res.status(200).json({ suggestions: texts });
};


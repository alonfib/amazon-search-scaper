# Getting Started

To get started with the app, follow these steps:

1. Install the necessary dependencies by running `npm i` in your terminal.

2. Start the server by running `npm run dev`.

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or the alternative route displayed in the console if port 3000 is already in use).

You should now be able to see the result of the app in your browser.



## Note

If you want to hide the Chrome browser during scraping, you can go to `pages/api/amazon/index.ts`, find the `loginToAmazon` function, and set `{headless: true}`.

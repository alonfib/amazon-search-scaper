# Getting Started

To get started with the app, follow these steps:

1. Install the necessary dependencies by running `npm i` in your terminal.

2. Start the server by running `npm run dev`.

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or the alternative route displayed in the console if port 3000 is already in use).

You should now be able to see the result of the app in your browser.



## Important Information

During the development of this scraper, the Chrome browser was intentionally made visible to handle occasional CAPTCHA challenges.

If you prefer to run the scraper in the background, you can modify the Puppeteer settings to operate in headless mode. To do this, navigate to `pages/api/amazon/index.ts`, locate the `loginToAmazon` function, and set the `headless` option to `true` as shown below:

```typescript
const browser = await puppeteer.launch({ headless: true });
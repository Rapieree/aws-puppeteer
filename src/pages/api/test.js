import {JSDOM} from "jsdom";

const chrome = require(`chrome-aws-lambda`);
const puppeteer = require(`puppeteer`);

export default async (req, res) => {
  const browser = await puppeteer.launch(
      process.env.IS_PROD === `true`
        ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
        : {}
  );

  const page = await browser.newPage();
  await page.setUserAgent(`Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10`);
  await page.goto(`https://dzen.ru`);

  let content = await page.content();
  const jsdom = new JSDOM(content);
  let title = jsdom.window.document.querySelector(`title`);

  await browser.close();

  res.statusCode = 200;
  res.setHeader(`Content-Type`, `application/json`);
  res.end(JSON.stringify({title: title.textContent}));
};

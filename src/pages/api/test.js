import {JSDOM} from "jsdom";

const chrome = require(`chrome-aws-lambda`);
const puppeteer = require(`puppeteer-core`);

export default async (req, res) => {
  const {url, selector} = req.query;

  if (!url || !selector) {
    res.status(200).send(`Missed params "url" and "selector"`);
    return;
  }

  const browser = await puppeteer.launch(
      process.env.IS_PROD === `true`
        ? {
          args: chrome.args,
          executablePath: await chrome.executablePath,
          headless: chrome.headless,
        }
        : {}
  );

  try {
    const page = await browser.newPage();
    await page.setUserAgent(`Opera/9.80 (J2ME/MIDP; Opera Mini/5.1.21214/28.2725; U; ru) Presto/2.8.119 Version/11.10`);
    await page.goto(decodeURIComponent(url));

    let content = await page.content();
    const jsdom = new JSDOM(content);
    let elem = jsdom.window.document.querySelector(decodeURIComponent(selector));

    await browser.close();

    res.json({elem: elem.textContent});
  } catch (err) {
    res.status(400).json({error: err});
  }
};

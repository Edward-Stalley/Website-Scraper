import { url } from "node:inspector";
import { it } from "node:test";
import puppeteer, { MouseButton } from "puppeteer";
import { useState } from "react";

// TEST Variables
const href =
  "https://www.rockpapershotgun.com/forspokens-cinematic-trailer-shows-a-world-the-demo-suggests-it-might-not-live-up-to";

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // I want this href to be the "a.url" from my pages/index.js file
  await page.goto(`${href}`);

  const bodyText = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".article_body_content")).map((x) => x.textContent);
  });

  console.log(bodyText);
  await browser.close();
  console.log("finished");
}

start();

export default start;

import { url } from "node:inspector";
import { it } from "node:test";
import puppeteer, { MouseButton } from "puppeteer";
// import fs from "fs/promises";
import { useState } from "react";

// TEST Variables
const href =
  "https://www.rockpapershotgun.com/forspokens-cinematic-trailer-shows-a-world-the-demo-suggests-it-might-not-live-up-to";

async function start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

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

// await page.goto("https://www.rockpapershotgun.com/");
// await page.waitForSelector(" #onetrust-accept-btn-handler");
// await page.click("#onetrust-accept-btn-handler");
// await page.waitForSelector("#app_wrapper > header > nav.nav_main > nav.nav_primary > ul > li:nth-child(2) > a");
// await page.click("#app_wrapper > header > nav.nav_main > nav.nav_primary > ul > li:nth-child(2) > a");

// await page.waitForSelector("#content_above > div.page_content > section > ul");
// await page.click(
//   `#content_above > div.page_content > section > ul > li:nth-child(${id}) > div > div.wrapper > div.details > p.title > a`
// );

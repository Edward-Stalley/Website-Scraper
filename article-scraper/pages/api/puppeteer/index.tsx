import { it } from "node:test";
import puppeteer, { MouseButton } from "puppeteer";
// import fs from "fs/promises";
import { useState } from "react";

async function start() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.destructoid.com/");

  //   Need to make it so I put them all into an array of objects

  const postHandles = await page.$$(
    "#page > div.container > div > div.post-feed > div > div.col-lg-8 > div.post-feed-wrapper > article"
  );

  //   ******Loop through each article

  let items = [];

  for (const postHandle of postHandles) {
    let title: string | null | undefined = "Null";
    let img: string | undefined | null = "Null";

    try {
      title = await page.evaluate((el) => el.querySelector(".post-title")?.textContent, postHandle);
    } catch (err) {}

    try {
      img = await page.evaluate(
        (el) => el.querySelector("div.article-thumb > a > img")?.getAttribute("src"),
        postHandle
      );
    } catch (err) {}

    if (title != "Null") {
      // items.push({ title, img });
      console.log(typeof title, title, typeof img, img);
      items.push({ title: title, img: img });
    }
    // console.log(title, img);{}

    console.log(items);
  }

  //   *******
  //   Post Titles

  const postTitles = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".post-title")).map((x) => x.textContent);
  });

  //   Post Images

  const images = await page.$$eval(
    "#page > div.container > div > div.post-feed > div > div.col-lg-8 > div.post-feed-wrapper > article > div > div.article-thumb > a > img",
    (img) => {
      return img.map((img) => img.src);
    }
  );

  //   Post Content

  const urls = await page.$$eval(
    "#page > div.container > div > div.post-feed > div > div.col-lg-8 > div.post-feed-wrapper > article > div > div.article-thumb > a",
    (href) => {
      return href.map((href) => href.href);
    }
  );

  // ***********

  //   console.log(urls);
  await browser.close();
}
start();

export default start;

// Port
const PORT = 8800;

// Packages
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

// Call Express
const app = express();
app.listen(PORT, () => console.log(`listening on ${PORT}`));

// DATA FOR FETCHING
const websites = [
  {
    sitename: "destructoid",
    url: "https://www.destructoid.com",
    el1: ".article-default",
    el2: ".post-title",
  },
  {
    sitename: "rock paper shotgun",
    url: "http://www.rockpapershotgun.com",
    el1: ".article",
    el2: ".title",
  },
];

// GET ARTICLES FUNCTION

const getData = function (url, el1, el2) {
  axios(url)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      const articles = [];
      $(el1, html).each(function () {
        const title = $(this).find(el2).text();
        const url = $(this).find("a").attr("href");
        articles.push({
          title,
          url,
        });
      });
      console.log(articles);
    })
    .catch((err) => console.log(err));
};

// RUN GET ARTICLES FOR ALL SITES
websites.forEach((site) => {
  const { sitename, url, el1, el2 } = site;
  getData(url, el1, el2);
});

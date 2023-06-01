import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("http://www.rockpapershotgun.com");
  const html = await response.text();
  const $ = load(html);

  //   sitename: "rock paper shotgun",
  //       url: "http://www.rockpapershotgun.com",
  //       el1: ".summary_items",
  //       el2: ".strapline",

  const articles: { title: string; url: string | undefined; img:string|undefined }[] = [];
  $(".summary", html).each(function () {
    const title = $(this).find(".strapline").text();
    const url = $(this).find("a").attr("href");
    const img = $(this).find("img.thumbnail_image").attr("src");
    articles.push({
      title,
      url,
      img,
    });
  });

  console.log(articles);
  res.status(200).json({ articles });
};

export default getArticles;

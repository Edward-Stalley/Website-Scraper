import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("http://www.rockpapershotgun.com");
  const html = await response.text();
  const $ = load(html);
  const noImage = "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"


  //   sitename: "rock paper shotgun",
  //       url: "http://www.rockpapershotgun.com",
  //       el1: ".summary_items",
  //       el2: ".strapline",

  const articles: { title: string; url: string | undefined; img:string|undefined }[] = [];
  $(".summary", html).each(function () {
    const title = $(this).find(".strapline").text();
    const url = $(this).find("a").attr("href");
    const img = $(this).find("img.thumbnail_image").attr("src")|| noImage
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

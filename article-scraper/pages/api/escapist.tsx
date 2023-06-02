// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";

// type Data = {
//   name: string;
// };

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("https://www.escapistmagazine.com/");
  const html = await response.text();
  const $ = load(html);
  const noImage = "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"

  const articles: { title: string; url: string | undefined; img:string|undefined}[] = [];
  $(".list-item", html).each(function () {
    const title = $(this).find("h3").text();
    const url = $(this).find("a").attr("href");
    const img = $(this).find("a img").attr("src")||noImage

    articles.push({
      title,
      url,
      img,
    });
  });
  res.status(200).json({ articles });
};

export default getArticles;

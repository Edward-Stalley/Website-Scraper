// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("https://www.ign.com/?filter=games");
  const html = await response.text();
  const $ = load(html);

  const articles: { title: string; url: string | undefined; img: string | undefined }[] = [];
  $(".content-item", html).each(function () {
    const title = $(this).find(".item-title").text();
    const url = $(this).find("a").attr("href");
    const img = $(this).find("img").attr("src");
    articles.push({
      title,
      url,
      img,
    });
  });
  res.status(200).json({ articles });
};

export default getArticles;

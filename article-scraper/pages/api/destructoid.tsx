// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("http://www.destructoid.com");
  const html = await response.text();
  const $ = load(html);

  const articles: { title: string; url: string | undefined; img: string | undefined }[] = [];
  $(".article-default", html).each(function () {
    const title = $(this).find(".post-title").text();
    const url = $(this).find("a").attr("href");
    const img = $(this).find("a img").attr("src");
    // const img = "https://assets-prd.ignimgs.com/2023/05/14/totk-shrine-walkthrough-tears-of-the-kingdom-zelda-1684091746410.jpg?crop=16%3A9&width=282%201x,%20https://assets-prd.ignimgs.com/2023/05/14/totk-shrine-walkthrough-tears-of-the-kingdom-zelda-1684091746410.jpg?crop=16%3A9&width=282&dpr=2%202x";
    articles.push({
      title,
      url,
      img,
    });
  });
  res.status(200).json({ articles });
};

export default getArticles;

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

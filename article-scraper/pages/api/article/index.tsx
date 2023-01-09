import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("http://www.destructoid.com");
  const html = await response.text();
  const $ = load(html);

  const articles: { title: string; url: string | undefined }[] = [];
  $(".article-default", html).each(function () {
    const title = $(this).find(".post-title").text();
    const url = $(this).find("a").attr("href");
    articles.push({
      title,
      url,
    });
  });
  res.status(200).json({ articles });
};

export default getArticles;

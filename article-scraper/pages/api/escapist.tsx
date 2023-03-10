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

  const articles: { title: string; url: string | undefined }[] = [];
  $(".list-item", html).each(function () {
    const title = $(this).find("h3").text();
    const url = $(this).find("a").attr("href");
    articles.push({
      title,
      url,
    });
  });
  res.status(200).json({ articles });
};

export default getArticles;

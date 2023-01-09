// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req);
  const response = await fetch("https://www.giantbomb.com/");
  const html = await response.text();
  const $ = load(html);

  const articles: { title: string; url: string | undefined }[] = [];
  $(".js-carousel-strip__strip", html).each(function () {
    const title = $(this).find(".text-bold").text();
    const url = $(this).find("a").attr("href");
    articles.push({
      title,
      url,
    });
  });
  res.status(200).json({ articles });
};

export default getArticles;

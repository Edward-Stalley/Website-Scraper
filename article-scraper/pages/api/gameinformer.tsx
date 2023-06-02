// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("https://www.gameinformer.com/");
  const html = await response.text();
  const $ = load(html);

  const articles: { title: string; url: string | undefined; img:string|undefined  }[] = [];
  $(".article-body", html).each(function () {
    const title = $(this).find('.article-title.page-title a').text()
    const url =  "https://www.gameinformer.com" + $(this).find("a").attr("href");
    const style = $(this).find('.article-image').attr('style');
    const imgElement = $(this).find(".article-image");
    const img = "https://www.gameinformer.com" + imgElement.attr("data-imgurl");

      articles.push({
      title,
      url,
      img,

    });
  });
  res.status(200).json({ articles });
};

export default getArticles;

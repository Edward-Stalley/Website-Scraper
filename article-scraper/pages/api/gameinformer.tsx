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
    const url =  "https://www.gameinformer.com/" + $(this).find("a").attr("href");
    const style = $(this).find('.article-image').attr('style');
    const imgElement = $(this).find(".article-image");
    const img = "https://www.gameinformer.com/" + imgElement.attr("data-imgurl");

    // const img = "https://www.gameinformer.com/sites/default/files/styles/full/public/2023/05/31/683c109a/clives_life_header.jpg"
      articles.push({
      title,
      url,
      img,

    });
  });
  res.status(200).json({ articles });
};

export default getArticles;


// const imageSrc = img.find('.article-image').css('background-image');
// const imageUrl = imageSrc.replace(/url\(['"]?([^'"]+)['"]?\)/, '$1');
// const mainText = img.find('.article-title.page-title a').text();
// // const url = img.find('.article-title.page-title a').attr('href');
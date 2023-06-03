// my original code

// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import { Cheerio, load } from "cheerio";
// import fetch from "node-fetch"

// const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
//   const response = await fetch("http://www.destructoid.com");
//   const html = await response.text();
//   const $ = load(html);
//   const noImage = "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"

//   const articles: { title: string; url: string | undefined; img: string | undefined }[] = [];
//   $(".article-default", html).each(function () {
//     const title = $(this).find(".post-title").text();
//     const url = $(this).find("a").attr("href");
//     const img = $(this).find("a img").attr("src")  || noImage;

//     // go deeper into website to fetch data from the article page itself

//     const articleResponse = await fetch(url)

//     articles.push({
//       title,
//       url,
//       img,
//     });
//   });
//   res.status(200).json({ articles });
// };

// export default getArticles;

// new code

import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";
import fetch from "node-fetch";

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("http://www.destructoid.com");
  const html = await response.text();
  const $ = load(html);
  const noImage =
    "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg";

  const articles: {
    title: string;
    url: string | undefined;
    img: string | undefined;
    articleHtml: string | undefined;
    articleImg:string | undefined;
  }[] = [];

  const articleElements = $(".article-default");
  for (let i = 0; i < articleElements.length; i++) {
    const articleElement = articleElements[i];
    const title = $(articleElement).find(".post-title").text();
    const url = $(articleElement).find("a").attr("href");
    const img = $(articleElement).find("a img").attr("src") || noImage;

    if (url) {
      // Go deeper into the article page to fetch additional data
      const articleResponse = await fetch(url);
      const articleHtml = await articleResponse.text();
      const article$ = load(articleHtml);
      // const articleImg =  article$(".post-thumbnail img").attr("src") || noImage
      // const articleImg =  "https://www.destructoid.com/wp-content/uploads/2023/06/Everybody12Switch_Lead_060223.jpg"


      // Extract additional information from the article page
      const content = article$(".entry-content p").text();
      const articleImg = article$(".post-thumbnail img").attr("src") || noImage;

      articles.push({
        title,
        url,
        img,
        articleHtml: content,
       articleImg: articleImg,
      });
    }
  }

  res.status(200).json({ articles });
};

export default getArticles;

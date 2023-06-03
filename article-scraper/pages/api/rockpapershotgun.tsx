import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";

const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("http://www.rockpapershotgun.com");
  const html = await response.text();
  const $ = load(html);
  const noImage = "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"


  //   sitename: "rock paper shotgun",
  //       url: "http://www.rockpapershotgun.com",
  //       el1: ".summary_items",
  //       el2: ".strapline",

  const articles: {
    title: string;
    url: string | undefined;
    img: string | undefined;
    articleHtml: string | undefined;
    // articleImg:string | undefined;
  }[] = [];

  const articleElements = $(".summary");
  for (let i = 0; i < articleElements.length; i++) {
    const articleElement = articleElements[i];
    const title = $(articleElement).find(".strapline").text();
    const url = $(articleElement).find("a").attr("href");
    const img = $(articleElement).find("img.thumbnail_image").attr("src") || noImage;

    if (url) {
      // Go deeper into the article page to fetch additional data
      const articleResponse = await fetch(url);
      const articleHtml = await articleResponse.text();
      const article$ = load(articleHtml);


      // Extract additional information from the article page
      const content = article$("p").text();
      // const articleImg = article$(".post-thumbnail img").attr("src") || noImage;



  
  // $(".summary", html).each(function () {
  //   const title = $(this).find(".strapline").text();
  //   const url = $(this).find("a").attr("href");
  //   const img = $(this).find("img.thumbnail_image").attr("src")|| noImage
   
    articles.push({
      title,
      url,
      img,
      articleHtml: content,
    //  articleImg,
    });
  };
  }
  console.log(articles);
  res.status(200).json({ articles });
};

export default getArticles;

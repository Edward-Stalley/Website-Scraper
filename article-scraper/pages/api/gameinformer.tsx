// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Cheerio, load } from "cheerio";
import fetch from "node-fetch"



const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("https://www.gameinformer.com/");
  const html = await response.text();
  const $ = load(html);
  const noImage =
    "https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg";





  const articles: {
     title: string; 
     url: string | undefined; 
     img:string|undefined 
    //  articleHTML: string |undefined;
    //  articleImg: string| undefined;
    
  }[] = [];

  const articleElements = $(".article-body")
  for(let i= 0; i <articleElements.length; i++){
const articleElement = articleElements[i];
const title = $(articleElement).find('.article-title.page-title a').text();
const url = "https://www.gameinformer.com" + $(articleElement).find("a").attr("href");
const img =  "https://www.gameinformer.com" + $(articleElement).find(".article-image").attr("data-imgurl") || noImage

  
// if (url) {
//   // Go deeper into the article page to fetch additional data
//   const articleResponse = await fetch(url);
//   const articleHtml = await articleResponse.text();
//   const article$ = load(articleHtml);


//   // Extract additional information from the article page
//   const content = article$("div[property='schema:text']")
//   .find("p")
//   .map((_, element) => $(element).text())
//   .get()
//   .join("\n");  // const articleImg = article$(".post-thumbnail img").attr("src") || noImage;

articles.push({
  title,
  url,
  img,
  // articleHTML: content,
  // articleImg,
});
}
// };
res.status(200).json({ articles });
};

export default getArticles;


  // $(".article-body", html).each(function () {
  //   const title = $(this).find('.article-title.page-title a').text()
  //   const url =  "https://www.gameinformer.com" + $(this).find("a").attr("href");
  //   const style = $(this).find('.article-image').attr('style');
  //   const imgElement = $(this).find(".article-image");
  //   const img = "https://www.gameinformer.com" + imgElement.attr("data-imgurl");
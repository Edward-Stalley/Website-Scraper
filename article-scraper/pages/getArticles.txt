// import cheerio, { Cheerio, Element, load } from "cheerio";
// import axios, { AxiosRequestConfig } from "axios";
// import { useState } from "react";
// import { NextApiRequest, NextApiResponse } from "next";

// req: NextApiRequest, res: NextApiResponse
// const getArticles = async () => {
//   const websites = [
//     {
//       sitename: "destructoid",
//       url: "https://www.destructoid.com",
//       el1: ".article-default",
//       el2: ".post-title",
//     },
//     {
//       sitename: "rock paper shotgun",
//       url: "http://www.rockpapershotgun.com",
//       el1: ".summary_items",
//       el2: ".strapline",
//     },
//     {
//       sitename: "giantbomb",
//       url: "https://www.giantbomb.com/",
//       el1: ".js-carousel-strip__strip",
//       el2: ".text-bold",
//     },
//   ];

//   const [retrievedArticles, setRetrievedArticles] = useState<Object>([]);

//   const getData = function (sitename: string, url: string, el1: string, el2: string) {
//     axios(url)
//       .then((res) => {
//         const html = res.data;
//         const $ = load(html);
//         const articles: { sitename: string; title: string; url: string | undefined }[] = [];
//         $(el1, html).each(function () {
//           const title = $(this).find(el2).text();
//           const url = $(this).find("a").attr("href");
//           articles.push({
//             title,
//             url,
//             sitename,
//           });
//         });
//         setRetrievedArticles(articles);
//       })
//       .catch((err) => console.log(err));
//   };

//   //   res.status(200).json(retrievedArticles);
//   // RUN GET ARTICLES FOR ALL SITES
//   websites.forEach((site) => {
//     const { sitename, url, el1, el2 } = site;
//     getData(sitename, url, el1, el2);
//   });
// };

// export default getArticles;

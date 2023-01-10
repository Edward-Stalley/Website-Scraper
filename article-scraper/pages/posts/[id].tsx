// import { Cheerio, load } from "cheerio";
// const getStaticPaths = async () => {
//   const res = await fetch("http://www.destructoid.com");

//   const html = await res.text();
//   const $ = load(html);
//   const articles: { title: string; url: string | undefined }[] = [];
//   $(".article-default", html).each(function () {
//     const title = $(this).find(".post-title").text();
//     const url = $(this).find("a").attr("href");
//     articles.push({
//       title,
//       url,
//     });
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default function Post() {
  return <div>this is post</div>;
}

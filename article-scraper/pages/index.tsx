import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

import Article from "../components/ArticleComponent";
import { useState, useEffect, use } from "react";
import { slice } from "cheerio/lib/api/traversing";
import cheerio, { load } from "cheerio";
import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [retrievedArticles, setRetrievedArticles] = useState<Object>([]);
  const [finalArticles, setFinalArticles] = useState<Object>([]);
  const [fetched, setFetched] = useState(false);
  const [href, setHref] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  // const [urls, setUrls] = useState<Object>([]);

  const getUrl = async (url: string) => {
    const res = await fetch(`/api/${url}`);
    const { articles } = await res.json();
    setRetrievedArticles(articles);
    setFetched((fetched) => !fetched);
  };

  const urls: any[] = [];
  const url = Array.isArray(retrievedArticles) ? retrievedArticles.forEach((a: any) => urls.push(a.url)) : [];

  const handler = function (e: { target: any }) {
    const href = e.target.getAttribute("data-href");
    setHref(href);
  };

  const getArticleBody = async (url: string) => {
    const res = await fetch(`/api/puppeteer/rockpapershotgun`);
  };

  useEffect(() => {
    const toComponent =
      Array.isArray(retrievedArticles) &&
      retrievedArticles.map((a, i) => {
        if (i <= 10) {
          return (
            <div className="" key={a.title.slice(5) + i}>
            <Link href={a.url} className={styles.articleLink} style={{ backgroundImage: `url(${a.img})` }}>

                {/* need to get the image and make it the background */}
                <div className="image-container rounded overflow-hidden">
                  <div className="rounded-t-xl">

  <Image src={a.img} alt="Article Image" width={300} height={200} className=" rounded pb-0 px-5 " />
                  </div>
</div> 
                <div
                  className={`  ${a.url.includes("gameinformer") ? "hover:bg-rose-400 bg-rose-200 " : "b-blue-200"}
                  ${a.url.includes("destructoid") ? "hover:bg-emerald-400 bg-emerald-200 " : "b-blue-200"}
                  ${a.url.includes("rockpapershotgun") ? "hover:bg-amber-400 bg-amber-200" : "b-blue-200"}
                  ${a.url.includes("escapist") ? "hover:bg-sky-400 bg-sky-300 " : "b-blue-200"}
                 


                  auto-cols-min h-30  justify-center items-center rounded-b-xl ml-5 mr-5 mb-5  `}
                >
                  <Article title={a.title} url={a.url} sitename={a.sitename} details={a.details} id={i} img={a.img} />
                  {/* <Link */}
                  {/* // className="bg-orange-300 text-slate-800 text-xl p-3 rounded-b-xl flex justify-center
                  hover:bg-orange-400" // href={a.url} */}
                  {/* > */}
                  {/* Read */}
                  {/* </Link> */}
                  {/* Need to implement getting the body from article */}
                  {/* 
                <button
                  className="bg-orange-500  w-full flex justify-center p-4 rounded-b-xl"
                  data-key={i}
                  data-href={a.url}
                  onClick={() => {
                    getArticleBody(a.url);
                  }}
                >
                  Handler
                </button> */}
                  {/* <div className="flex justify-center    ">
                    {(a.url.includes("rockpapershotgun") && "Rock Paper Shotgun") ||
                      (a.url.includes("destructoid") && "Destructoid") ||
                      (a.url.includes("destructoid") && "Destructoid")}
                  </div> */}
                </div>
              </Link>
            </div>
          );
        }
        if (i > 10) return;
      });

    setFinalArticles(toComponent);
  }, [fetched, retrievedArticles]);

  return (
    <>
      <div className="bg-slate-800 justify-center items-center p-20 flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <h1 className="   sm:text-4xl md:text-6xl xl:text-6-xl text-4xl pb-10 text-slate-100">Gaming News</h1>
          <h5 className="   sm:text-lg md:text-1xl xl:text-4-xl text-sm pb-2 text-slate-100">
            Click A Button for Recent News
          </h5>
        </div>
        <div className=" flex-col flex gap-6 justify-center items-center p-2">
          <div className="  justify-center items-center grid grid-cols-2 sm:grid-cols-3  grid-rows-2 gap-4">
            <button
              onClick={() => {
                getUrl("rockpapershotgun");
              }}
              className="bg-amber-400 p-5 sm:col-span-2 rounded-xl  sm:p-5  hover:bg-slate-600"
            >
              R.P.S
            </button>
            {/* <button
              onClick={() => {
                getUrl("ign");
              }}
              className="rounded-xl p-5   bg-rose-400    hover:bg-slate-600"
            >
              IGN
            </button> */}
            <button
              onClick={() => {
                getUrl("gameinformer");
              }}
              className="rounded-xl p-5   bg-rose-400    hover:bg-slate-600"
            >
             G.Informer
            </button>
            <button
              onClick={() => {
                getUrl("destructoid");
              }}
              className="rounded-xl p-5  bg-emerald-300 hover:bg-emerald-400"
            >
              DToid
            </button>
            <button
              onClick={() => {
                getUrl("escapist");
              }}
              className="rounded-xl p-5 sm:col-span-2  bg-sky-300  hover:bg-sky-400"
            >
           Escapist
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10">
          <> {finalArticles}</>
        </div>
      </div>
    </>
  );
}

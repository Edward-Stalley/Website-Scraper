import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Article from "../components/ArticleComponent";
import { useState, useEffect, use } from "react";
import { slice } from "cheerio/lib/api/traversing";
import cheerio, { load } from "cheerio";
import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [retrievedArticles, setRetrievedArticles] = useState<Object>([]);
  const [finalArticles, setFinalArticles] = useState<Object>([]);
  const [fetched, setFetched] = useState(false);
  const [href, setHref] = useState("");
  // const [urls, setUrls] = useState<Object>([]);

  const getUrl = async (url: string) => {
    const res = await fetch(`http://localhost:3000/api/${url}`);
    const { articles } = await res.json();
    setRetrievedArticles(articles);
    setFetched((fetched) => !fetched);
  };

  // New Logic

  const urls: any[] = [];
  const url = Array.isArray(retrievedArticles) ? retrievedArticles.forEach((a: any) => urls.push(a.url)) : [];
  // console.log("array", urls);

  // click on button
  // get an id for that button from 1 -10
  // go through array
  // if id matches then fetch that url
  // else return

  const handler = function (e: { target: any }) {
    const href = e.target.getAttribute("data-href");
    console.log(href);
    setHref(href);
  };

  //
  // const getPost = async (href: string) => {
  //   const res = await fetch(`http://www.destructoid.com`);
  //   console.log(href);
  // };

  useEffect(() => {
    const toComponent =
      Array.isArray(retrievedArticles) &&
      retrievedArticles.map((a, i) => {
        if (i <= 10) {
          return (
            <div key={a.title.slice(5) + i}>
              <div>{a.site}</div>
              <Article title={a.title} url={a.url} sitename={a.sitename} details={a.details} id={i} />
              {/* <button className="bg-orange-500 rounded p-4" data-key={i} data-href={a.url} onClick={getPost}>
                Get Post
              </button> */}
              <button className="bg-orange-500 rounded p-4" data-key={i} data-href={a.url} onClick={handler}>
                Handler
              </button>
            </div>
          );
        }
        if (i > 10) return;
      });

    setFinalArticles(toComponent);
  }, [fetched, retrievedArticles]);

  console.log(retrievedArticles, fetched);

  return (
    <>
      <div className="bg-slate-900  p-20">
        <h1 className="text-6xl pb-4 ">Gaming News</h1>
        <div className="  flex-col flex gap-6 justify-center items-center">
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <button
              onClick={() => {
                getUrl("giantbomb");
              }}
              className="rounded-xl p-5 col-span-2 bg-red-400 hover:bg-slate-600"
            >
              GiantBomb
            </button>
            <button
              onClick={() => {
                getUrl("rockpapershotgun");
              }}
              className="bg-blue-400 rounded-xl  p-5  hover:bg-slate-600"
            >
              Rock Paper Shotgun
            </button>
            <button
              onClick={() => {
                getUrl("destructoid");
              }}
              className="rounded-xl p-5  bg-slate-800 hover:bg-slate-600"
            >
              IGN(not)
            </button>
            <button
              onClick={() => {
                getUrl("destructoid");
              }}
              className="rounded-xl p-5 col-span-2  bg-green-400 hover:bg-slate-600"
            >
              Destructoid
            </button>
            <button
              onClick={() => {
                getUrl("escapist");
              }}
              className="rounded-xl p-5 col-span-2 bg-yellow-400  hover:bg-slate-600"
            >
              The Escapist
            </button>
          </div>

          <div className="bg-orange-200 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 auto-cols-min  h-fit min-w-full justify-center items-center  rounded-xl m-5">
            <> {finalArticles}</>
          </div>
        </div>
      </div>
    </>
  );
}

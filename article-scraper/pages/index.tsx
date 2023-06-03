import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Carousel from "../components/Carousel";
import React from "react"
import Article from "../components/Article";
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
  const [isDestructoid, setIsDestructoid] = useState(false)
  const [isEscapist, setIsEscapist] = useState(false)
  const [isRPS, setIsRPS] = useState(false)
  const [isGameInformer, setIsGameInformer] = useState(false)

  // const[showArticle, setShowArticle] = useState(false)
  // const [urls, setUrls] = useState<Object>([]);

  const getUrl = async (url: string) => {
    setLoading(true)
    console.log(loading)
    const res = await fetch(`/api/${url}`);
    const { articles } = await res.json();
    setRetrievedArticles(articles);
    setFetched((fetched) => !fetched);
    setLoading((prevState) => !prevState)
    console.log(loading)

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

  
const checkStyle = function(url: string | string[], site:string ){
  url.includes(site) 
  return `styles.${site}`

}

  useEffect(() => {
    const toComponent =
      Array.isArray(retrievedArticles) &&
      retrievedArticles.map((a, i) => {
        if (i <= 10) {
          return (
            <div className="" key={a.title.slice(5) + i}>
{/* tetsing new feature for retireving article text 
Want to add

1.  book icon for reading 
2. + icon for bookmarking [done] !! not functional though
3. functionality on click - show/hide [done]
4. functionality for save
5. color coded - loading button [done]

*/}

{/* <button onClick={()=>setShowArticle(!showArticle)} className="bg-emerald-200 p-3 m-1">Read Article</button> */}
{/* <button className="bg-green-100 p-3 m-1">Add Article</button> */}
<Article articleImg={a.articleImg} showArticle={a.showArticle} title={a.title} url={a.url} sitename={a.sitename} details={a.details} id={i} img={a.img} articleHtml={a.articleHtml} articleResponse={a.articleResponse} />

            <Link href={a.url} className=" " >


              {/* <div>{a.articleHtml}</div> */}

            {/* style={{ backgroundImage: `url(${a.img})` }} */}

                {/* need to get the image and make it the background */}
                <div className="image-container rounded overflow-hidden">
                  <div className="rounded-t-xl">
{/* 
  <Image src={a.img} alt="Article Image" width={300} height={200} style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "0.75rem 0.75rem 0 0",
    }} className=" rounded pb-0 px-5 " /> */}
                  </div>
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
                setIsRPS(true)       
                setIsGameInformer(false)
                setIsDestructoid(false)
                setIsEscapist(false)       }}
              className="bg-amber-400 p-5 sm:col-span-2 rounded-xl  sm:p-5  hover:bg-slate-600"
            >
              R.P.S
            </button>
       
            <button
              onClick={() => {
                getUrl("gameinformer");
                setIsGameInformer(true)
                setIsDestructoid(false)
                setIsEscapist(false)
                setIsRPS(false)
              
              }}
              className="rounded-xl p-5   bg-rose-400    hover:bg-slate-600"
            >
             G.Informer
            </button>
            <button
              onClick={() => {
                getUrl("destructoid");
                setIsDestructoid(true)
                setIsEscapist(false)
                setIsGameInformer(false)
                setIsRPS(false)
              }}
              className="rounded-xl p-5  bg-emerald-300 hover:bg-emerald-400"
            >
              DToid
            </button>
            <button
              onClick={() => {
                getUrl("escapist");
                setIsEscapist(true)
                setIsDestructoid(false)
                setIsGameInformer(false)
                setIsRPS(false)
                

              }}
              className="rounded-xl p-5 sm:col-span-2  bg-sky-300  hover:bg-sky-400"
            >
           Escapist
            </button>
          </div>
        </div>
        {/* need to fix this logic */}
  {!loading? 

       <div className="flex sm:w-full w-64 max-w-3xl justify-center items-center py-1 mt-20">
  <div className="w-full h-full max-w-3xl">
    <Carousel items={finalArticles} />
  </div>
</div> :

<div role="status">
    <svg aria-hidden="true"  className={ `
    ${isDestructoid && styles.destructoid }
    ${isEscapist && styles.escapist }
    ${isGameInformer && styles.gameInformer }
    ${isRPS && styles.rps }


    w-8 h-8 mr-2 mt-20 text-gray-200 animate-spin dark:text-gray-600 `} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>



  }

        </div>
        
    </>
  );
}



// old code


                       {/* <button
              onClick={() => {
                getUrl("ign");
              }}
              className="rounded-xl p-5   bg-rose-400    hover:bg-slate-600"
            >
              IGN
            </button> */}
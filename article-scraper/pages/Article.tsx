import Link from "next/link";
import { ReactMouseEvent } from "react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  useState,
  MouseEventHandler,
  MouseEvent,
} from "react";
import { UrlObject } from "url";
import cheerio, { load } from "cheerio";
import Image from "next/image";
import { gunzipSync } from "zlib";

// Define Article Type

// type ArticleProps = {
//   url: string;
//   title: string;
//   sitename: string;
//   details: string;
//   id: number;
//   img: string;
//   articleHtml: string;
//   articleResponse: string;
//   showArticle: boolean;
//   articleImg: string;
//   handleBookmark: MouseEventHandler<HTMLButtonElement> | undefined;
//   isBookmarked: boolean;
// };
export default function Article(props: {
  url: string;
  title: string;
  articleHtml: string;
  // sitename: string;
  // details: string;
  // id: string;
  img: string;
  articleImg: string;
  articleResponse: string;
  // showArticle: boolean;
  // isBookmarked: boolean;
  // handleBookmark: (article: Article) => void;
  handleBookmark: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showArticle, setShowArticle] = useState(false);
  // const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setIsBookmarked(!isBookmarked);
    // console.log(isBookmarked);
    console.log(isBookmarked);

    // console.log("URL:", props.url);
    // console.log("handleBookmark:", props.handleBookmark);

    if (props.handleBookmark) {
      props.handleBookmark(event);
    }
  };

  const destructoid = props.url.includes("destructoid") ? "hover:bg-emerald-400 bg-emerald-400 " : "b-blue-200";

  const handleShowArticle = async function (url: any) {
    // Add a feature so that when I click read it fetches a specific article

    setShowArticle((prevState) => !prevState);
    // const response = await fetch(`http://localhost:3000/api/article/${url}`);
    // console.log(showArticle);
  };

  return (
    <div className="  ">
      <div
        className={`      
auto-cols-min h-30  justify-center  items-center rounded-xl ml-5 mr-5 mb-5 
   ${props.url.includes("gameinformer") ? "hover:bg-rose-400 bg-rose-200 " : "b-blue-200"}
   ${destructoid}
   ${props.url.includes("rockpapershotgun") ? "hover:bg-amber-400 bg-amber-200" : "b-blue-200"}
   ${props.url.includes("escapist") ? "hover:bg-sky-400 bg-sky-300 " : "b-blue-200"}
      `}
      >
        <Image
          src={props.url.includes("destructoid") ? props.articleImg : props.img}
          alt="Article Image"
          width={200}
          height={200}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: ".5rem 0.5rem 0 0",
          }}
          className=" rounded-xl  "
        />
        <div className="flex-row ">
          <div className="flex justify-between">
            <div className="flex p-2 justify-start  ">
              {/* Bookmark Button */}
              <div>
                <button
                  onClick={handleBookmarkClick}
                  className="flex  items-center justify-center h-8 w-8 hover:text-slate-300 font-semibold text-slate-800 "
                >
                  {isBookmarked ? <p>&#9733;</p> : <p>&#9734;</p>}
                </button>
              </div>
            </div>
            <div className="flex  p-2 justify-end   ">
              {/* Go to Article Webpage */}
              <Link
                className=" flex justify-center  items-center rounded-full h-8 w-8 hover:text-slate-300 font-semibold text-slate-800"
                href={props.url}
              >
                &#8680;
              </Link>
            </div>
          </div>

          <h1 className="flex justify-center p-5 font-bold text-slate-800  ">{props.title}</h1>
        </div>

        <button
          onClick={handleShowArticle}
          className={`
  ${props.url.includes("destructoid") ? "hover:bg-emerald-200 bg-emerald-100 " : "b-blue-200"}
     p-2 w-full
    ${showArticle ? "" : "rounded-b-xl"}
    
    
    `}
        >
          {showArticle ? "Hide" : "Read"}
        </button>
        {showArticle && <div className="text-slate-900 text-xl p-5">{props.articleHtml}</div>}
      </div>
    </div>
  );
}

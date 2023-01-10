import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { UrlObject } from "url";
import cheerio, { load } from "cheerio";

export default function ArticleComponent(props: {
  url: string;
  title: string;
  sitename: string;
  details: string;
  id: number;
}) {
  const handleClick = async function (url: any) {
    const response = await fetch(`http://localhost:3000/api/article/${url}`);
    console.log(url);
  };

  return (
    <div className="flex justify-center items-center p-4 ">
      <div className="cursor-pointer text-slate-50 hover:text-slate-800 pointer-cursor hover:bg-orange-100 bg-slate-900 p-5 text-2sm flex-col flex justify-center items-center w-56 h-56 rounded-xl">
        <h2 className="text-grey-100 ">{props.title}</h2>
        {/* <h4>{props.id}</h4> */}
        <button onClick={() => handleClick(props.url)} className="bg-orange-400 p-2 rounded-xl">
          Read
        </button>
      </div>
    </div>
  );
}

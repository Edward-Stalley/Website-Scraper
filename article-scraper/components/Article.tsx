import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { UrlObject } from "url";
import cheerio, { load } from "cheerio";

export default function Article(props: {
  url: string;
  title: string;
  sitename: string;
  details: string;
  id: number;
  img: string;
}) {
  const handleClick = async function (url: any) {
    // const response = await fetch(`http://localhost:3000/api/article/${url}`);
    console.log(url);
  };

  return (
    <div className="flex justify-center items-center p-5 ">
      
      <div className="cursor-pointer text-slate-50 pointer-cursor  bg-slate-900 p-5 g-2 text-2sm flex-col flex justify-center items-center  w-full h-64 rounded-xl">
        <h2 className="text-grey-100 ">{props.title}</h2>

      </div>
    </div>
  );
}

{/* <h4>{props.id}</h4> */}
{/* <button onClick={() => handleClick(props.url)} className="bg-orange-400 p-2 rounded-xl">
    Read
  </button> */}
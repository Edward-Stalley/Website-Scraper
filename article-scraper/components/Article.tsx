import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useState } from "react";
import { UrlObject } from "url";
import cheerio, { load } from "cheerio";
import Image from "next/image";

export default function Article(props: {
  url: string;
  title: string;
  sitename: string;
  details: string;
  id: number;
  img: string;
  articleHtml:string
  articleResponse: string
  showArticle:boolean
}) {

  const [showArticle, setShowArticle] = useState(false)
  const destructoid = props.url.includes("destructoid") ? "hover:bg-emerald-400 bg-emerald-400 " : "b-blue-200"
  const handleClick = async function (url: any) {
    setShowArticle((prevState) => !prevState)
    // const response = await fetch(`http://localhost:3000/api/article/${url}`);
    console.log(showArticle);
  };

  return (

    


<div className="  ">


    <div 
    className={`      
auto-cols-min h-30  justify-center items-center rounded-xl ml-5 mr-5 mb-5 
   ${props.url.includes("gameinformer") ? "hover:bg-rose-400 bg-rose-200 " : "b-blue-200"}
   ${destructoid}
   ${props.url.includes("rockpapershotgun") ? "hover:bg-amber-400 bg-amber-200" : "b-blue-200"}
   ${props.url.includes("escapist") ? "hover:bg-sky-400 bg-sky-300 " : "b-blue-200"}
      `}>
  
  <Image src={props.img} alt="Article Image" width={100} height={100} style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "0.75rem 0.75rem 0 0",
    }} className=" rounded-xl  " />    
<div className="flex-row">
  <div className="flex justify-between" >
  <div className="flex p-2 justify-start  ">
<button className="flex  items-center justify-center h-8 w-8 hover:text-slate-300 font-semibold text-slate-800 ">&#43;</button>
</div>
  <div className="flex  p-2 justify-end   ">
  <Link className=" flex justify-center  items-center rounded-full h-8 w-8 hover:text-slate-300 font-semibold text-slate-800" href={props.url}>&#8680;</Link>
  </div>
  </div>


  <h1 className="p-5 font-bold text-slate-800 ">{props.title}</h1>
</div>
     
    
    <button onClick={handleClick} className={`
  ${props.url.includes("destructoid") ? "hover:bg-emerald-200 bg-emerald-100 " : "b-blue-200"}
     p-2 w-full
    ${showArticle? "": "rounded-b-xl"}
    
    
    `  
  
  }>{showArticle ? "Hide":"Read"}</button>
    {showArticle && <div className="text-slate-900 text-xl p-5">{props.articleHtml}</div>}

    </div>
    </div>
  )
}

// old styling

{/* <div className="flex justify-center items-center p-5 ">
      
<div className="cursor-pointer text-slate-50 pointer-cursor  bg-slate-900 p-5 g-2 text-2sm flex-col flex justify-center items-center  w-full h-64 rounded-xl">
  <h2 className="text-grey-100 ">{props.title}</h2>
  <button onClick={handleClick} className="bg-orange-400 p-2 rounded-xl">
Read
</button>

</div>
        {showArticle && <div>{props.articleHtml}</div> }
</div> */}


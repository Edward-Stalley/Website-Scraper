// Not currently Uuing but maybe it is best to make the bookmarked section its own component

import Carousel from "../components/Carousel";
import React, { ReactElement } from "react";
import Article from "../components/Article";
import { useState, useEffect } from "react";

export default function BookmarkedArticles(props: any) {
  <div>
    <div className="flex sm:w-full w-64 max-w-3xl justify-center items-center py-1 mt-20">
      <div className="w-full h-full max-w-3xl">
        <Carousel items={undefined} />
      </div>
    </div>
  </div>;
}

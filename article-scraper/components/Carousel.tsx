import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  items: React.ReactNode[]|any;
  maxItems?: number; // Add a new optional prop to set the maximum number of items
}

const Carousel: React.FC<CarouselProps> = ({ items, maxItems = 10 }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
        
        
      },
    ],
  };

  const limitedItems = items.slice(0, maxItems); // Slice the items array to the specified maximum number

  return (
    <Slider {...settings}>
      {limitedItems.map((item: React.ReactElement<any, string | React.JSXElementConstructor<any>> , index: React.Key | null | undefined) => (
        <div key={index}>{item}</div>
      ))}
    </Slider>
  );
};

export default Carousel;

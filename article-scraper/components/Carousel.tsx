import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  items: React.ReactNode[] | any;
  maxItems?: number;
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

  const limitedItems = items.slice(0, maxItems);

  return (
    <Slider {...settings} className="">
      {limitedItems.length > 0 &&
        limitedItems.map((item: React.ReactNode, index: number) => (
          <div key={index}>{item}</div>
        ))}
    </Slider>
  );
};

export default Carousel;

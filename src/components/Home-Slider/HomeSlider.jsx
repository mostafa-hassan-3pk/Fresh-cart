import React from "react";
import Slider from "react-slick";
import img1 from "./../../assets/slider-image-1.png";
import img2 from "./../../assets/slider-image-2.png";
import img3 from "./../../assets/slider-image-3.png";

const HomeSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="mt-24 container m-auto">
      <Slider {...settings}>
        <article className="relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl">
          <figure className="relative">
            <img
              src={img1}
              alt="Slide 1"
              className="h-full w-full object-cover"
            />
          </figure>
        </article>
        <article className="relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl">
          <figure className="relative">
            <img
              src={img2}
              alt="Slide 2"
              className="h-full w-full object-cover"
            />
          </figure>
        </article>
        <article className="relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl">
          <figure className="relative">
            <img
              src={img3}
              alt="Slide 3"
              className="h-full w-full object-cover"
            />
          </figure>
        </article>
      </Slider>
    </div>
  );
};

export default HomeSlider;

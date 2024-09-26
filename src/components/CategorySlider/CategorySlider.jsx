import React from "react";
import Slider from "react-slick";
import { useQuery } from "react-query";
import axios from "axios";

const fetchCategories = async () => {
  return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
};

const CategorySlider = () => {
  const { data: categories } = useQuery("CategoryImgeSlider", fetchCategories);

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <div className=" w-[80%] m-auto mt-4">
      <Slider {...settings}>
        {" "}
        {categories?.data.data.map((category, idx) => (
          <div key={idx}>
            <img
              src={category.image}
              alt={category.name}
              className=" h-56 w-full"
            />
            <h3>{category.name}</h3>
          </div>
        ))}{" "}
      </Slider>{" "}
    </div>
  );
};

export default CategorySlider;

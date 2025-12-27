"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const items = [
  "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
  "https://images.pexels.com/photos/3806753/pexels-photo-3806753.jpeg",
  "https://images.pexels.com/photos/5872364/pexels-photo-5872364.jpeg",
];
export default function CustomCarousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="custom-carousel">
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Image
              src={item}
              alt="image"
              width={1000}
              height={1000}
              style={{ width: "100%", height: "70vh", objectFit: "cover" }}
            ></Image>
          </React.Fragment>
        );
      })}
    </Slider>
  );
}

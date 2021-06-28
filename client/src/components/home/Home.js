import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { WOW } from "wowjs";

const initialState = {
  product: [],
  err: "",
};

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="fas fa-chevron-circle-right right-arrow wow fadeInUp"
      data-wow-delay="2s"
      data-wow-duration="2s"
      onClick={onClick}
    />
  );
}

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="fas fa-chevron-circle-left left-arrow wow fadeInUp"
      data-wow-delay="2s"
      data-wow-duration="2s"
      onClick={onClick}
    />
  );
};

const Home = () => {
  const [products, setProducts] = useState(initialState);
  const [backgrounds, setBackgrounds] = useState({ background: [], err: "" });
  const [backgroundBody, setBackgroundBody] = useState("");

  useEffect(() => {
    const fetchDispatch = async () => {
      try {
        const res = await axios.get("/background");
        setBackgrounds({
          ...backgrounds,
          background: res.data.background,
          err: "",
        });

        setBackgroundBody(res.data.background[0].image);
      } catch (err) {
        err.response.data.msg &&
          setBackgrounds({ ...backgrounds, err: err.response.data.msg });
      }
      try {
        const res = await axios.get("/product");
        setProducts({ ...products, product: res.data.products, err: "" });
      } catch (err) {
        err.response.data.msg &&
          setProducts({ ...products, err: err.response.data.msg });
      }
    };
    fetchDispatch();
  }, []);

  useEffect(() => {
    new WOW({ live: false }).init();
  });

  const DivBackground = styled.div`
    background-image: url(${backgroundBody});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 100%;
    max-width: 100%;
  `;

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow className="" />,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 6000,
    cssEase: "linear",
  };

  return (
    <section className="background-header">
      <div className="box-background">
        <Slider {...settings}>
          {backgrounds.background.map((item, index) => {
            return (
              <div className="__box-background" key={index}>
                <img src={item.image} alt="travel image" />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="box-product">
        <h2 className="title wow fadeInDown">Giới thiệu về chúng tôi</h2>
        <div className="__box-product">
          {products.product.map((item, index) => {
            return (
              <div
                className="product-item wow fadeInLeft"
                data-wow-duration={index + 1 + "s"}
                key={index}
              >
                <img src={item.image} alt="" />
                <div className="content-box">
                  <h5>{item.title}</h5>
                  <p>{item.params}</p>
                </div>
                <div className="btn-box">
                  <div className="__btn-box">
                    <Link to="/introduce">
                      See more
                      <i className="fas fa-external-link-alt"></i>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="box-construction">
        <DivBackground>
          <h2 className="title wow fadeInDown">Công trình tiêu biểu</h2>
          <div className="__box-product">
            {products.product.map((item, index) => {
              return (
                <div
                  className="product-item wow fadeInRight"
                  data-wow-duration={index + 1 + "s"}
                  key={index}
                >
                  <div className="content-hover">
                    <Link to="/construction">
                      <i className="fas fa-eye"></i>
                      <span>See more</span>
                    </Link>
                  </div>
                  <img src={item.image} alt="" />
                  <h3 className="mt-3 text-center">Demo</h3>
                </div>
              );
            })}
          </div>
          <div className="__link-construction wow fadeInUp">
            <Link to="/construction">
              See all
              <i className="fas fa-arrow-circle-right"></i>
            </Link>
          </div>
        </DivBackground>
      </div>
      <div className="box-product">
        <h2 className="title wow fadeInDown">Dự án sắp khởi công</h2>
        <div className="__box-product">
          {products.product.map((item, index) => {
            return (
              <div
                className="product-item wow fadeInUp"
                data-wow-duration={index + 1 + "s"}
                key={index}
              >
                <img src={item.image} alt="" />
                <div className="content-box">
                  <h5>{item.title}</h5>
                  <p>{item.params}</p>
                </div>
                <div className="btn-box">
                  <div className="__btn-box">
                    <Link to="/construction">
                      See more
                      <i className="fas fa-external-link-alt"></i>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="__link-construction wow fadeInUp">
          <Link to="/construction">
            See all
            <i className="fas fa-arrow-circle-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

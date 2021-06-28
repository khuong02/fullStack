import React, { useEffect } from "react";
import WOW from "wowjs";

const Footer = () => {
  useEffect(() => {
    new WOW.WOW().init();
  });
  return (
    <footer>
      <div className="container-footer">
        <div className="content-footer">
          <h2>Contact us</h2>
          <div className="__content-footer">
            <p>
              <i className="fas fa-home"></i>
              <span>Đ/c :</span> 221 Lê Lâm, P.Phú Thạnh, Quận Tân Phú
            </p>
            <p>
              <a href="tel:0336998524">
                <i className="fas fa-phone-alt"></i>
                <span>Hotline :</span> 0336 99 85 24
              </a>
            </p>
            <p>
              <a href="tel:0336998524">
                <i className="fas fa-user"></i>
                <span>Skill :</span> 0933 889 169
              </a>
              /
              <a href="tel:0334918788">
                <span>Customer service :</span> 033 491 8788
              </a>
            </p>
            <p>
              <a href="mailto:hoanthienbaohung@gmail.com">
                <i className="fas fa-envelope"></i>
                <span>Email :</span> hoanthienbaohung@gmail.com
              </a>
            </p>
          </div>
          <div className="box-icon">
            <i className="fab fa-facebook-messenger"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram-square"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
        <div className="content-footer">
          <h2>FACTORY</h2>
          <div className="__content-footer">
            <p>
              <i className="fa fa-location-arrow"></i>
              <span>Xưởng SX 1 :</span>17/18 Liên Khu 5-6, Bình Hưng Hoà, Bình
              Tân, Tp.HCM
            </p>
            <p>
              <i className="fa fa-location-arrow"></i>
              <span>Xưởng SX 2 :</span>1556 Phú Tân, X.Phú Cường, H.Đinh Quán,
              T.Đồng Nai
            </p>
          </div>
        </div>
      </div>
      <div className="end-footer">
        <p>Copyright ©2021 BHhome. Thiết kế bởi DVK</p>
      </div>
    </footer>
  );
};

export default Footer;

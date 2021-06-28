import React, { useEffect, useState } from "react";
import WOW from "wowjs";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { useLocation } from "react-router";

import CommerceItem from "./components/commerce/CommerceItem";
import Commerce from "./components/commerce/Commerce";
import Introduce from "./components/introduce/Introduce";
import Construction from "./components/construction/Construction";
import Contact from "./components/contact/Contact";
import News from "./components/news/News";

const link = [
  { name: "Phào chỉ", contact: "/commerce/phao-chi" },
  { name: "Chỉ lưng", contact: "/commerce/chi-lung" },
  { name: "Chỉ góc", contact: "/commerce/chi-goc" },
  { name: "Chỉ trần", contact: "/commerce/chi-tran" },
  { name: "Chỉ trang trí", contact: "/commerce/chi-trang-tri" },
  { name: "Chỉ chân", contact: "/commerce/chi-chan" },
  { name: "Chỉ khung tranh", contact: "/commerce/chi-khung-tranh" },
  { name: "Chỉ viền", contact: "/commerce/chi-vien" },
  { name: "Tấm ốp tường", contact: "/commerce/tam-op-tuong" },
  { name: "Thanh lam", contact: "/commerce/thanh-lam" },
  { name: "Lamri", contact: "/commerce/lamri" },
  { name: "Tấm ốp 3D", contact: "/commerce/tam-op-3d" },
  { name: "Ván lót sàn", contact: "/commerce/van-lot-san" },
  { name: "Cửa nhựa", contact: "/commerce/cua-nhua" },
];

const construction = [
  {
    name: "Đồ gỗ nội thất tự nhiên và công nghiệp",
    contact: "/construction/do-go-noi-that-tu-nhien-va-cong-nghiep",
  },
  {
    name: "Cửa và nội thất nhôm, kính, inox, sắt",
    contact: "/construction/cua-va-noi-that-nhom-kinh-inox-sat",
  },
  {
    name: "Hoàn thiện nước sơn nước, ốp trần, sàn gỗ",
    contact: "/construction/nuoc-son-op-tran-sango",
  },
  { name: "Điện / nước dân dụng", contact: "/construction/dien-nuoc-dan-dung" },
  { name: "Decor cảnh quan", contact: "/construction/decor" },
];

const news = [
  { name: "Tin tức ngành", contact: "/news/tin-tuc-nganh" },
  { name: "Tin tổng hợp", contact: "/news/tin-tong-hop" },
];

const BoxContent = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const [show,setShow] = useState(false);
 const [size,setSize] = useState(window.innerWidth);

useEffect(()=>{
    window.addEventListener("resize",()=>{
        setSize(window.innerWidth)
    })
},[])

  useEffect(() => {
    new WOW.WOW().init();
    if (pathname.split("/").length === 2) {
      switch (pathname) {
        case "/introduce":
          return setTitle("Giới thiệu công ty");
        case "/commerce":
          return setTitle("Thương mại & Dịch vụ");
        case "/construction":
          return setTitle("Thi công");
        case "/news":
          return setTitle("Tin tức");
        case "/contact":
          return setTitle("Liên hệ");

        default:
          return setTitle(title);
      }
    } else {
      link.filter((item) => {
        if (item.contact === pathname) return setTitle(item.name);
      });
      construction.filter((item) => {
        if (item.contact === pathname) return setTitle(item.name);
      });
      news.filter((item) => {
        if (item.contact === pathname) return setTitle(item.name);
      });
    }
  }, [pathname]);

  return (
    <section>
      <div className="container-introduce">
        <h2 className="wow fadeInDown" data-wow-duration="1.5s">
          {title}
        </h2>
        <div className="box-introduce">
          <div className="box-content">
            {size>880&&<div className="box-content-left">
              <div className="box-item" data-wow-duration="1.5s">
                <nav>
                  <h4>Thương mại & Dịch vụ</h4>
                  <ul>
                    <li>
                      <Link to="/commerce">Cung cấp tấm ốp trần các loại</Link>
                    </li>
                    {link.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.contact}>
                            <i className="fas fa-caret-right"></i>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link to="/">Đại lý các vật liệu nội thất</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="box-item wow fadeInLeft" data-wow-duration="1.5s">
                <nav>
                  <h4>Thi công nội thất</h4>
                  <ul>
                    <li>
                      <Link to="/construction">Thi công</Link>
                    </li>
                    {construction.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.contact}>
                            <i className="fas fa-caret-right"></i>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link to="/construction">Liên hệ đội thi công</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="box-item wow fadeInLeft" data-wow-duration="1.5s">
                <nav>
                  <h4>Tin tức</h4>
                  <ul>
                    <li>
                      <Link to="/news">Các tin tức</Link>
                    </li>
                    {news.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.contact}>
                            <i className="fas fa-caret-right"></i>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link to="/">Tin tức </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>}
            <div className="box-content-right">
              {size<=880 && !show && <i className="fas fa-bars toggle-menu-box-content" onClick={()=>setShow(true)}></i>}

             {size<=880&&show&&<div className="box-content-left-toggle">
               {size<=880 && show &&<i class="fas fa-times toggle-menu-box-content exit" onClick={()=>setShow(false)}></i>}
              <div className="box-item" data-wow-duration="1.5s">
                <nav>
                  <h4>Thương mại & Dịch vụ</h4>
                  <ul>
                    <li>
                      <Link to="/commerce">Cung cấp tấm ốp trần các loại</Link>
                    </li>
                    {link.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.contact}  onClick={()=>setShow(false)}>
                            <i className="fas fa-caret-right"></i>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link to="/" onClick={()=>setShow(false)}>Đại lý các vật liệu nội thất</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="box-item wow fadeInLeft" data-wow-duration="1.5s">
                <nav>
                  <h4>Thi công nội thất</h4>
                  <ul>
                    <li>
                      <Link to="/construction" onClick={()=>setShow(false)}>Thi công</Link>
                    </li>
                    {construction.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.contact} onClick={()=>setShow(false)}>
                            <i className="fas fa-caret-right"></i>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link to="/construction" onClick={()=>setShow(false)}>Liên hệ đội thi công</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="box-item wow fadeInLeft" data-wow-duration="1.5s">
                <nav>
                  <h4>Tin tức</h4>
                  <ul>
                    <li>
                      <Link to="/news" onClick={()=>setShow(false)}>Các tin tức</Link>
                    </li>
                    {news.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.contact} onClick={()=>setShow(false)}>
                            <i className="fas fa-caret-right"></i>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <Link to="/" onClick={()=>setShow(false)}>Tin tức </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>}
              <Switch>
                <Route path="/introduce" component={Introduce} exact />
                <Route path="/construction" component={Construction} exact />
                <Route path="/news" component={News} exact />
                <Route path="/contact" component={Contact} exact />
                <Route path="/commerce/:name" component={CommerceItem} exact />
                <Route path="/commerce/" component={Commerce} exact />
                <Route path="*" exact={true}>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoxContent;

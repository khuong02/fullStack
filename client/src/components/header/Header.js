import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const link = [
  { name: "Trang chủ", contact: "/" },
  { name: "Về chúng tôi", contact: "/introduce" },
  { name: "Thương mại & Dịch vụ", contact: "/commerce" },
  { name: "Thi công", contact: "/construction" },
  { name: "Tin tức", contact: "/news" },
  { name: "Liên hệ", contact: "/contact" },
];

const Header = () => {
  const [user, setUser] = useState({});
  const [show,setShow] = useState(false);
  const [size,setSize] = useState(window.innerWidth);

useEffect(()=>{
    window.addEventListener("resize",()=>{
        setSize(window.innerWidth)
    })
},[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await axios.get("/posts", {
          headers: { "auth-token": localStorage.account },
        });

        if (!access_token) return setUser("");

        setUser(access_token.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (localStorage.account) {
      fetchData();
    }
  }, [localStorage.account]);

  const logoutData = (e) => {
    e.preventDefault();
    if (localStorage.account) {
      localStorage.removeItem("account");
      window.location.href = "/";
      //   try {
      //     await axios.get("user/logout", {
      //       headers: { "auth-token": localStorage.account },
      //     });
      //     localStorage.removeItem("account");
      //     window.location.href = "/";
      //   } catch (err) {
      //     console.log(err);
      //     // window.location.href = "/";
      //   }
    } else {
      window.location.href = "/";
    }
  };

  return (
    <section>
      <div className="box-header">
      {size<=1024 && <div className="menu-toggle">
         <Link to="/">
                <img src="http://bhhome.vn/images/website/logo.png" className="logo" alt="" />
              </Link>
          {size<=1024 && !show && <i className="fas fa-bars toggle-menu" onClick={()=>setShow(true)}></i>}
      </div>}
      

        <div className="box-container">
          <div className="container">
            <div className="hotline-btn">
              <a href="tel:0982964878">
                <span>
                  <i className="fas fa-phone-alt"></i>
                </span>
                hotline: 0982 96 48 78
              </a>
            </div>
            <span className="message">
              When you step into your home, can hear sound of nature breathing
            </span>
          </div>
        </div>

        {show&&<div className="box-nava" onClick={()=>setShow(false)}>
          <div className="nav-bar-container">
            <nav>
             {size<=1024 && show &&<i class="fas fa-times" onClick={()=>setShow(false)}></i>}
              <div className="user">
                {localStorage.account && (
                  <div className="box-user">
                    <span>
                      <Link to="/user">
                        <img src={user.avatar} alt="" />
                        {user.name}
                      </Link>
                    </span>
                    <button onClick={logoutData}>Logout</button>
                  </div>
                )}
                {!localStorage.account && <Link to="/user/login">Sign In</Link>}
              </div>
              <ul>
                {link.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.contact}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>}
        {size>1024&&<div className="box-nav">
          <div className="nav-bar-container">
            <nav>
              <Link to="/">
                <img src="http://bhhome.vn/images/website/logo.png" alt="" />
              </Link>
              <div className="user">
                {localStorage.account && (
                  <div className="box-user">
                    <span>
                      <Link to="/user">
                        <img src={user.avatar} alt="" />
                        {user.name}
                      </Link>
                    </span>
                    <button onClick={logoutData}>Logout</button>
                  </div>
                )}
                {!localStorage.account && <Link to="/user/login">Sign In</Link>}
              </div>
              <ul>
                {link.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={item.contact}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>}
      </div>
    </section>
  );
};

export default Header;

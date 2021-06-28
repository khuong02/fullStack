import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { ErrShow, SuccessShow } from "../notification/Notification";

const initState = {
  name: "",
  email: "",
  password: "",
  rf_password: "",
  err: "",
  success: "",
};

const Register = () => {
  const [user, setUser] = useState(initState);
  const [hide, setHide] = useState(true);

  const { email, password, err, success, name, rf_password } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", {
        name,
        email,
        password,
        rf_password,
      });

      setUser({ ...user, err: "", success: "Đăng ký thành công!" });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };
  return (
    <section>
      <div className="form">
        <div className="box-form">
          <h1>Login</h1>
          {err && ErrShow(err)}
          {success && SuccessShow(success)}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={handleChangeInput}
              placeholder="Nhập tên của bạn..."
              type="text"
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              placeholder="Nhập email..."
              type="email"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={handleChangeInput}
              placeholder="Nhập password..."
              type={hide ? "password" : "text"}
            />
            <label htmlFor="rf_password">Password</label>
            <input
              id="rf_password"
              name="rf_password"
              value={rf_password}
              onChange={handleChangeInput}
              placeholder="Nhập lại password..."
              type={hide ? "password" : "text"}
            />
            <p>
              Hide password
              <input type="checkbox" onClick={() => setHide(!hide)} />
            </p>

            <button type="submit">Đăng ký</button>
          </form>
          <p>
            Already account!
            <Link to="/user/login">Login!</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;

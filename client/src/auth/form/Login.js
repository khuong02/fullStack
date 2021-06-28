import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { dispatchLogin } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ErrShow, SuccessShow } from "../notification/Notification";

const initState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState(initState);
  const [hide, setHide] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: "Đăng nhập thành công!" });
      auth.user.push(res.data);
      localStorage.setItem("account", res.data.accessToken);
      dispatch(dispatchLogin());
      history.replace("/");
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
            <p>
              Hide password
              <input type="checkbox" onClick={() => setHide(!hide)} />
            </p>

            <button type="submit">Đăng nhập</button>
          </form>
          <p>
            Create new user!
            <Link to="/user/register">Register!</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

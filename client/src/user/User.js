import axios from "axios";
import React, { useEffect, useState } from "react";
import { SuccessShow, ErrShow } from "../auth/notification/Notification";
import { Link } from "react-router-dom";

const initialState = {
  password: "",
  rf_password: "",
  err: "",
  success: "",
};
//asdasdsadsa 
const initialProduct = {
  species: "",
  nameProduct: "",
  errProduct: "",
  successProduct: "",
};

const User = () => {
  const [user, setUser] = useState({});
  const [changePassword, setChangePassword] = useState(initialState);
  const [uploadProduct, setUploadProduct] = useState(initialProduct);

  const [hide, setHide] = useState(true);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  //   const [exit, setExit] = useState(true);
  const [imageProduct, setImageProduct] = useState(false);
  const [cloudinary, setCloundinary] = useState("");

  const { email } = user;
  const id = user._id;
  const { password, rf_password, err, success } = changePassword;
  const { species, nameProduct, errProduct, successProduct } = uploadProduct;

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axios.get("/user/profile", {
          headers: { "auth-token": localStorage.account },
        });
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    userData();
  }, [localStorage.account]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (!user._id)
        return setChangePassword({
          ...changePassword,
          password: "",
          rf_password: "",
          err: "Not found user.",
          success: "",
        });

      const res = await axios.patch(`/user/changePassword/${user._id}`, {
        password,
        rf_password,
      });
      setChangePassword({
        ...changePassword,
        password: "",
        rf_password: "",
        err: "",
        success: res.data.msg,
      });
    } catch (err) {
      err.response.data.msg &&
        setChangePassword({
          ...changePassword,
          password: password,
          rf_password: rf_password,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUploadProduct({
      ...uploadProduct,
      [name]: value,
      errProduct: "",
      successProduct: "",
    });
    setChangePassword({
      ...changePassword,
      [name]: value,
      err: "",
      success: "",
    });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("avatar", file);
      formData.append("email", email);

      setLoading(true);
      const res = await axios.post(`/user/upload_avatar`, formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
      window.location.href = "/user";
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const handleSubmitUploadProduct = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("image", file);
      setLoadingUpload(true);

      const res = await axios.post(`/user/upload_product`, formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });

      if (!res)
        return setUploadProduct({
          ...uploadProduct,
          errProduct: "Not found upload!",
        });
      setLoadingUpload(false);
      setImageProduct(res.data.image);
      setCloundinary(res.data.cloudinary_id);
    } catch (err) {
      err.response.data.msg &&
        setUploadProduct({
          ...uploadProduct,
          errProduct: err.response.data.msg,
          successProduct: "",
        });
      console.log(err);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/upload", {
        id,
        species,
        nameProduct,
        imageProduct,
        cloudinary,
      });

      if (!res)
        return setUploadProduct({
          ...updateProduct,
          errProduct: "Product does not upload!",
        });

      setUploadProduct({
        ...uploadProduct,
        species: "",
        nameProduct: "",
        errProduct: "",
        successProduct: res.data.msg,
      });
      setImageProduct(false);
    } catch (err) {
      err.response.data.msg &&
        setUploadProduct({
          ...uploadProduct,
          errProduct: err.response.data.msg,
          successProduct: "",
        });
    }
  };

  return (
    <section>
      <div className="profile-user">
        <div className="box-profile">
          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" />
            {loading && <i className="fas fa-spinner fa-spin loading"></i>}
            <span>
              <i className="fas fa-camera"></i>
              <input
                type="file"
                name="avatar"
                id="file_up"
                onChange={changeAvatar}
              />
            </span>
          </div>
          <p>
            <span>Name: </span>
            {user.name}
          </p>
          <p>
            <span>Email: </span>
            {user.email}
          </p>
          {err && ErrShow(err)}
          {success && SuccessShow(success)}
          <form onSubmit={handleChangePassword}>
            <div className="changePassword">
              <label>Password mới</label>
              <input
                type={hide ? "password" : "text"}
                name="password"
                value={password}
                onChange={handleChangeInput}
                placeholder="Nhập password mới"
              />
            </div>
            <div className="changePassword">
              <label>Nhập lại password mới</label>
              <input
                type={hide ? "password" : "text"}
                name="rf_password"
                value={rf_password}
                onChange={handleChangeInput}
                placeholder="Nhập lại password"
              />
            </div>
            <div className="hide-password">
              Hide password
              <input type="checkbox" onClick={() => setHide(!hide)} />
            </div>
            <button type="submit">Thay đổi</button>
          </form>
        </div>
        <div className="box-upload">
          {errProduct && ErrShow(errProduct)}
          {successProduct && SuccessShow(successProduct)}
          <div className="form-item">
            <label>Loại sản phẩm</label>
            <input
              type="text"
              name="species"
              value={species}
              onChange={handleChangeInput}
              placeholder="Nhập loại sản phẩm..."
            />
          </div>
          <div className="form-item">
            <label>Tên sản phẩm</label>
            <input
              type="text"
              name="nameProduct"
              value={nameProduct}
              onChange={handleChangeInput}
              placeholder="Nhập tên sản phẩm..."
            />
          </div>
          <div className="form-item">
            <label>Ảnh sản phẩm</label>
            <input type="file" onChange={handleSubmitUploadProduct} />
          </div>
          <div className="product-upload">
            {loadingUpload && (
              <i className="fas fa-spinner fa-spin loadingUpload"></i>
            )}
            {imageProduct && <img src={imageProduct} alt="" />}
          </div>
          <button onClick={updateProduct}>Đăng</button>
          <button>
            <Link to="/user/product">Các sản phẩm đã đăng</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default User;

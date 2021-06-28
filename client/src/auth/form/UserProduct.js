import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrShow } from "../notification/Notification";

const initialState = {
  productItem: [],
  err: "",
  success: "",
};

const UserProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [user, setUser] = useState({});

  const { productItem, err } = product;

  const id = user._id;

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axios.get("/user/profile", {
          headers: { "auth-token": localStorage.account },
        });
        setUser(res.data.user);
      } catch (err) {
        return err.response.data.msg;
      }
    };
    userData();
  }, [localStorage.account]);

  useEffect(() => {
    const userProduct = async () => {
      try {
        if (id) {
          const res = await axios.post("/user/product", { id });

          if (!res)
            return setProduct({
              ...productItem,
              err: "Product of user does not already.",
              success: "",
            });

          if (res.data.productInPage.length === 0)
            return setProduct({
              productItem: null,
              err: "",
              success: "",
            });

          setProduct({
            productItem: res.data.productInPage,
            err: "",
            success: "",
          });
        }
      } catch (err) {
        err.response.data.msg &&
          setProduct({
            ...productItem,
            err: err.response.data.msg,
            success: "",
          });
      }
    };

    userProduct();
  }, [id]);

  const handleDeleteProduct = async (e, idProduct, cloudinary_id) => {
    e.preventDefault();

    try {
      await axios.post("/user/delete", {
        idUser: id,
        idProduct: idProduct,
        cloudinary_id,
      });
      window.location.href = "/user/product";
    } catch (err) {
      err.response.data.msg &&
        setProduct({ ...product, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="box-user-product">
      {err && ErrShow(err)}
      {!productItem && (
        <div className="not-product">
          <p>You not yet upload product </p>
          <Link to="/user">Thêm sản phẩm ngay!</Link>
        </div>
      )}
      {productItem &&
        productItem.map((item) => {
          return (
            <div className="product-user-item" key={item._id}>
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <div className="box-btn">
                <button className="edit">
                  <Link to={`product/${item._id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                </button>
                <button
                  onClick={(e) =>
                    handleDeleteProduct(e, item._id, item.cloudinary)
                  }
                  className="delete"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserProduct;

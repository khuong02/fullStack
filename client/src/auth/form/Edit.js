import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ErrShow, SuccessShow } from "../notification/Notification";

const initialState = {
  productItem: {},
  err: "",
  success: "",
};

const changeValue = {
  species: "",
  nameProduct: "",
  errChange: "",
  successChange: "",
};

const Edit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(initialState);
  const [change, setChange] = useState(changeValue);
  const [image, setImage] = useState(false);
  const [cloudinary, setCloundinary] = useState(false);
  const [loading, setLoading] = useState(false);

  const { species, nameProduct, errChange, successChange } = change;

  const { productItem, err, success } = product;

  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          const res = await axios.post("/user/edit", { id });
          console.log(res);
          if (!res)
            return setProduct({
              ...productItem,
              err: "Sản phẩm không tồn tại.",
              success,
            });

          setProduct({
            productItem: res.data.product[0],
            err: "",
            success: "",
          });
        }
      } catch (err) {
        err.response.data.msg &&
          setProduct({ ...product, err: err.response.data.msg, success: "" });
      }
    };
    getData();
  }, [id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setChange({ ...change, [name]: value, errChange: "", successChange: "" });
  };

  const changeImageProduct = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("image", file);
      setLoading(true);

      const res = await axios.post(`/user/upload_product`, formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });

      setImage(res.data.image);
      setCloundinary(res.data.cloudinary_id);
      setLoading(false);
    } catch (err) {
      err.response.data.msg &&
        setChange({
          ...change,
          errChange: err.response.data.msg,
          successChange: "",
        });
      console.log(err);
    }
  };

  const handleUpdate = async (e, image) => {
    e.preventDefault();

    if (image !== productItem.image) {
      try {
        const oldCloudinary = productItem.cloudinary;

        if (id) {
          await axios.patch(`/user/edit/${id}`, {
            nameProduct: nameProduct ? nameProduct : productItem.name,
            species: species ? species : productItem.species,
            cloudinaryNew: cloudinary ? cloudinary : oldCloudinary,
            image,
            oldCloudinary,
          });

          window.location.href = `/user/product/${id}`;
        }
      } catch (err) {
        err.response.data.msg &&
          setChange({
            ...change,
            errChange: err.response.data.msg,
            successChange: "",
          });
      }
    } else {
      try {
        const oldCloudinary = productItem.cloudinary;

        if (id) {
          await axios.patch(`/user/edit/${id}`, {
            nameProduct,
            species,
            cloudinaryNew: cloudinary ? cloudinary : oldCloudinary,
            image,
            oldCloudinary,
          });

          window.location.href = `/user/product/${id}`;
        }
      } catch (err) {
        err.response.data.msg &&
          setChange({
            ...change,
            errChange: err.response.data.msg,
            successChange: "",
          });
      }
    }
  };

  return (
    <>
      {err && (
        <div className="errProduct">
          <h1>{err}</h1>
          <Link to="">Quay về trang chủ!</Link>
        </div>
      )}
      {!err && (
        <div className="box-edit">
          <div className="box-edit-item">
            {loading && <i className="fas fa-spinner fa-spin loadingEdit"></i>}
            <span>
              <i className="fas fa-camera"></i>
              <input
                type="file"
                name="image"
                id="file_up"
                onChange={changeImageProduct}
              />
            </span>
            <img src={image ? image : productItem.image} alt="" />
            <p>{productItem.name}</p>
          </div>
          <div className="form-upload">
            {errChange && ErrShow(errChange)}
            <div className="form-edit-item">
              <label htmlFor="species">Loại sản phẩm</label>
              <input
                id="species"
                type="text"
                name="species"
                value={species}
                placeholder="Nhập loại sản phẩm..."
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-edit-item">
              <label htmlFor="name">Tên sản phẩm</label>
              <input
                id="name"
                type="text"
                name="nameProduct"
                value={nameProduct}
                placeholder="Nhập tên sản phẩm..."
                onChange={handleChangeInput}
              />
            </div>
            <button
              onClick={(e) => {
                if (image) {
                  handleUpdate(e, image);
                } else {
                  handleUpdate(e, productItem.image);
                }
              }}
            >
              Update!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;

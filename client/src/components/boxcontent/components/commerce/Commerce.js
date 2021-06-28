import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import queryString from "query-string";
import WOW from "wowjs";

import Pagination from "./components/Pagination";
import PostFiltersForm from "./components/PostFiltersForm";

const Commerce = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 18,
    page: 1,
    totalPage: 1,
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 18,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const paramsString = queryString.stringify(filters);
        const res = await axios.get(`/commerce?${paramsString}`);
        setProduct(res.data.result);
        setPagination(res.data.pagination);
        setLoading(false);
        new WOW.WOW().init();
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [filters]);

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters({ ...filters, page: 1, name: newFilters.search });
  };

  return (
    <div className="box-commerce">
      <PostFiltersForm onSubmit={handleFiltersChange} />
      {loading && <h4>Loading...</h4>}
      {product.map((item) => {
        return (
          <div key={item._id} className="box-item" data-wow-duration="1.5s">
            <Link to="/">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
            </Link>
          </div>
        );
      })}
      {pagination.totalPage > 1 && (
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default Commerce;

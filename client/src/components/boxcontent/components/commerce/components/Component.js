import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import queryString from "query-string";
import WOW from "wowjs";

import Pagination from "./Pagination";

const Component = (props) => {
  const { path } = props;
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
    setLoading(true);
    const fetchData = async () => {
      try {
        const paramsString = queryString.stringify(filters);
        const res = await axios.get(`${path}?${paramsString}`);
        setProduct(res.data.result);
        setPagination(res.data.pagination);
        setLoading(false);
        new WOW.WOW().init();
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [path, filters]);

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <div className="box-commerce">
      {loading && <h4>Loading...</h4>}
      {product.map((item) => {
        return (
          <div
            key={item._id}
            className="box-item wow fadeInRight"
            data-wow-duration="1.5s"
          >
            <Link to="/">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
            </Link>
          </div>
        );
      })}
      {pagination.totalPage > 1 && (
        <Pagination
          className="pagination"
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

// Component.propTypes = {
//   path: PropTypes.string.isRequired,
// };

export default Component;

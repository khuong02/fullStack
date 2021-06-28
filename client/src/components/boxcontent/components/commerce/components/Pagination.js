import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Pagination } from "@material-ui/lab";
import WOW from "wowjs";

const PaginationBox = (props) => {
  const { pagination, onPageChange } = props;
  const { page, totalPage } = pagination;

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const handlePageChange = (e, newPage) => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <Pagination
        count={totalPage}
        shape="rounded"
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
};

PaginationBox.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

PaginationBox.defaultProps = {
  onPageChange: null,
};

export default PaginationBox;

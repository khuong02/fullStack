import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const PostFiltersForm = (props) => {
  const { onSubmit } = props;
  const [search, setSearch] = useState("");
  const typingTimeOutRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!onSubmit) return;

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }

    typingTimeOutRef.current = setTimeout(() => {
      const formValues = {
        search: value,
      };
      onSubmit(formValues);
    }, 500);
  };

  return (
    <div className="form-search">
      <input type="text" value={search} onChange={handleSearch} />
      <button>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
  onSubmit: null,
};

export default PostFiltersForm;

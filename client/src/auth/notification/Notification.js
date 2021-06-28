import React, { useEffect, useState } from "react";

export const ErrShow = (err) => {
  return <div className="errShow">{err}</div>;
};

export const SuccessShow = (success) => {
  return <div className="successShow">{success}</div>;
};

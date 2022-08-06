import React from "react";

interface ErrorInterface {
  children: React.ReactNode;
}

const CustomErrorTag: React.FC<ErrorInterface> = ({ children }) => {
  return <div style={{ color: "red", borderColor: "red" }}>{children}</div>;
};

export default CustomErrorTag;

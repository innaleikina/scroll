import React from "react";

export const List = ({ children }) => {
  return (
    <div className="list-container">
      <ul className="list">
        {children}
      </ul>
    </div>
  );
};

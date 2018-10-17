import React from "react";
import "./post.css";

export const Posts = ({ children }) => {
  return (
    <div className="posts-container">
      <ul className="posts">
        {children}
      </ul>
    </div>
  );
};

import React from "react";

export const SearchResults = (props) => {
  return (
    <div className="searchResults" {...props}>
        
        {props.children}
 
    </div>
  );
};

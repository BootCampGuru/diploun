import React from "react";

const headerStyle = {
    backgroundColor: "#07648d",
    fontSize: "20px",
    color: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "40px",
    position: "relative",
    left: "0",
    top: "0",
    height: "20px",
    width: "100%"
  };
  
  const phantomStyle = {
    display: "block",
    padding: "0px",
    height: "0px",
    width: "100%"
  };
  
  function Header({ children }) {
    return (
      <div>
        <div style={phantomStyle} />
        <div style={headerStyle}>{children}</div>
      </div>
    );
  }

export default Header
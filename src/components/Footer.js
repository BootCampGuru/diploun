import React from "react";

const footerStyle = {
    backgroundColor: "#07648d",
    fontSize: "20px",
    color: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "40px",
    position: "relative",
    left: "0",
    bottom: "0",
    height: "20px",
    width: "100%"
  };
  
  const phantomStyle = {
    display: "block",
    padding: "0px",
    height: "0px",
    width: "100%"
  };
  
  function Footer({ children }) {
    return (
      <div>
        <div style={phantomStyle} />
        <div style={footerStyle}>{children}</div>
      </div>
    );
  }

export default Footer
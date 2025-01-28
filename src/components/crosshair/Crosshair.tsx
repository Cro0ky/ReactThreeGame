import React from "react";

const Crosshair: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: "white",
        pointerEvents: "none",
      }}
    />
  );
};

export default Crosshair;

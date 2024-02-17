import React from "react";

interface ButtonProps {
  onClick?: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} style={{ background: "white", height: 32, width: 100, color: "black" }}>
      {label}
    </button>
  );
};

export default Button;

import React from "react";
import './Button.scss';
interface ButtonProps {
  onClick?: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="common-client-button">
      {label}
    </button>
  );
};

export default Button;

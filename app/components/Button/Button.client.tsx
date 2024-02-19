import React from "react";
import './Button.scss';
interface ButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className = '' , style}) => {
  return (
    <button onClick={onClick} className={`${className} common-client-button`} style={style}>
      {label}
    </button>
  );
};

export default Button;

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: "small" | "large";
  color?: string;
  icon?: React.ReactNode;
}

export const Button = ({
  text,
  size = "large",
  color = "bg-blue-600 hover:bg-blue-700",
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${props.className || ""} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""} ${color} ${size === "small" ? "px-2 py-1" : "px-4 py-2"} text-sm flex gap-2 items-center justify-center rounded text-white font-medium transition cursor-pointer duration-200`}
    >
      {text}
      {icon}
    </button>
  );
};

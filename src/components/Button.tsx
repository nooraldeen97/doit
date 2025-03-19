import React from "react";

interface ButtonProps {
  type: "submit" | "reset" | "button";
  value: string;
  color: "yellow" | "blue" | "red" | "green"; // Define allowed colors
}

const colorClasses: Record<string, string> = {
  yellow: "bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300",
  blue: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
  red: "bg-red-700 hover:bg-red-800 focus:ring-red-300",
  green: "bg-green-700 hover:bg-green-800 focus:ring-green-300",
};

function Button({ type, value, color }: ButtonProps) {
  return (
    <button
      type={type}
      className={`text-white ${colorClasses[color]} font-medium rounded-lg text-sm px-5 py-2.5 text-center float-end m-3 focus:ring-4 focus:outline-none`}
    >
      {value}
    </button>
  );
}

export default Button;

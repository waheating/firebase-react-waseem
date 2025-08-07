// ReusableButton.jsx
import React from 'react';

const ReusableButton = ({
  onClick,
  label = "Button",
  color = "blue",
  className = "",
  disabled = false
}) => {
  // Define color classes
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-500 hover:bg-gray-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    indigo: "bg-indigo-500 hover:bg-indigo-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    pink: "bg-pink-500 hover:bg-pink-600"
  };

  // Get the appropriate color class or default to pink
  const colorClass = colorClasses[color] || colorClasses.pink;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${colorClass} text-white px-4 py-2 rounded transition-colors text-xs ${className}`}
    >
      {label}
    </button>
  );
};

export default ReusableButton;
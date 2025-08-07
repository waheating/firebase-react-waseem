export function Button({ 
  children, 
  onClick, 
  disabled, 
  hidden = false, 
  variant = "default", 
  className = "",
  type = "button",
  size = "default" // New size prop
}) {
  if (hidden) return null;

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  const sizeClasses = {
    small: 'text-sm px-4 py-2',
    default: 'text-base px-6 py-3', // Larger default size
    large: 'text-lg px-8 py-4'      // Extra large option
  };

  const variantClasses = {
    default: `
      bg-gradient-to-br from-blue-600 to-blue-800
      text-white shadow-md
      hover:from-blue-700 hover:to-blue-900 hover:shadow-lg
      focus:ring-blue-500 focus:ring-offset-blue-100
      active:scale-[0.98]
    `,
    outline: `
      border-2 border-blue-600
      text-blue-600 bg-transparent
      hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700
      focus:ring-blue-500 focus:ring-offset-blue-100
      active:bg-blue-100
    `,
    danger: `
      bg-gradient-to-br from-red-500 to-red-600
      text-white shadow-md
      hover:from-red-600 hover:to-red-700 hover:shadow-lg
      focus:ring-red-500 focus:ring-offset-red-100
      active:scale-[0.98]
    `,
    success: `
      bg-gradient-to-br from-green-500 to-green-600
      text-white shadow-md
      hover:from-green-600 hover:to-green-700 hover:shadow-lg
      focus:ring-green-500 focus:ring-offset-green-100
      active:scale-[0.98]
    `
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size] || sizeClasses.default}
        ${variantClasses[variant] || variantClasses.default}
      `}
    >
      
      {children}
      {variant === 'default' && (
        <svg 
          className="ml-2 w-5 h-5" // Larger icon to match bigger button
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      )}
    </button>
  );
}
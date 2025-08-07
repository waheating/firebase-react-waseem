export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg shadow-orange-200
      w-full max-w-2xl min-h-[400px]  // Increased dimensions
      p-8  // Increased padding
      ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-6 bg-gradient-to-br from-white to-gray-50 ${className}`}>
      {children}
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 opacity-10">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="url(#paint0_angular)" strokeWidth="10"/>
          <defs>
            <radialGradient id="paint0_angular" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(40)">
              <stop stopColor="#F97316"/>
              <stop offset="1" stopColor="#7C3AED"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
import React from 'react'

function Logo({ width = '120px', className = '' }) {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      <img
        src="/orbit-logo.png"
        alt="Orbit Logo"
        className="h-10 w-auto object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
        style={{ maxWidth: width }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "./orbit-logo.png";
        }}
      />
      <span className="text-xl font-bold tracking-widest uppercase shimmer-text">
        ORBIT
      </span>
    </div>
  )
}

export default Logo
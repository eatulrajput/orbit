import React from 'react'

/**
 * BetaTag - A modular, animated cosmic badge component with shiver & shimmer effects.
 *
 * @param {string} text - Label to display (default: 'Beta')
 * @param {boolean} shiver - Whether to enable periodic micro-tremor animation (default: true)
 * @param {string} className - Optional container styling override
 */
function BetaTag({
  text = 'Beta',
  shiver = true,
  className = '',
}) {
  return (
    <span
      className={`relative inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/35 backdrop-blur-md shadow-sm shadow-indigo-500/15 group-hover:border-indigo-400/60 group-hover:shadow-indigo-500/30 transition-all duration-300 select-none ${
        shiver ? 'animate-shiver' : ''
      } ${className}`}
    >
      <span className="text-xs sm:text-sm font-black tracking-wider uppercase beta-shimmer-text leading-none">
        {text}
      </span>
    </span>
  )
}

export default BetaTag

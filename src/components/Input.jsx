import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full space-y-1.5'>
            {label && (
                <label 
                    className='inline-block text-xs font-semibold uppercase tracking-wider text-slate-300 pl-1' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-4 py-3 rounded-xl bg-slate-900 text-white placeholder-slate-500 border border-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-500 ease-in-out w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
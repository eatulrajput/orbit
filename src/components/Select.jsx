import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full space-y-1.5'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='inline-block text-xs font-semibold uppercase tracking-wider text-slate-300 pl-1'
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-500 ease-in-out w-full cursor-pointer ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-slate-900 text-white py-2">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
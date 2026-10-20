import { useState, useEffect } from 'react'

/**
 * Custom hook to cycle an index periodically.
 * @param {number} totalItems - Total count of items to cycle through
 * @param {number} intervalMs - Interval duration in milliseconds
 * @returns {number} Current active index
 */
export function useRotator(totalItems, intervalMs = 3000) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (!totalItems || totalItems <= 1) return
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % totalItems)
        }, intervalMs)

        return () => clearInterval(timer)
    }, [totalItems, intervalMs])

    return index
}

export default useRotator

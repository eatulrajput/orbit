// Shared Spring Physics Presets
export const springGentle = {
    type: "spring",
    stiffness: 140,
    damping: 18,
    mass: 0.8,
}

export const springBouncy = {
    type: "spring",
    stiffness: 380,
    damping: 18,
}

export const springSnappy = {
    type: "spring",
    stiffness: 420,
    damping: 22,
}

export const springCard = {
    type: "spring",
    stiffness: 220,
    damping: 22,
}

// Custom Cubic Bezier Easing Curves
export const easeVercel = [0.16, 1, 0.3, 1] // signature sleek ease-out
export const easeOutQuart = [0.165, 0.84, 0.44, 1]
export const easeInOutSmooth = [0.4, 0, 0.2, 1]

// Staggered Motion Variants
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
}

export const fadeUpVariant = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: easeVercel,
        },
    },
}

export const cardScaleVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 22,
        },
    },
}

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Container } from '../index'
import { useRotator } from '../../hooks/useRotator'
import { statsSets } from '../../data/landingData'
import { containerVariants, cardScaleVariant, easeVercel, springBouncy } from '../../constants/motion'

function StatsBar() {
    const statIndex = useRotator(statsSets.length, 3600)

    return (
        <section className="py-12 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center [perspective:1000px]"
                >
                    {statsSets[statIndex].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            variants={cardScaleVariant}
                            whileHover={{ scale: 1.05, y: -4 }}
                            transition={springBouncy}
                            className="p-4 rounded-2xl transition-colors hover:bg-slate-800/30 cursor-default flex flex-col justify-center items-center h-24 sm:h-28 overflow-hidden"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${statIndex}-${stat.value}`}
                                    initial={{ opacity: 0, y: 20, rotateX: 60, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -20, rotateX: -60, filter: "blur(4px)" }}
                                    transition={{
                                        duration: 0.55,
                                        ease: easeVercel,
                                        delay: idx * 0.06,
                                    }}
                                    className="w-full flex flex-col items-center justify-center"
                                >
                                    <h4 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                        {stat.value}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 truncate max-w-full">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    )
}

export default StatsBar

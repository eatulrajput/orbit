import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '../index'
import { useRotator } from '../../hooks/useRotator'
import { rotatingTerms } from '../../data/landingData'
import { easeVercel, springBouncy } from '../../constants/motion'

function HeroSection() {
    const authStatus = useSelector((state) => state.auth.status)
    const termIndex = useRotator(rotatingTerms.length, 2600)

    return (
        <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
            {/* Background Ambient Glow Accents */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    x: [0, 30, 0],
                    y: [0, -25, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-500/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    x: [0, -30, 0],
                    y: [0, 35, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                }}
                className="absolute top-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
            />

            <Container>
                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                    
                    {/* Announcement Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 20,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md shadow-sm cursor-default"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                            Orbit v2.0 • Modern Publishing Engine
                        </span>
                    </motion.div>

                    {/* Hero Headline with Animated Rotator */}
                    <motion.h1
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.85,
                            ease: easeVercel,
                            delay: 0.1,
                        }}
                        className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight flex flex-col items-center gap-2 sm:gap-3"
                    >
                        <span>Craft, Collaborate &amp; Scale</span>
                        <span className="relative inline-flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={rotatingTerms[termIndex]}
                                    initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -22, filter: "blur(6px)" }}
                                    transition={{
                                        duration: 0.5,
                                        ease: easeVercel,
                                    }}
                                    className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent inline-block pb-2 pt-0.5"
                                >
                                    {rotatingTerms[termIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        <span>Effortlessly</span>
                    </motion.h1>

                    {/* Hero Subhead */}
                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: easeVercel,
                            delay: 0.22,
                        }}
                        className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Orbit empowers developers, engineering teams, and creators to write rich technical blogs, share community knowledge, and grow an audience with zero friction.
                    </motion.p>

                    {/* CTA Buttons with Spring Physics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            ease: easeVercel,
                            delay: 0.32,
                        }}
                        className="flex flex-wrap items-center justify-center gap-4 pt-2"
                    >
                        {authStatus ? (
                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                transition={springBouncy}
                            >
                                <Link
                                    to="/add-post"
                                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Start Writing Now
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                transition={springBouncy}
                            >
                                <Link
                                    to="/signup"
                                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-colors inline-block"
                                >
                                    Get Started for Free
                                </Link>
                            </motion.div>
                        )}

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            transition={springBouncy}
                        >
                            <Link
                                to="/login"
                                className="px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-sm rounded-2xl backdrop-blur-md flex items-center gap-2 transition-colors"
                            >
                                Sign In
                                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>

                </div>
            </Container>
        </section>
    )
}

export default HeroSection

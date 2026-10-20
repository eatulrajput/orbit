import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '../index'
import { easeVercel, springBouncy } from '../../constants/motion'

function FinalCTA() {
    const authStatus = useSelector((state) => state.auth.status)

    return (
        <section className="py-20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 35 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                        type: "spring",
                        stiffness: 190,
                        damping: 24,
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-slate-800/80 p-10 sm:p-16 text-center shadow-2xl"
                >
                    <motion.div
                        animate={{
                            opacity: [0.4, 0.7, 0.4],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-500/10 blur-3xl pointer-events-none"
                    />
                    
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: easeVercel }}
                            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                        >
                            Ready to Share Your Engineering Insights?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: easeVercel, delay: 0.1 }}
                            className="text-slate-400 text-base"
                        >
                            Join hundreds of developers and technical authors publishing on Orbit today.
                        </motion.p>

                        <div className="pt-2">
                            <motion.div
                                whileHover={{ scale: 1.06, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                transition={springBouncy}
                                className="inline-block"
                            >
                                <Link
                                    to={authStatus ? "/add-post" : "/signup"}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-colors"
                                >
                                    {authStatus ? "Start Writing Now" : "Create Your Free Account"}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}

export default FinalCTA

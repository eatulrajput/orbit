import React from 'react'
import { motion } from 'motion/react'
import { Container } from '../index'
import { springGentle, springSnappy } from '../../constants/motion'

function HeroMockup() {
    return (
        <section className="relative pb-16 sm:pb-24 overflow-hidden">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 170,
                        damping: 24,
                        delay: 0.4,
                    }}
                    whileHover={{ y: -6 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <div className="relative rounded-3xl overflow-hidden border border-slate-800/90 bg-slate-900/90 shadow-2xl p-4 sm:p-6 backdrop-blur-xl">
                        {/* Window Header */}
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                            <div className="flex items-center gap-2">
                                <motion.span whileHover={{ scale: 1.3 }} transition={springSnappy} className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" />
                                <motion.span whileHover={{ scale: 1.3 }} transition={springSnappy} className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer" />
                                <motion.span whileHover={{ scale: 1.3 }} transition={springSnappy} className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer" />
                                <span className="ml-2 text-xs font-mono text-slate-500">orbit.app/dashboard</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    System Online
                                </span>
                            </div>
                        </div>

                        {/* Mockup Dashboard Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left Main Canvas Mock */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={springGentle}
                                className="md:col-span-2 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Draft Article</span>
                                    <span className="text-[10px] text-slate-500 font-mono">Auto-saved 2m ago</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">Scaling Microservices with Event-Driven Architecture</h3>
                                <div className="space-y-2 pt-2">
                                    <div className="h-3 bg-slate-800/80 rounded w-full" />
                                    <div className="h-3 bg-slate-800/80 rounded w-11/12" />
                                    <div className="h-3 bg-slate-800/60 rounded w-3/4" />
                                </div>
                                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-indigo-300">
                                    <code>const client = new Appwrite.Client();</code>
                                </div>
                            </motion.div>

                            {/* Right Stats Sidebar Mock */}
                            <div className="space-y-4">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={springGentle}
                                    className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4"
                                >
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Weekly Views</span>
                                    <span className="text-2xl font-extrabold text-white">24.8k</span>
                                    <span className="text-[10px] text-emerald-400 block mt-1">+14.2% engagement</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={springGentle}
                                    className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4"
                                >
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Top Category</span>
                                    <span className="text-sm font-bold text-indigo-300">Engineering &amp; Architecture</span>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}

export default HeroMockup

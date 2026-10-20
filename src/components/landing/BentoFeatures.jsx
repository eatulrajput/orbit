import React from 'react'
import { motion } from 'motion/react'
import { Container } from '../index'
import {
    containerVariants,
    fadeUpVariant,
    cardScaleVariant,
    springCard,
    springSnappy,
    springGentle,
    springBouncy,
} from '../../constants/motion'

function BentoFeatures() {
    return (
        <section className="py-24 relative">
            <Container>
                {/* Bento Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={containerVariants}
                    className="text-center max-w-2xl mx-auto mb-16 space-y-3"
                >
                    <motion.span
                        variants={fadeUpVariant}
                        className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full"
                    >
                        Built for Creators &amp; Engineers
                    </motion.span>
                    <motion.h2
                        variants={fadeUpVariant}
                        className="text-3xl sm:text-5xl font-black text-white tracking-tight"
                    >
                        Everything You Need to Publish Great Content
                    </motion.h2>
                    <motion.p
                        variants={fadeUpVariant}
                        className="text-slate-400 text-sm sm:text-base"
                    >
                        Designed with performance, rich formatting, and community discovery at its core.
                    </motion.p>
                </motion.div>

                {/* Bento Grid Container */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                    {/* BENTO ITEM 1: Rich Text Studio (2-Column Hero Card) */}
                    <motion.div
                        variants={cardScaleVariant}
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={springCard}
                        className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-slate-700 flex flex-col justify-between space-y-8"
                    >
                        <div className="space-y-4 max-w-xl">
                            <motion.div
                                whileHover={{ rotate: 8, scale: 1.1 }}
                                transition={springSnappy}
                                className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-inner"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Rich Text Content Studio</h3>
                            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                                Write naturally with WYSIWYG formatting, code block syntax styling, image uploads, and clean article editing powered by TinyMCE.
                            </p>
                        </div>

                        {/* Interactive Editor Mock Illustration */}
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={springGentle}
                            className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3 shadow-inner"
                        >
                            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                                <div className="flex items-center gap-1.5">
                                    <motion.span whileHover={{ scale: 1.08 }} transition={springSnappy} className="px-2 py-0.5 text-[10px] font-mono bg-indigo-500/20 text-indigo-300 rounded cursor-pointer">HTML Parser</motion.span>
                                    <motion.span whileHover={{ scale: 1.08 }} transition={springSnappy} className="px-2 py-0.5 text-[10px] font-mono bg-purple-500/20 text-purple-300 rounded cursor-pointer">Code Highlighting</motion.span>
                                </div>
                                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                    Ready to Publish
                                </span>
                            </div>
                            <div className="font-mono text-xs text-slate-300 space-y-1">
                                <p><span className="text-indigo-400">#</span> Microservice Event Architecture</p>
                                <p className="text-slate-500">const publishEvent = async (data) =&gt; ...</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* BENTO ITEM 2: Instant Edge Publishing (1-Column Card) */}
                    <motion.div
                        variants={cardScaleVariant}
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={springCard}
                        className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl relative overflow-hidden group hover:border-slate-700 flex flex-col justify-between space-y-6"
                    >
                        <div className="space-y-4">
                            <motion.div
                                whileHover={{ rotate: -8, scale: 1.1 }}
                                transition={springSnappy}
                                className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center border border-purple-500/20 shadow-inner"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </motion.div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Instant Edge Publishing</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Publish articles instantly across the global Orbit community feed with zero build delays.
                            </p>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={springGentle}
                            className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-center space-y-1"
                        >
                            <span className="text-2xl font-black text-white">&lt;50ms</span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Global CDN Latency</span>
                        </motion.div>
                    </motion.div>

                    {/* BENTO ITEM 3: Community Discovery (1-Column Card) */}
                    <motion.div
                        variants={cardScaleVariant}
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={springCard}
                        className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl relative overflow-hidden group hover:border-slate-700 flex flex-col justify-between space-y-6"
                    >
                        <div className="space-y-4">
                            <motion.div
                                whileHover={{ rotate: 8, scale: 1.1 }}
                                transition={springSnappy}
                                className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-inner"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </motion.div>
                            <h3 className="text-xl font-bold text-white tracking-tight">Community Discovery</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Real-time article search and category filtering enable readers to find your technical posts instantly.
                            </p>
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                            {["Engineering", "Design", "Product"].map((tag, i) => (
                                <motion.span
                                    key={tag}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={springBouncy}
                                    className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg cursor-pointer ${
                                        i === 0
                                            ? "bg-indigo-600 text-white"
                                            : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                                    }`}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* BENTO ITEM 4: Appwrite Cloud Infrastructure (2-Column Hero Card) */}
                    <motion.div
                        variants={cardScaleVariant}
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={springCard}
                        className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950 border border-indigo-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-indigo-500/40 flex flex-col justify-between space-y-8"
                    >
                        <div className="space-y-4 max-w-xl">
                            <motion.div
                                whileHover={{ rotate: -8, scale: 1.1 }}
                                transition={springSnappy}
                                className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center border border-pink-500/20 shadow-inner"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Appwrite Cloud Infrastructure</h3>
                            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                                Enterprise-grade authentication, storage bucket security, document-level ACL permissions, and isolated database management.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={springGentle}
                                className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl"
                            >
                                <span className="text-xs font-bold text-indigo-400 block mb-1">Public ACLs</span>
                                <span className="text-[11px] text-slate-400">Permission.read(Role.any())</span>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={springGentle}
                                className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl"
                            >
                                <span className="text-xs font-bold text-purple-400 block mb-1">Bucket Storage</span>
                                <span className="text-[11px] text-slate-400">Instant Preview Tokens</span>
                            </motion.div>
                        </div>
                    </motion.div>

                </motion.div>
            </Container>
        </section>
    )
}

export default BentoFeatures

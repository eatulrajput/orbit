import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Spring physics profiles
const springGentle = {
    type: "spring",
    stiffness: 140,
    damping: 18,
    mass: 0.8,
}

const springBouncy = {
    type: "spring",
    stiffness: 380,
    damping: 18,
}

const springSnappy = {
    type: "spring",
    stiffness: 420,
    damping: 22,
}

const springCard = {
    type: "spring",
    stiffness: 220,
    damping: 22,
}

// Custom Cubic Bezier Easing curves
const easeVercel = [0.16, 1, 0.3, 1] // signature sleek ease-out
const easeOutQuart = [0.165, 0.84, 0.44, 1]
const easeInOutSmooth = [0.4, 0, 0.2, 1]

// Stagger variants for parent containers
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
}

const fadeUpVariant = {
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

const cardScaleVariant = {
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

const statsSets = [
    [
        { value: "10k+", label: "Articles Published" },
        { value: "50k+", label: "Monthly Readers" },
        { value: "<50ms", label: "Global Edge Latency" },
        { value: "99.99%", label: "Uptime SLA" },
    ],
    [
        { value: "1.8M+", label: "Total Page Views" },
        { value: "120+", label: "Global Countries" },
        { value: "99.9%", label: "Delivery Rate" },
        { value: "24/7", label: "Cloud Monitoring" },
    ],
    [
        { value: "25k+", label: "Code Snippets Shared" },
        { value: "4.9★", label: "Developer Rating" },
        { value: "<30ms", label: "Edge Cache Hit" },
        { value: "Zero", label: "Downtime Recorded" },
    ],
]

const samplePosts = [
    {
        $id: "demo-1",
        title: "Building High-Performance React Applications with Vite & Redux",
        featuredImage: "",
    },
    {
        $id: "demo-2",
        title: "Designing Modern Dark Mode UIs with Glassmorphism and Tailwind CSS",
        featuredImage: "",
    },
    {
        $id: "demo-3",
        title: "Appwrite Cloud Architecture: Database Security & File Storage",
        featuredImage: "",
    },
    {
        $id: "demo-4",
        title: "Mastering Rich Text Editors with TinyMCE Integration",
        featuredImage: "",
    }
]

const rotatingTerms = [
    "Technical Blogs",
    "Engineering Guides",
    "Developer Stories",
    "Architecture Notes",
    "Code Insights",
]

function Landing() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [termIndex, setTermIndex] = useState(0)
    const [statIndex, setStatIndex] = useState(0)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        const interval = setInterval(() => {
            setTermIndex((prev) => (prev + 1) % rotatingTerms.length)
        }, 2600)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const statInterval = setInterval(() => {
            setStatIndex((prev) => (prev + 1) % statsSets.length)
        }, 3600)
        return () => clearInterval(statInterval)
    }, [])

    useEffect(() => {
        appwriteService.getPosts([]).then((res) => {
            if (res && res.documents && res.documents.length > 0) {
                setPosts(res.documents.slice(0, 4))
            } else {
                setPosts(samplePosts)
            }
            setLoading(false)
        }).catch(() => {
            setPosts(samplePosts)
            setLoading(false)
        })
    }, [])

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
            
            {/* HERO SECTION */}
            <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
                {/* Background Ambient Glow Accents with Gentle Floating Motion */}
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
                        
                        {/* Announcement Badge with Spring Entrance and Hover */}
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

                        {/* Hero Headline with Smooth Ease Entrance */}
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

                        {/* Hero Subhead with Ease Easing */}
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

                    {/* HERO PRODUCT MOCKUP PREVIEW CARD WITH SPRING REVEAL & HOVER LIFT */}
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
                        className="mt-16 sm:mt-20 relative max-w-5xl mx-auto"
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

            {/* STATS & PERFORMANCE BAR WITH ROTATING ANIMATION WITH EASE */}
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

            {/* BENTO GRID FEATURES SECTION WITH VIEWPORT REVEAL & SPRING HOVER */}
            <section className="py-24 relative">
                <Container>
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

                    {/* BENTO GRID CONTAINER */}
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

            {/* FEATURED ARTICLES FEED SHOWCASE WITH VIEWPORT STAGGER */}
            <section className="py-16 bg-slate-900/30 border-t border-slate-800/80">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, ease: easeVercel }}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
                    >
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Featured Content</span>
                            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">Latest Community Articles</h2>
                        </div>
                        <motion.div
                            whileHover={{ x: 4 }}
                            transition={springBouncy}
                        >
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Sign In to Explore All
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="h-64 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse p-4" />
                            ))}
                        </div>
                    ) : posts.length > 0 ? (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={containerVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {posts.map((post) => (
                                <motion.div
                                    key={post.$id}
                                    variants={cardScaleVariant}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={springSnappy}
                                >
                                    <PostCard {...post} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                            <p className="text-slate-400 text-sm">No articles published yet. Be the first author to post!</p>
                        </div>
                    )}
                </Container>
            </section>

            {/* FINAL CONVERSION CTA BANNER WITH SPRING SCALE & HOVER */}
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

        </div>
    )
}

export default Landing

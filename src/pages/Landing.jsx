import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

function Landing() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

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
                {/* Background Ambient Glow Accents */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <Container>
                    <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                        
                        {/* Announcement Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md shadow-sm">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                                Orbit v2.0 • Modern Publishing Engine
                            </span>
                        </div>

                        {/* Hero Headline */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15]">
                            Craft, Collaborate &amp; Scale <br className="hidden sm:inline" />
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                                Technical Blogs
                            </span> Effortlessly
                        </h1>

                        {/* Hero Subhead */}
                        <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
                            Orbit empowers developers, engineering teams, and creators to write rich technical blogs, share community knowledge, and grow an audience with zero friction.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                            {authStatus ? (
                                <Link
                                    to="/add-post"
                                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all duration-500 ease-in-out hover:scale-[1.02] flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Start Writing Now
                                </Link>
                            ) : (
                                <Link
                                    to="/signup"
                                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all duration-500 ease-in-out hover:scale-[1.02]"
                                >
                                    Get Started for Free
                                </Link>
                            )}

                            <Link
                                to="/login"
                                className="px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-sm rounded-2xl transition-all duration-500 ease-in-out hover:scale-[1.02] backdrop-blur-md flex items-center gap-2"
                            >
                                Sign In
                                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>

                    </div>

                    {/* HERO PRODUCT MOCKUP PREVIEW CARD */}
                    <div className="mt-16 sm:mt-20 relative max-w-5xl mx-auto">
                        <div className="relative rounded-3xl overflow-hidden border border-slate-800/90 bg-slate-900/90 shadow-2xl p-4 sm:p-6 backdrop-blur-xl">
                            {/* Window Header */}
                            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                    <span className="ml-2 text-xs font-mono text-slate-500">orbit.app/dashboard</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                                        System Online
                                    </span>
                                </div>
                            </div>

                            {/* Mockup Dashboard Content Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Left Main Canvas Mock */}
                                <div className="md:col-span-2 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 space-y-4">
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
                                </div>

                                {/* Right Stats Sidebar Mock */}
                                <div className="space-y-4">
                                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Weekly Views</span>
                                        <span className="text-2xl font-extrabold text-white">24.8k</span>
                                        <span className="text-[10px] text-emerald-400 block mt-1">+14.2% engagement</span>
                                    </div>

                                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Top Category</span>
                                        <span className="text-sm font-bold text-indigo-300">Engineering &amp; Architecture</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* STATS & PERFORMANCE BAR */}
            <section className="py-12 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h4 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">10k+</h4>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Articles Published</p>
                        </div>
                        <div>
                            <h4 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">50k+</h4>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Monthly Readers</p>
                        </div>
                        <div>
                            <h4 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">&lt;50ms</h4>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Global Edge Latency</p>
                        </div>
                        <div>
                            <h4 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">99.99%</h4>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Uptime SLA</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* BENTO GRID FEATURES SECTION */}
            <section className="py-24 relative">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
                            Built for Creators &amp; Engineers
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                            Everything You Need to Publish Great Content
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base">
                            Designed with performance, rich formatting, and community discovery at its core.
                        </p>
                    </div>

                    {/* BENTO GRID CONTAINER */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        
                        {/* BENTO ITEM 1: Rich Text Studio (2-Column Hero Card) */}
                        <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-all duration-500 ease-in-out flex flex-col justify-between space-y-8">
                            <div className="space-y-4 max-w-xl">
                                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-inner">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Rich Text Content Studio</h3>
                                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                                    Write naturally with WYSIWYG formatting, code block syntax styling, image uploads, and clean article editing powered by TinyMCE.
                                </p>
                            </div>

                            {/* Interactive Editor Mock Illustration */}
                            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-3 shadow-inner">
                                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className="px-2 py-0.5 text-[10px] font-mono bg-indigo-500/20 text-indigo-300 rounded">HTML Parser</span>
                                        <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-500/20 text-purple-300 rounded">Code Highlighting</span>
                                    </div>
                                    <span className="text-[10px] text-emerald-400 font-mono">Ready to Publish</span>
                                </div>
                                <div className="font-mono text-xs text-slate-300 space-y-1">
                                    <p><span className="text-indigo-400">#</span> Microservice Event Architecture</p>
                                    <p className="text-slate-500">const publishEvent = async (data) =&gt; ...</p>
                                </div>
                            </div>
                        </div>

                        {/* BENTO ITEM 2: Instant Edge Publishing (1-Column Card) */}
                        <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all duration-500 ease-in-out flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center border border-purple-500/20 shadow-inner">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Instant Edge Publishing</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Publish articles instantly across the global Orbit community feed with zero build delays.
                                </p>
                            </div>

                            <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl text-center space-y-1">
                                <span className="text-2xl font-black text-white">&lt;50ms</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Global CDN Latency</span>
                            </div>
                        </div>

                        {/* BENTO ITEM 3: Community Discovery (1-Column Card) */}
                        <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all duration-500 ease-in-out flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-inner">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Community Discovery</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Real-time article search and category filtering enable readers to find your technical posts instantly.
                                </p>
                            </div>

                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                                <span className="px-2.5 py-1 text-[10px] font-semibold bg-indigo-600 text-white rounded-lg">Engineering</span>
                                <span className="px-2.5 py-1 text-[10px] font-semibold bg-slate-950 text-slate-400 border border-slate-800 rounded-lg">Design</span>
                                <span className="px-2.5 py-1 text-[10px] font-semibold bg-slate-950 text-slate-400 border border-slate-800 rounded-lg">Product</span>
                            </div>
                        </div>

                        {/* BENTO ITEM 4: Appwrite Cloud Infrastructure (2-Column Hero Card) */}
                        <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950 border border-indigo-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-500 ease-in-out flex flex-col justify-between space-y-8">
                            <div className="space-y-4 max-w-xl">
                                <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-2xl flex items-center justify-center border border-pink-500/20 shadow-inner">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Appwrite Cloud Infrastructure</h3>
                                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                                    Enterprise-grade authentication, storage bucket security, document-level ACL permissions, and isolated database management.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl">
                                    <span className="text-xs font-bold text-indigo-400 block mb-1">Public ACLs</span>
                                    <span className="text-[11px] text-slate-400">Permission.read(Role.any())</span>
                                </div>
                                <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl">
                                    <span className="text-xs font-bold text-purple-400 block mb-1">Bucket Storage</span>
                                    <span className="text-[11px] text-slate-400">Instant Preview Tokens</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>

            {/* FEATURED ARTICLES FEED SHOWCASE */}
            <section className="py-16 bg-slate-900/30 border-t border-slate-800/80">
                <Container>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Featured Content</span>
                            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">Latest Community Articles</h2>
                        </div>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            Sign In to Explore All
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="h-64 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse p-4" />
                            ))}
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {posts.map((post) => (
                                <div key={post.$id} className="transition-all duration-500 ease-in-out hover:-translate-y-1">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                            <p className="text-slate-400 text-sm">No articles published yet. Be the first author to post!</p>
                        </div>
                    )}
                </Container>
            </section>

            {/* FINAL CONVERSION CTA BANNER */}
            <section className="py-20">
                <Container>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-slate-800/80 p-10 sm:p-16 text-center shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-500/10 blur-3xl pointer-events-none" />
                        
                        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Ready to Share Your Engineering Insights?
                            </h2>
                            <p className="text-slate-400 text-base">
                                Join hundreds of developers and technical authors publishing on Orbit today.
                            </p>

                            <div className="pt-2">
                                <Link
                                    to={authStatus ? "/add-post" : "/signup"}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all duration-500 ease-in-out hover:scale-[1.02]"
                                >
                                    {authStatus ? "Start Writing Now" : "Create Your Free Account"}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

        </div>
    )
}

export default Landing

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

function Dashboard() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTab, setActiveTab] = useState('All')
    const authStatus = useSelector((state) => state.auth.status)

    const categories = ['All', 'Engineering', 'Design', 'Product', 'Tutorials']

    useEffect(() => {
        appwriteService.getPosts([]).then((res) => {
            if (res && res.documents && res.documents.length > 0) {
                setPosts(res.documents)
            } else {
                setPosts(samplePosts)
            }
            setLoading(false)
        }).catch(() => {
            setPosts(samplePosts)
            setLoading(false)
        })
    }, [])

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
    })

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 py-10 font-sans">
            <Container>
                {/* Hero SaaS Dashboard Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-slate-800/80 p-8 sm:p-12 mb-12 shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Orbit SaaS Command Center
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Publish, Scale &amp; Explore <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Community Knowledge</span>
                        </h1>
                        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                            Welcome to your dashboard. Manage technical writing, monitor article performance, and explore community blogs.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                to="/blogs"
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-500 ease-in-out shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                Browse All Blogs
                            </Link>

                            {authStatus ? (
                                <Link
                                    to="/add-post"
                                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-all duration-500 ease-in-out flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Article
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-all duration-500 ease-in-out flex items-center gap-2"
                                >
                                    Login to Publish
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Dashboard Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all duration-500 ease-in-out">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold uppercase text-slate-400">Total Publications</span>
                            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </span>
                        </div>
                        <h3 className="text-3xl font-extrabold text-white mb-1">{posts.length}</h3>
                        <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Active community repository
                        </p>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all duration-500 ease-in-out">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold uppercase text-slate-400">Community Writers</span>
                            <span className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </span>
                        </div>
                        <h3 className="text-3xl font-extrabold text-white mb-1">120+</h3>
                        <p className="text-xs text-indigo-400 flex items-center gap-1 font-medium">
                            Global contributors
                        </p>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all duration-500 ease-in-out">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold uppercase text-slate-400">Monthly Reads</span>
                            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </span>
                        </div>
                        <h3 className="text-3xl font-extrabold text-white mb-1">45.2k</h3>
                        <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                            +18.4% from last month
                        </p>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-all duration-500 ease-in-out">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold uppercase text-slate-400">System Uptime</span>
                            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </span>
                        </div>
                        <h3 className="text-3xl font-extrabold text-white mb-1">99.99%</h3>
                        <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                            All API services operational
                        </p>
                    </div>
                </div>

                {/* Explorer & Feed Section */}
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Available Blogs &amp; Articles</h2>
                            <p className="text-slate-400 text-sm mt-1">Browse all published content from the community feed.</p>
                        </div>

                        {/* Search and Quick Filters */}
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="relative w-full sm:w-64">
                                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Filter by title..."
                                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500 ease-in-out"
                                />
                            </div>

                            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveTab(cat)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-500 ease-in-out cursor-pointer ${
                                            activeTab === cat
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Posts Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="h-64 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse p-4" />
                            ))}
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredPosts.map((post) => (
                                <div key={post.$id} className="transition-all duration-500 ease-in-out hover:-translate-y-1">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8">
                            <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">No blogs available yet</h3>
                            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
                                Publish your first blog post to populate your SaaS dashboard feed.
                            </p>
                            <Link
                                to="/add-post"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-500 ease-in-out shadow-lg shadow-indigo-600/30"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create First Article
                            </Link>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Dashboard

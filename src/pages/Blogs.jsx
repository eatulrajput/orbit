import React, { useState, useEffect } from 'react'
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

function Blogs() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const authStatus = useSelector((state) => state.auth.status)

    const categories = ['All', 'Engineering', 'Product', 'Design', 'Tutorials', 'News']

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
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 py-12 font-sans">
            <Container>
                {/* Header Banner */}
                <div className="mb-10 text-center max-w-3xl mx-auto space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                        Public Community Hub
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Explore All Community Blogs
                    </h1>
                    <p className="text-slate-400 text-base leading-relaxed">
                        Discover insightful technical posts, guides, and updates published by creators across the Orbit ecosystem. Free for everyone to read.
                    </p>
                </div>

                {/* Search & Category Filter Bar */}
                <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm">
                    {/* Search Input */}
                    <div className="relative w-full md:w-96">
                        <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search blogs by title..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500 ease-in-out"
                        />
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-500 ease-in-out cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                        : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
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
                    <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
                        <div className="w-16 h-16 bg-slate-900 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No blogs found</h3>
                        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                            {searchQuery ? `No posts matched "${searchQuery}". Try searching with different keywords.` : "Be the first author to publish an article on Orbit!"}
                        </p>
                        <Link
                            to={authStatus ? "/add-post" : "/login"}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-500 ease-in-out shadow-lg shadow-indigo-600/30"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {authStatus ? "Create a Post" : "Sign In to Publish"}
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Blogs

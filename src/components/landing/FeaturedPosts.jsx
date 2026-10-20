import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import appwriteService from '../../appwrite/config'
import { Container, PostCard } from '../index'
import { samplePosts } from '../../data/landingData'
import {
    containerVariants,
    cardScaleVariant,
    easeVercel,
    springBouncy,
    springSnappy,
} from '../../constants/motion'

function FeaturedPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

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
    )
}

export default FeaturedPosts

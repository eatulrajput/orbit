import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const samplePostsMap = {
    "demo-1": {
        $id: "demo-1",
        title: "Building High-Performance React Applications with Vite & Redux",
        content: `
            <p>Modern React application design emphasizes zero-lag state mutations, fast hot module replacement (HMR), and clean architecture.</p>
            <h3>Key Performance Strategies</h3>
            <ul>
                <li><strong>Vite Bundling:</strong> Lightning fast dev server cold-starts with ES modules.</li>
                <li><strong>Redux Toolkit:</strong> Predictable global state management using slice reducers and memoized selectors.</li>
                <li><strong>Glassmorphic UI Design:</strong> Tailored Tailwind CSS dark mode tokens with sleek backdrop filters.</li>
            </ul>
            <p>By leveraging Appwrite backend services for authentication and database management, engineering teams can build production-ready platforms in record time.</p>
        `,
        featuredImage: "",
        status: "active"
    },
    "demo-2": {
        $id: "demo-2",
        title: "Designing Modern Dark Mode UIs with Glassmorphism and Tailwind CSS",
        content: `
            <p>Creating dark-first user interfaces requires careful contrast management, vibrant gradient highlights, and rich visual depth.</p>
            <h3>Core Aesthetics Guidelines</h3>
            <p>Avoid solid black backgrounds in favor of deep obsidian tones like <code>#020617</code> (slate-950). Combine translucent borders (<code>border-slate-800/80</code>) with subtle backdrop blur filters (<code>backdrop-blur-md</code>).</p>
            <blockquote>"Great typography and high-contrast color choices make technical documentation a joy to read."</blockquote>
        `,
        featuredImage: "",
        status: "active"
    },
    "demo-3": {
        $id: "demo-3",
        title: "Appwrite Cloud Architecture: Database Security & File Storage",
        content: `
            <p>Appwrite Cloud provides developers with secure authentication APIs, flexible JSON document collections, and storage bucket asset management.</p>
            <h3>Security & Storage Features</h3>
            <ul>
                <li>Document-level access control permissions (ACLs).</li>
                <li>Instant file preview generation with automatic image optimization.</li>
                <li>Real-time database subscription hooks.</li>
            </ul>
        `,
        featuredImage: "",
        status: "active"
    },
    "demo-4": {
        $id: "demo-4",
        title: "Mastering Rich Text Editors with TinyMCE Integration",
        content: `
            <p>Integrating rich text editors like TinyMCE enables technical creators to author structured articles with headings, code blocks, lists, and inline media.</p>
            <p>Using parsed HTML containers with custom CSS rules ensures content renders beautifully in dark mode interfaces.</p>
        `,
        featuredImage: "",
        status: "active"
    }
};

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            if (samplePostsMap[slug]) {
                setPost(samplePostsMap[slug]);
                return;
            }

            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                    const imageId = fetchedPost.featuredImage || fetchedPost.featuredimage || fetchedPost.featured_image;
                    if (imageId) {
                        const url = appwriteService.getFilePreview(imageId);
                        setImgSrc(url);
                    }
                } else if (samplePostsMap[slug]) {
                    setPost(samplePostsMap[slug]);
                } else {
                    navigate("/");
                }
            }).catch(() => {
                if (samplePostsMap[slug]) {
                    setPost(samplePostsMap[slug]);
                } else {
                    navigate("/");
                }
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        const imageId = post?.featuredImage || post?.featuredimage || post?.featured_image;
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                if (imageId) appwriteService.deleteFile(imageId);
                navigate("/");
            }
        });
    };

    const handleImageError = () => {
        const imageId = post?.featuredImage || post?.featuredimage || post?.featured_image;
        if (imageId && imgSrc) {
            const fallbackViewUrl = appwriteService.getFileView(imageId);
            if (fallbackViewUrl && imgSrc !== fallbackViewUrl) {
                setImgSrc(fallbackViewUrl);
                return;
            }
        }
        setImageError(true);
    };

    return post ? (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 py-12 font-sans">
            <Container>
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    {/* Top Action / Back Link & Author Controls */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to All Blogs
                        </Link>

                        {isAuthor && (
                            <div className="flex items-center gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer">
                                        Edit Article
                                    </button>
                                </Link>
                                <button
                                    onClick={deletePost}
                                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                                >
                                    Delete Article
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Article Header & Title */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            Published Article
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    {/* Featured Image Cover Banner */}
                    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                        {!imageError && imgSrc ? (
                            <img
                                src={imgSrc}
                                alt={post.title}
                                onError={handleImageError}
                                className="w-full max-h-[520px] object-cover"
                            />
                        ) : (
                            <div className="w-full h-64 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center p-8 text-center">
                                <div className="space-y-2">
                                    <svg className="w-12 h-12 text-indigo-400/50 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs text-slate-500 font-mono block">Orbit Featured Cover</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Article Content Container */}
                    <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-sm shadow-xl">
                        <div className="browser-css">
                            {parse(post.content || "")}
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    ) : null;
}

import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 py-10 font-sans">
      <Container>
        {/* Header Card */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 border border-slate-800/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-3">
              Content Studio
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Create New Article
            </h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Craft and publish high-quality technical posts, guides, or updates to the Orbit community feed.
            </p>
          </div>
        </div>

        {/* Post Form Container */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost
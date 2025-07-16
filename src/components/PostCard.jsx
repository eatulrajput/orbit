import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg duration-200">
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg md:text-xl font-semibold text-white line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard

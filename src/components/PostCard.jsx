import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard(props) {
  const { $id, title } = props
  const imageId = props.featuredImage || props.featuredimage || props.featured_image
  const [imageError, setImageError] = useState(false)
  const [imgSrc, setImgSrc] = useState("")

  useEffect(() => {
    if (imageId) {
      const url = appwriteService.getFilePreview(imageId)
      setImgSrc(url)
    }
  }, [imageId])

  const handleImageError = () => {
    if (imageId && imgSrc) {
      const fallbackViewUrl = appwriteService.getFileView(imageId)
      if (fallbackViewUrl && imgSrc !== fallbackViewUrl) {
        setImgSrc(fallbackViewUrl)
        return
      }
    }
    setImageError(true)
  }

  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-slate-700 hover:shadow-xl group">
        <div className="w-full aspect-video overflow-hidden bg-slate-950 flex items-center justify-center relative">
          {!imageError && imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-slate-900 flex items-center justify-center p-4">
              <svg className="w-8 h-8 text-indigo-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-base md:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard

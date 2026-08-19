import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header, Logo } from './components'
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const [exiting, setExiting] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
          if (secret && userId) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setExiting(true)
        setTimeout(() => {
          setLoading(false)
        }, 700)
      })
  }, [location.search, location.pathname])

  return (
    <>
      {/* VERCEL-STYLE INTRO PRELOADER */}
      {loading && (
        <div className={`fixed inset-0 z-50 bg-[#050505] text-slate-100 flex flex-col items-center justify-center transition-all duration-700 ease-vercel ${
          exiting ? 'opacity-0 scale-[0.97] -translate-y-4 pointer-events-none' : 'opacity-100 scale-100 translate-y-0'
        }`}>
          {/* Top Vercel 1px Laser Beam */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/80 to-transparent animate-laser pointer-events-none" />

          {/* Vercel Ambient Spotlight */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-8">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl">
              <Logo width="160px" />
            </div>

            {/* Vercel Monospaced Status Indicator */}
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ORBIT ENGINE</span>
              <span className="text-slate-600">•</span>
              <span className="text-indigo-400">INITIALIZING</span>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <div className="min-h-screen flex flex-wrap content-between animate-vercel-reveal">
          <div className="w-full block">
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default App

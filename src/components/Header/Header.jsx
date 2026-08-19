import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: authStatus,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'Dashboard',
      slug: '/dashboard',
      active: authStatus,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      )
    },
    {
      name: 'Blogs',
      slug: '/blogs',
      active: authStatus,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      )
    },
  ]

  const isActiveRoute = (slug) => {
    if (slug === '/' && location.pathname === '/') return true
    if (slug !== '/' && location.pathname.startsWith(slug)) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all duration-500 ease-in-out">
      <Container>
        <nav className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800/80 p-1.5 rounded-2xl shadow-inner">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-500 ease-in-out cursor-pointer ${
                      isActiveRoute(item.slug)
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {authStatus ? (
              <>
                <Link
                  to="/add-post"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-all duration-500 ease-in-out shadow-md shadow-indigo-600/30"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Post
                </Link>
                <LogoutBtn />
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors duration-500 ease-in-out cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-all duration-500 ease-in-out shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl focus:outline-none transition-colors duration-500 ease-in-out"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-lg rounded-b-2xl animate-in fade-in slide-in-from-top-2 duration-500 ease-in-out">
            <div className="flex flex-col gap-2 px-2">
              {navItems.map((item) =>
                item.active ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-500 ease-in-out ${
                      isActiveRoute(item.slug)
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ) : null
              )}

              <div className="pt-3 mt-2 border-t border-slate-800/80 flex flex-col gap-2">
                {authStatus ? (
                  <>
                    <Link
                      to="/add-post"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md transition-all duration-500 ease-in-out"
                    >
                      + Create Post
                    </Link>
                    <div className="flex justify-end pt-1">
                      <LogoutBtn />
                    </div>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigate('/login')
                        setMobileMenuOpen(false)
                      }}
                      className="w-1/2 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-xs rounded-xl transition-all duration-500 ease-in-out"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        navigate('/signup')
                        setMobileMenuOpen(false)
                      }}
                      className="w-1/2 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl transition-all duration-500 ease-in-out"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
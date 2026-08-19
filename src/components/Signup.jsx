import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [authMode, setAuthMode] = useState("magic") // "magic" or "password"
    const [magicSent, setMagicSent] = useState(false)
    const [magicLoading, setMagicLoading] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login({ userData: currentUser }));
                navigate("/dashboard")
            }
        } catch (error) {
            setError(error.message || "Failed to create account. Please try again.")
        }
    }

    const handleMagicLink = async (data) => {
        setError("")
        setMagicLoading(true)
        try {
            await authService.sendMagicLink(data.email)
            setMagicSent(true)
        } catch (err) {
            setError(err.message || "Failed to send magic link. Please check your email.")
        } finally {
            setMagicLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex font-sans overflow-hidden">
            
            {/* LEFT 50% HALF: Visual Unsplash Imagery, Logo & Big Hero Fonts */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 flex-col justify-between p-12 overflow-hidden">
                {/* Background Unsplash Tech Photo */}
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
                    alt="Orbit Platform Visual"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                
                {/* Dark Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />

                {/* Ambient Glow */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

                {/* Top Brand Logo Header */}
                <div className="relative z-10">
                    <Link to="/" className="inline-block">
                        <Logo />
                    </Link>
                </div>

                {/* Middle Big Hero Typography */}
                <div className="relative z-10 my-auto py-8 max-w-xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Join 10,000+ Technical Authors
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                        Start Publishing Technical Articles in <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Seconds</span>
                    </h1>

                    <p className="text-slate-400 text-base leading-relaxed">
                        Orbit provides enterprise-grade rich text editing, global edge distribution, and built-in community discovery.
                    </p>
                </div>

                {/* Bottom Testimonial Overlay Card */}
                <div className="relative z-10 max-w-lg bg-slate-900/80 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl shadow-2xl space-y-4">
                    <p className="text-sm font-medium text-slate-200 leading-relaxed italic">
                        &ldquo;Creating an account on Orbit took less than a minute. It is by far the cleanest technical publishing studio available today.&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                            SK
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-white">Sarah Chen</h4>
                            <p className="text-[11px] text-slate-400">Principal Architect at CloudNative</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT 50% HALF: Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    
                    {/* Header Title */}
                    <div className="space-y-2">
                        <div className="lg:hidden mb-4">
                            <Link to="/" className="inline-block">
                                <Logo />
                            </Link>
                        </div>
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
                        <p className="text-sm text-slate-400">
                            Already have an account?&nbsp;
                            <Link
                                to="/login"
                                className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-500 ease-in-out"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>

                    {/* Mode Segmented Toggle Pill (Clean SVG Icons) */}
                    <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner">
                        <button
                            type="button"
                            onClick={() => { setAuthMode("magic"); setError(""); setMagicSent(false); }}
                            className={`w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all duration-500 ease-in-out cursor-pointer flex items-center justify-center gap-2 ${
                                authMode === "magic"
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Magic Link
                        </button>
                        <button
                            type="button"
                            onClick={() => { setAuthMode("password"); setError(""); }}
                            className={`w-1/2 py-2.5 text-xs font-bold rounded-xl transition-all duration-500 ease-in-out cursor-pointer flex items-center justify-center gap-2 ${
                                authMode === "password"
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Password
                        </button>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
                            <p className="text-xs text-rose-400 font-medium">{error}</p>
                        </div>
                    )}

                    {/* MAGIC LINK FORM MODE */}
                    {authMode === "magic" ? (
                        <div className="space-y-4">
                            {magicSent ? (
                                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-3">
                                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-base font-bold text-white">Magic Link Sent!</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        Check your email inbox. Click the instant sign-in button inside the email to enter Orbit.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setMagicSent(false)}
                                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline pt-1 block mx-auto"
                                    >
                                        Resend Magic Link
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(handleMagicLink)} className="space-y-5">
                                    <Input
                                        label="Email Address"
                                        placeholder="you@example.com"
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required.",
                                            validate: {
                                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                    "Email address must be a valid email.",
                                            }
                                        })}
                                    />

                                    <Button
                                        type="submit"
                                        disabled={magicLoading}
                                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-500 ease-in-out shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                        {magicLoading ? "Sending Magic Link..." : "Send Magic Registration Link"}
                                    </Button>
                                </form>
                            )}
                        </div>
                    ) : (
                        /* PASSWORD FORM MODE */
                        <form onSubmit={handleSubmit(create)} className="space-y-4">
                            <div>
                                <Input
                                    label="Full Name"
                                    placeholder="John Doe"
                                    {...register("name", {
                                        required: "Full name is required.",
                                    })}
                                />
                                {errors.name && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.name.message}</p>}
                            </div>

                            <div>
                                <Input
                                    label="Email Address"
                                    placeholder="you@example.com"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required.",
                                        validate: {
                                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Email address must be a valid email.",
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.email.message}</p>}
                            </div>

                            <div>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required.",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters."
                                        }
                                    })}
                                />
                                {errors.password && <p className="text-xs text-rose-400 mt-1 font-medium">{errors.password.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-500 ease-in-out shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Create Account
                            </Button>
                        </form>
                    )}

                </div>
            </div>

        </div>
    )
}

export default Signup
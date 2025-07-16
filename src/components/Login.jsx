import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
            className='min-h-screen flex items-center justify-center font-mono'
        >
            <div className={`mx-auto w-full max-w-lg bg-gradient-to-br from-slate-500 to-zinc-800 rounded-xl p-10 border border-white/10`}>
                <div className="flex justify-center text-4xl mb-16">
                    <span className="flex w-full mx-auto justify-center text-white">
                        <Logo />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-medium leading-tight text-white">Sign in to your account</h2>
                <p className="mt-2 mb-4 text-center text-base text-white/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline hover:text-blue-300"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5 text-white text-xl'>
                        <Input
                            placeholder="Enter your email."
                            type="email"
                            {...register("email", {
                                required: "Please enter your email.",
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            type="password"
                            placeholder="Enter your password."
                            {...register("password", {
                                required: "Please enter your password",
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full hover:bg-black"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
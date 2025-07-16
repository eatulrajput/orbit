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
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center font-mono">
            <div className={`mx-auto w-full max-w-lg bg-gradient-to-br from-slate-500 to-zinc-800 rounded-xl p-10 border border-white/10`}>
                <div className="flex justify-center text-4xl mb-16">
                    <span className="flex w-full mx-auto justify-center text-white">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-medium leading-tight text-white">Join today!</h2>
                <p className="mt-2 mb-4 text-center text-base text-white/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline hover:text-blue-300"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5 text-white text-xl'>
                        <Input
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: "Please enter your full name.",
                            })}
                        />
                        {errors.name && <p className="text-white">{errors.name.message}</p>}


                        <Input
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Please enter your email.",
                                validate: {
                                    isValidEmail: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }

                            })}
                        />
                        {errors.email && <p className="text-white">{errors.email.message}</p>}


                        <Input
                            type="password"
                            placeholder="Please enter your password"
                            {...register("password", {
                                required: "Create a strong password.",
                            })}
                        />
                        {errors.password && <p className="text-white">{errors.password.message}</p>}


                        <Button type="submit" className="w-full hover:bg-black">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup
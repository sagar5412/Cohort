"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthPageProps {
    isSignin: boolean;
}



interface Input {
    name: string;
    email: string;
    password: string;
}

export function AuthPage({ isSignin }: AuthPageProps) {
    const [inputs, setInputs] = useState<Input>({
        name: "",
        email: "",
        password: "",
    });
    const router = useRouter();
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${BACKEND_URL}/${isSignin ? "signin" : "signup"}`,
                {
                    email: inputs.email,
                    password: inputs.password,
                    name: inputs.name
                }
            );

            const token = res.data.token;
            localStorage.setItem("token", token);

            router.push("/dashboard")
        } catch (e) {
            alert("Error while signing in");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl ring-1 ring-gray-900/5">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        {isSignin ? "Welcome back" : "Create an account"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isSignin
                            ? "Sign in to access your account"
                            : "Sign up to get started with our platform"}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        {!isSignin && (
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                        placeholder="John Doe"
                                        value={inputs.name}
                                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="email-address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    placeholder="you@example.com"
                                    value={inputs.email}
                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    placeholder="••••••••"
                                    value={inputs.password}
                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            {isSignin ? "Sign in" : "Sign up"}
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        {isSignin ? "Don't have an account? " : "Already have an account? "}
                        <Link
                            href={isSignin ? "/signup" : "/signin"}
                            className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors duration-200"
                        >
                            {isSignin ? "Sign up" : "Sign in"}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../utils/cn";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconChevronLeft,
} from "@tabler/icons-react";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import {useRouter} from "next/navigation";
// import {redirect} from "next/navigation";

export default function Form() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const router = useRouter();
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.endsWith("@duk.ac.in")) {
            setError("Email must end with '@duk.ac.in'.");
            return;
        }

        if (formData.email.length < 12) {
            setError("Seems like you have a mistake in the email address.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                router.push("/login");

                // redirect("/login");
            } else {
                setError(`Registration failed: ${data.message}`);
            }
        } catch (error) {
            console.error("Failed to register:", error);
            setError("An error occurred during registration.");
        }
    };

    const handleCloseAlert = () => {
        setError(null);
    };

    return (
        <section className="bg-white dark:bg-black">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <Image
                        height={1200}
                        width={1100}
                        alt=""
                        src="https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>
                <main className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black flex flex-col justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="mb-4 text-sm">
                        <Link
                            href="/"
                            className="flex space-x-2 w-fit items-center"
                        >
                            <IconChevronLeft />
                            <span>Back to home</span>
                        </Link>
                    </div>
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        Join Our Community Today!
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Sign up now to access lab equipments, activity points,
                        and other opportunities for innovation.
                    </p>

                    <form className="my-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                            <LabelInputContainer>
                                <Label htmlFor="firstname">First name</Label>
                                <Input
                                    id="firstname"
                                    name="firstName"
                                    placeholder="Nikola"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required={true}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="lastname">Last name</Label>
                                <Input
                                    id="lastname"
                                    name="lastName"
                                    placeholder="Tesla"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </LabelInputContainer>
                        </div>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">DUK email</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="nikola.tesla@duk.ac.in"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required={true}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="confirmpassword">
                                Confirm your password
                            </Label>
                            <Input
                                id="confirmpassword"
                                name="confirmPassword"
                                placeholder="••••••••"
                                type="confirmpassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                        >
                            Sign up &rarr;
                            <BottomGradient />
                        </button>
                    </form>
                    {error && (
                        <Alert variant="destructive" className="bg-white">
                            <AlertCircle className="h-4 w-4" />
                            <div className="flex justify-between">
                                <AlertTitle>Error</AlertTitle>
                                <X
                                    className="cursor-pointer"
                                    onClick={handleCloseAlert}
                                />
                            </div>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </main>
            </div>
        </section>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

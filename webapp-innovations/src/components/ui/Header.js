"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./navigation-menu";
import { Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const { data: session, status, update } = useSession();
    return (
        <header className="h-[10%]">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <a className="block text-teal-600" href="#">
                            <span className="sr-only">Home</span>
                            <Image
                                src={"/logo.png"}
                                // width="auto"
                                // height="auto"
                                width={80}
                                height={80}
                                alt="Logo"
                            ></Image>
                        </a>
                    </div>

                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href="/about" legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            About
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link
                                        href="/profile"
                                        legacyBehavior
                                        passHref
                                    >
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            My Space
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                {/* <NavigationMenuItem>
                                    <Link
                                        href="/gallery"
                                        legacyBehavior
                                        passHref
                                    >
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Gallery
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem> */}
                                {/* <NavigationMenuItem>
                                    <Link
                                        href="/gallery"
                                        legacyBehavior
                                        passHref
                                    >
                                        <NavigationMenuLink
                                            className={navigationMenuTriggerStyle()}
                                        >
                                            Events
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem> */}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="flex items-center gap-4">
                        {session ? (
                            <div className="sm:flex sm:gap-4">
                                <button
                                    className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
                                    onClick={() => signOut()}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="sm:flex sm:gap-4">
                                <Link href={"/login"}>
                                    <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
                                        Login
                                    </button>
                                </Link>

                                <div className="hidden sm:flex">
                                    <Link href={"register"}>
                                        <button className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md font-light transition duration-200 ease-linear">
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className="block md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shrink-0 md:hidden"
                                    >
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">
                                            Toggle navigation menu
                                        </span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right">
                                    <nav className="grid gap-6 text-lg font-medium">
                                        <Link
                                            href="#"
                                            className="flex items-center gap-2 text-lg font-semibold"
                                        >
                                            <Menu className="h-6 w-6" />
                                            <span className="sr-only">
                                                Innovation Club, DUK
                                            </span>
                                        </Link>
                                        <Link
                                            href="/about"
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            About
                                        </Link>
                                        <Link
                                            href="/profile"
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            My Space
                                        </Link>
                                        <Link
                                            href="/gallery"
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            Gallery
                                        </Link>
                                        <Link
                                            href="/events"
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            Events
                                        </Link>
                                        <Link
                                            href="register"
                                            className="text-muted-foreground hover:text-foreground"
                                        >
                                            Register
                                        </Link>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

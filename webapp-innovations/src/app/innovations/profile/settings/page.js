"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CircleUser, Menu, Package2, Search, Shield, User } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Input } from "../../../components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../../components/ui/sheet";

export default function Settings() {
    const [option, setOption] = useState(0);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Innovation Club, DUK</span>
                    </Link>
                    <Link
                        href="/profile"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        MySpace
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Points
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Transactions
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Settings
                    </Link>
                </nav>
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
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">
                                    Innovation Club, DUK
                                </span>
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                MySpace
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Points
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Transactions
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search anything..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            /> */}
                        </div>
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <div className="flex space-x-2 md:space-x-0">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">
                                        Toggle options menu
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav
                                    className="grid gap-4 text-sm text-muted-foreground"
                                    x-chunk="dashboard-04-chunk-0"
                                >
                                    <Link
                                        href="#"
                                        className={
                                            option === 0
                                                ? "font-semibold text-primary flex items-center"
                                                : "flex items-center"
                                        }
                                        onClick={() => setOption(0)}
                                    >
                                        <User width={15} className="mr-1" />
                                        General
                                    </Link>
                                    <Link
                                        href="#"
                                        className={
                                            option === 1
                                                ? "font-semibold text-primary flex items-center"
                                                : "flex items-center"
                                        }
                                        onClick={() => setOption(1)}
                                    >
                                        <Shield width={15} className="mr-1" />
                                        Security
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-3xl font-semibold">Settings</h1>
                    </div>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="hidden md:grid gap-4 text-sm text-muted-foreground"
                        x-chunk="dashboard-04-chunk-0"
                    >
                        <Link
                            href="#"
                            className={
                                option === 0
                                    ? "font-semibold text-primary flex items-center"
                                    : "flex items-center"
                            }
                            onClick={() => setOption(0)}
                        >
                            <User width={15} className="mr-1" />
                            General
                        </Link>
                        <Link
                            href="#"
                            className={
                                option === 1
                                    ? "font-semibold text-primary flex items-center"
                                    : "flex items-center"
                            }
                            onClick={() => setOption(1)}
                        >
                            <Shield width={15} className="mr-1" />
                            Security
                        </Link>
                    </nav>

                    <div className="grid gap-6">
                        {option === 0 ? (
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>Profile</CardTitle>
                                    <CardDescription>
                                        Edit your profile information here.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form className="md:w-3/4 lg:w-2/3 space-y-2">
                                        <div className="md:flex md:space-x-2">
                                            <Input placeholder="First name" />
                                            <Input placeholder="Last name" />
                                        </div>
                                        <Input placeholder="Phone" />
                                    </form>
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4">
                                    <Button>Update</Button>
                                </CardFooter>
                            </Card>
                        ) : option === 1 ? (
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>Change password</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form className="md:w-3/4 lg:w-2/3 space-y-2">
                                        <Input placeholder="Current password" />
                                        <Input placeholder="New password" />
                                        <Input placeholder="Confirm password" />
                                    </form>
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4">
                                    <Button>Update</Button>
                                </CardFooter>
                            </Card>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

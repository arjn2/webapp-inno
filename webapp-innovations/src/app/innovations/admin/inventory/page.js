"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    CircleUser,
    Menu,
    Package,
    Shield,
    Component,
    Home,
    CirclePlus,
    ArrowLeftRight,
} from "lucide-react";
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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../../components/ui/pagination";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "../../../components/ui/sheet";
import { useSession, signOut } from "next-auth/react";

export default function Profile() {
    const [option, setOption] = useState(0);
    const [error, setError] = useState(null);
    const [openSheet, setOpenSheet] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [activityFormData, setActivityFormData] = useState({
        name: "",
        date: "",
        time: "",
        desc: "",
        points: "",
        type: "",
    });
    const activityStatus = {
        0: "Pending",
        1: "Completed",
    };
    const [activities, setActivities] = useState([]);
    const { data: session, status, update } = useSession();

    useEffect(() => {
        async function fetchActivities() {
            const response = await fetch("/api/fetch/activities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ page, pageSize }),
            });
            const data = await response.json();
            setActivities(data.activities);
            setTotal(data.total);
        }

        fetchActivities();
    }, [page,pageSize, isSubmitted]);

    const totalPages = Math.ceil(total / pageSize);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivityFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/add/activity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(activityFormData),
            });

            const data = await response.json();

            if (response.ok) {
                setOpenSheet(false);
                setIsSubmitted(!isSubmitted);
                setActivityFormData({
                    name: "",
                    date: "",
                    time: "",
                    desc: "",
                    points: "",
                    type: "",
                });
            } else {
                setError(`Operation failed: ${data.message}`);
            }
        } catch (error) {
            console.error("Operation failed:", error);
            setError("An error occurred during the operation.");
        }
    };

    if (status === "loading") {
        return (
            <>
                <div className="h-screen w-screen flex justify-center items-center">
                    Authenticating...
                </div>
            </>
        );
    }
    if (!session || session.user.privilege != 0) {
        return (
            <>
                <div className="h-screen w-screen flex justify-center items-center">
                    You are not authorized!!!
                </div>
            </>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package className="h-6 w-6 text-cyan-800" />
                        <span className="sr-only">Innovation Club, DUK</span>
                    </Link>
                    <Link
                        href="/profile"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        AdminPanel
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Points
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Inventory
                    </Link>
                    <Link
                        href="/innovations/admin/settings"
                        className="text-muted-foreground transition-colors hover:text-foreground"
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
                                <Package className="h-6 w-6 text-orange-500" />
                                <span className="sr-only">
                                    Innovation Club, DUK
                                </span>
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                AdminPanel
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
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
                                        <Home width={15} className="mr-1" />
                                        Home
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
                                        Transactions
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <div className="flex items-center space-x-2">
                            <Package className="h-6 w-6 text-cyan-800"></Package>
                            <span className="text-3xl font-semibold">
                                Inventory
                            </span>
                        </div>
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
                            <Home width={15} className="mr-1" />
                            Home
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
                            <ArrowLeftRight width={15} className="mr-1" />
                            Transactions
                        </Link>
                    </nav>

                    <div className="grid gap-6">
                        {option === 0 ? (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div>
                                        <CardTitle className="text-sm font-medium">
                                            Inventory status
                                        </CardTitle>
                                        <CardDescription>
                                            Current issue register status
                                        </CardDescription>
                                    </div>
                                    <Component className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold flex items-center ">
                                        45 components pending return
                                        {/* <Component className="h-5 w-5 ml-1" /> */}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        20 transactions this month
                                    </p>
                                </CardContent>
                            </Card>
                        ) : option === 1 ? (
                            <Card>
                                <CardHeader className="px-7 flex flex-row justify-between">
                                    <div>
                                        <CardTitle>
                                            Recent transactions
                                        </CardTitle>
                                        <CardDescription>
                                            Recent list of components issued
                                        </CardDescription>
                                    </div>

                                    <Sheet
                                        open={openSheet}
                                        onOpenChange={setOpenSheet}
                                    >
                                        <SheetTrigger>
                                            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                                <CirclePlus className="pr-1" />
                                                Add transaction
                                            </div>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>
                                                    Add activity
                                                </SheetTitle>
                                                <SheetDescription>
                                                    Add a new activity
                                                </SheetDescription>
                                            </SheetHeader>
                                            <div className="py-4">
                                                <Label
                                                    htmlFor="name"
                                                    className=""
                                                >
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={
                                                        activityFormData.name
                                                    }
                                                    placeholder="Activity name"
                                                    className="col-span-3"
                                                    onChange={handleChange}
                                                />
                                                <Label
                                                    htmlFor="username"
                                                    className=""
                                                >
                                                    Date
                                                </Label>
                                                <Input
                                                    id="date"
                                                    name="date"
                                                    type="date"
                                                    value={
                                                        activityFormData.date
                                                    }
                                                    placeholder="Activity name"
                                                    className="col-span-3"
                                                    onChange={handleChange}
                                                />
                                                <Label
                                                    htmlFor="username"
                                                    className=""
                                                >
                                                    Time
                                                </Label>
                                                <Input
                                                    id="time"
                                                    name="time"
                                                    type="time"
                                                    value={
                                                        activityFormData.time
                                                    }
                                                    placeholder="Activity name"
                                                    className="col-span-3"
                                                    onChange={handleChange}
                                                />
                                                <Label
                                                    htmlFor="username"
                                                    className=""
                                                >
                                                    Description
                                                </Label>
                                                <Textarea
                                                    name="desc"
                                                    value={
                                                        activityFormData.desc
                                                    }
                                                    onChange={handleChange}
                                                />
                                                <Label
                                                    htmlFor="username"
                                                    className=""
                                                >
                                                    Points
                                                </Label>
                                                <Input
                                                    id="points"
                                                    name="points"
                                                    type="number"
                                                    value={
                                                        activityFormData.points
                                                    }
                                                    placeholder="Activity points"
                                                    className="col-span-3"
                                                    onChange={handleChange}
                                                />
                                                <Label
                                                    htmlFor="username"
                                                    className=""
                                                >
                                                    Type
                                                </Label>
                                                <Input
                                                    id="type"
                                                    name="type"
                                                    type="text"
                                                    value={
                                                        activityFormData.type
                                                    }
                                                    placeholder="Activity type"
                                                    className="col-span-3"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <SheetFooter>
                                                <SheetClose asChild>
                                                    <Button
                                                        type="submit"
                                                        onClick={handleSubmit}
                                                    >
                                                        Add activity
                                                    </Button>
                                                </SheetClose>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Item</TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Type
                                                </TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Status
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Date Issued
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Date Returned
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {activities.map((activity) => (
                                                <TableRow
                                                    key={activity.id}
                                                    className="bg-accent"
                                                >
                                                    <TableCell>
                                                        {activity.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="font-medium">
                                                            {activity.name}
                                                        </div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {
                                                                activity.description
                                                            }
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {activity.type}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {
                                                            activityStatus[
                                                                activity.status
                                                            ]
                                                        }
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {new Date(
                                                            activity.activity_datetime
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {activity.points}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Pagination className="mt-4">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (page > 1)
                                                            setPage(page - 1);
                                                    }}
                                                />
                                            </PaginationItem>

                                            {[...Array(3).keys()].map(
                                                (index) => {
                                                    const pageNumber =
                                                        page + index - 1;
                                                    if (
                                                        pageNumber > 0 &&
                                                        pageNumber <= totalPages
                                                    ) {
                                                        return (
                                                            <PaginationItem
                                                                key={pageNumber}
                                                            >
                                                                <PaginationLink
                                                                    href="#"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        setPage(
                                                                            pageNumber
                                                                        );
                                                                    }}
                                                                    isActive={
                                                                        pageNumber ===
                                                                        page
                                                                    }
                                                                >
                                                                    {pageNumber}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        );
                                                    }
                                                    return null;
                                                }
                                            )}

                                            <PaginationItem>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (page < totalPages)
                                                            setPage(page + 1);
                                                    }}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </CardContent>
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

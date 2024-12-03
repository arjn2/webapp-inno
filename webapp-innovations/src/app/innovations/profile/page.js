"use client";

import ApplyAttendance from "./applyAttendance";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  CircleUser,
  Menu,
  Package2,
  Badge,
  Shield,
  Rocket,
  Coins,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
// import { Input } from "../../components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [option, setOption] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(2);
  const [total, setTotal] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const activityStatus = {
  //   0: "Pending",
  //   1: "Completed",
  // };
  const [user, setUser] = useState({});
  const [activities, setActivities] = useState([]);
  const [attendanceApplication, setAttendanceApplication] = useState([]);
  const [totalPoints, setTotalPoints] = useState([]);
  const [isChecked, setIsChecked] = useState(false)
  // const [showSwitch, setShowSwitch] = useState(false)

  const router = useRouter();
  const { data: session, status, update } = useSession();
  // console.log("Session:", session);
  // console.log("privilage:-", session.user.privilege);

  useEffect(() => {

    async function fetchUser(){
    if (status === "authenticated" && session.user) {
      const response = await fetch("/api/fetch/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: session.user.email }),
      });
      const data = await response.json();
      
      setUser(data.user);
      
    }

    }
    

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
      console.log("Activiites:", data);
      console.log(activities)

      setTotal(data.total);
    }

    async function fetchMyActivityPoints() {
      if (status === "authenticated" && session.user) {
        const userEmail = session.user.email;
        const response = await fetch("/api/fetch/totalPoints", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail }),
        });
        const data = await response.json();
        setTotalPoints(data.total_points);
        console.log("MyActivityPoints:", data);
        console.log("Total Points:", data.total_points);
        console.log(totalPoints);
        // setTotal(data.total_points);
      }
    }


    async function fetchMyActivities() {
      if (status === "authenticated" && session.user) {
        const userEmail = session.user.email;
        console.log(userEmail);
        const response = await fetch("/api/attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail, page, pageSize }),
        });
        const data = await response.json();
        // console.log("Data:", data);
        setAttendanceApplication(data.myActivities);
        setTotal(data.total);
      }
    }

    fetchActivities();

    if (status === "authenticated") {
      fetchUser();
      fetchMyActivities();
      fetchMyActivityPoints();
    }
  }, [page,pageSize, status, session, isSubmitted]);


  

  const totalPages = Math.ceil(total / pageSize);


  const handleSwitchChange = () => {
    setIsChecked(!isChecked)
    router.push("/admin/dashboard")
  }

  // if (!showSwitch) return null

  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("Logging out...");
    await signOut({callbackUrl: "/"});
    console.log("Redirecting to home...");
    router.push(" ");
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
  if (!session) {
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
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Innovation Club, DUK</span>
          </Link>
          <Link
            href="/profile"
            className="text-foreground transition-colors hover:text-foreground"
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
            href="/innovations/profile/settings"
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
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <LayoutDashboard className="h-6 w-6" />
                <span className="sr-only">Innovation Club, DUK</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/profile"
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
              <Link
                href="/innovations/profile/settings"
                className="text-muted-foreground hover:text-foreground"
              >
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
          {session && session.user.privilege === 1 && (
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                checked={isChecked}
                onCheckedChange={handleSwitchChange}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
              />
              <Label htmlFor="airplane-mode" className="text-black">Admin</Label>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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
                  <span className="sr-only">Toggle options menu</span>
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
                    <Rocket width={15} className="mr-1" />
                    Activities
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-3xl font-semibold">My Space</h1>
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
              <Rocket width={15} className="mr-1" />
              Activities
            </Link>
          </nav>

          <div className="grid gap-6">
            <div className="text-lg font-medium">Hi, {user.firstName}</div>
            {option === 0 ? (
              <div>
              
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium">
                      Total Points
                    </CardTitle>
                    <CardDescription>
                      Total points you acquired till date
                    </CardDescription>
                  </div>
                  <Coins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  
                  <div className="text-2xl font-bold flex items-center ">
                    {totalPoints}
                    {/* {attendanceApplication.map((application) => (
                      <p>{application.points}</p>
                    ))} */}
                    
                    <Coins className="h-5 w-5 ml-1" />
                  </div>
                  {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p> */}
                </CardContent>
              </Card>
              <div>
                  <h1 className="mt-6 mb-4 text-lg font-medium">
                    My Activities
                  </h1>
                </div>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription className="text-black">
                      Your recent activities with Innovation Club.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          {/* <TableHead>UserID</TableHead>
                          <TableHead>Session Email</TableHead>
                          <TableHead>User Email</TableHead> */}
                          <TableHead>Event/Activity</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Event ID
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Participation Type
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="text-right">Point(s)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceApplication.map((application) => (
                          <TableRow key={application.id} className="bg-accent">
                            <TableCell>{application.id}</TableCell>
                            {/* <TableCell>{application.user_id}</TableCell>
                            <TableCell>{session.user.email}</TableCell>
                            <TableCell>{application.user_email}</TableCell> */}
                            <TableCell>
                              <div className="font-medium">
                                {application.activity_name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {application.activity_id}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {application.participation_type}
                            </TableCell>

                            <TableCell className="hidden sm:table-cell">
                              {application.status}
                            </TableCell>
                            <TableCell className="text-right">
                              {application.points}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                        />
                      </PaginationItem>

                      {[...Array(5).keys()].map((index) => {
                        const pageNumber = page + index - 1;
                        if (pageNumber > 0 && pageNumber <= totalPages) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPage(pageNumber);
                                }}
                                isActive={pageNumber === page}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage(page + 1);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </Card>
              </div>
              
            ) : option === 1 ? (
              <div>
                <Card>
                  <CardHeader className="px-7 flex flex-row justify-between">
                    
                    <div>
                    <CardTitle>Activity List</CardTitle>
                    <CardDescription>
                      Recent activities from Innovation Club
                    </CardDescription>
                    </div>
                    
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Event/Activity</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>

                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activities.map((activity) => (
                          <TableRow key={activity.id} className="bg-accent">
                            <TableCell>{activity.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{activity.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {activity.description}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {activity.type}
                            </TableCell>
                            {/* <TableCell className="hidden sm:table-cell">
                              {activityStatus[activity.status]}
                            </TableCell> */}
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
                            if (page > 1) setPage(page - 1);
                          }}
                        />
                      </PaginationItem>

                      {[...Array(3).keys()].map((index) => {
                        const pageNumber = page + index - 1;
                        if (pageNumber > 0 && pageNumber <= totalPages) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPage(pageNumber);
                                }}
                                isActive={pageNumber === page}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage(page + 1);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                  </CardContent>
                </Card>
                <div className="mt-6 top-900 right-15">
                  <ApplyAttendance />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

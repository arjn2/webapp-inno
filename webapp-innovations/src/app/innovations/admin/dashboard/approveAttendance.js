"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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

import { useSession, signOut } from "next-auth/react";

export default function ApproveAttendance() {

    const [total, setTotal] = useState(0);
    const [pageSize] = useState(2);
    const [page, setPage] = useState(1);

  const [attendanceApplication, setAttendanceApplication] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchPendingActions() {
      try {
        const Response = await fetch(`/api/attendance/approve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page, pageSize }),
        });
        const data = await Response.json();
        // console.log("Fetched pending approvals:", data);
        setAttendanceApplication(data.attendanceApplication);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching pending approvals:", error);
      }
    }
    fetchPendingActions();
  }, [page,pageSize]);

  if (!session) {
    console.error("User is not authenticated");
    return;
  }

  const userEmail = session.user.email;
  console.log(userEmail);

  

  const totalPages = Math.ceil(total / pageSize);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const response = await fetch("/api/attendance/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: applicationId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        // Handle success (e.g., refresh the data or update the state)
        console.log("Status updated successfully");
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Pending Actions</h1>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Event/Activity</TableHead>
                <TableHead className="hidden sm:table-cell">Event ID</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Participation Type
                </TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="text-right">Point(s)</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceApplication.map((application) => (
                <TableRow key={application.id} className="bg-accent">
                  <TableCell>{application.id}</TableCell>
                  <TableCell>{application.user_email}</TableCell>
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
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleStatusChange(application.id, "approved")
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() =>
                          handleStatusChange(application.id, "rejected")
                        }
                      >
                        Reject
                      </Button>
                    </div>
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
    </div>
  );
}

import { executeQuery } from "../../../../utils/db";
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { id, status, page = 1, pageSize = 5 } = await request.json();

        if (id && status) {
            const result = await executeQuery(
                "UPDATE attendance_applications SET status = ? WHERE id = ?",
                [status, id]
            );
            executeQuery("SELECT SUM(points) AS total_points")

            if (result.affectedRows > 0) {

                
                return new Response(
                    JSON.stringify({ message: "Status updated successfully" }),
                    { status: 200, headers: { "Content-Type": "application/json" } }
                );
            } else {
                return new Response(
                    JSON.stringify({ message: "No record found" }),
                    { status: 404, headers: { "Content-Type": "application/json" } }
                );
            }
        };

        const offset = (page - 1) * pageSize;
        const attendanceApplication = await executeQuery(
            "SELECT id, user_id,user_email, activity_name, activity_id, participation_type, status, points FROM attendance_applications WHERE status = 'pending' ORDER BY id DESC LIMIT ? OFFSET ?",
            [pageSize.toString(), offset.toString()]
        );

        const totalApplications = await executeQuery(
            "SELECT COUNT(*) as total FROM attendance_applications WHERE status = 'pending'"
        );

        return new Response(
            JSON.stringify({
                attendanceApplication,
                total: totalApplications[0].total,
                page,
                pageSize
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );


    } catch (error) {
        return new Response(
            JSON.stringify({
                message: "Internal server error",
                error: error.message
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
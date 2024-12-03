import { executeQuery } from "../../../../utils/db";
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const rawResult = await executeQuery(
            `SELECT activity_id, type, point FROM participation_types ORDER BY id`
        );
        // console.log("-------------------");
        // console.log("Raw Result fetched:", rawResult);
        // console.log("-------------------");

        // Assuming rawResult is an array of rows
        const participationType = rawResult;
        // console.log("Part_Type processed:", participationType);

        return NextResponse.json(
            { participationType },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error executing query:", error);
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
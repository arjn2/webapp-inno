import bcrypt from "bcryptjs";
import { executeQuery } from "../../../utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { firstName, lastName, email, password } = await request.json();
    // console.log(firstName, lastName, email, password);

    if (!email || !password || !firstName) {
        return Response.json(
            { message: "All fields are required" },
            {
                status: 400,
            }
        );
    }

    try {
        // Check if the user already exists
        const users = await executeQuery(
            "SELECT email FROM users WHERE email = ?",
            [email]
        );

        if (users.length > 0) {
            return Response.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        await executeQuery(
            "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
            [firstName, lastName, email, hashedPassword]
        );

        return Response.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            {
                message: "Internal server error",
                error: error.message,
            },
            { status: 500 }
        );
    }
    // return NextResponse.json({ message: "success" });
}

import bcrypt from "bcryptjs";
import { executeQuery } from "../../../utils/db";
import jwt from "jsonwebtoken";

function generateToken(user) {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}

export async function POST(request) {
    const res = await request.json();
    const { email, password } = res;

    try {
        const user = await executeQuery(`SELECT * FROM users WHERE email = ?`, [
            email,
        ]);

        if (
            user.length > 0 &&
            (await bcrypt.compare(password, user[0].password))
        ) {
            await executeQuery(
                `UPDATE users SET last_logged_in = NOW() WHERE id = ?`,
                [user[0].id]
            );
            const { password, ...userDetails } = user[0];
            console.log(userDetails.email);
            const token = generateToken(userDetails);

            return Response.json(
                {
                    message: "Login successful",
                    user: userDetails,
                    auth: {
                        token: token,
                        token_type: "Bearer",
                        expires_in: 86400,
                    },
                },
                { status: 200 }
            );
        } else {
            return Response.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }
    } catch (error) {
        return Response.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

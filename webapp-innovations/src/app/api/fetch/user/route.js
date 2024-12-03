import { executeQuery } from "../../../../utils/db";

export async function POST(request) {
    const {userEmail}= await request.json();
    try{
        const user= await executeQuery("SELECT * FROM users WHERE email=?",[userEmail.toString()]);
        if (user) {
            return Response.json(
                { user: user[0] },
                { status: 200 }
            );
        }
    }
    catch (error) {
        return Response.json(
            {
                message: "Internal server error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
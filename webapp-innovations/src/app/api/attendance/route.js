import { executeQuery } from "../../../utils/db";

export async function POST(request) {
    
    const { userEmail, page = 1, pageSize = 5 } = await request.json();;
    const offset = (page - 1) * pageSize;

    // console.log(userEmail)

    try {
        const myActivities = await executeQuery(
            `SELECT * FROM attendance_applications WHERE user_email=? ORDER BY id DESC LIMIT ? OFFSET ?`,
            [userEmail.toString(), pageSize.toString(), offset.toString()]
        );

        // console.log("My Activities:",myActivities);

        const myTotalActivities = await executeQuery(
            "SELECT COUNT(*) as total FROM attendance_applications WHERE user_email=?",[userEmail.toString()]
        );

        

        if (myActivities) {
            return Response.json(
                { myActivities, total: myTotalActivities[0].total, page, pageSize },
                { status: 200 }
            );
        }
    } catch (error) {
        return Response.json(
            {
                message: "Internal server error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
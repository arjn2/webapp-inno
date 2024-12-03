import { executeQuery } from "../../../../utils/db";

export async function POST(request) {
    const { userEmail} = await request.json();

    try{
        const myTotalPoints= await executeQuery("SELECT SUM(points) AS total_points FROM attendance_applications WHERE user_email=? AND STATUS=? ",[userEmail.toString(),'approved']);
        

        if (myTotalPoints) {
            return Response.json(
                { total_points: myTotalPoints[0].total_points },
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
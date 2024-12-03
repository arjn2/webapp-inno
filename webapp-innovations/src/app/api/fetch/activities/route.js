import { executeQuery } from "../../../../utils/db";

export async function POST(request) {
    const res = await request.json();
    const { page = 1, pageSize = 5 } = res;
    const offset = (page - 1) * pageSize;

    try {
        const activities = await executeQuery(
            "SELECT * FROM activities ORDER BY id DESC LIMIT ? OFFSET ?",
            [pageSize.toString(), offset.toString()]
        );

        const totalActivities = await executeQuery(
            "SELECT COUNT(*) as total FROM activities"
        );

        if (activities) {
            return Response.json(
                { activities, total: totalActivities[0].total, page, pageSize },
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

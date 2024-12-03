import { executeQuery } from "../../../../utils/db";

export async function POST(request) {
  try {
    const { userEmail, activityId, participationType, date } =
      await request.json();

    if (!userEmail || !activityId || !participationType || !date) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    let userResult;
    try {
      userResult = await executeQuery(`SELECT id FROM users WHERE email = ?`, [
        userEmail,
      ]);

      if (userResult.length === 0) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return new Response(
        JSON.stringify({
          message: "Internal server error",
          error: error.message,
        }),
        { status: 500 }
      );
    }

    const userId = userResult[0].id;

    const activityName = await executeQuery(
      `SELECT name FROM activities WHERE id = ?`,
      [activityId]
    );
   
    try {
      const result = await executeQuery(
        `INSERT INTO attendance_applications (user_id, user_email, activity_id,activity_name, participation_type)
       VALUES (?,?, ?, ?, ?)`,
        [userId, userEmail, activityId, activityName[0].name, participationType]
      );

      await executeQuery(
        `UPDATE attendance_applications aa
       JOIN participation_types pt
       ON aa.participation_type = pt.type
       SET aa.points = pt.point`
      );

      // Return a success response
      return new Response(
        JSON.stringify({ message: "Attendance applied successfully", result }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error inserting attendance:", error);
      return new Response(
        JSON.stringify({
          message: "Internal server error",
          error: error.message,
        }),
        { status: 500 }
      );
    }
  } catch {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

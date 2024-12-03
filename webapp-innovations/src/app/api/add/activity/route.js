import bcrypt from "bcryptjs";
import { executeQuery } from "../../../../utils/db";
import jwt from "jsonwebtoken";

function generateToken(user) {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}

export async function POST(request) {
    const res = await request.json();
    const { name, date, time, desc, type, participationTypes } = res;
    console.log(res);

    try {
        const activityName = name || null;
    const activityDateTime = date && time ? `${date} ${time}:00` : null;
    const activityDesc = desc || null;
    const activityType = type || null;


        const result= await executeQuery(
            "INSERT INTO activities (name, created_at, activity_datetime, description, type) VALUES (?, NOW(), ?, ?, ?)",
            [activityName, activityDateTime,activityDesc, activityType ]
        );
        console.log("activity added to activities table");

        const activityId = result.insertId;

        for (const participationType of participationTypes) {
            const { type, point } = participationType;
      
            const participationTypeValue = type || null;
            const participationRewardValue = point || null;
            await executeQuery(
              "INSERT INTO participation_types (activity_id, type, point) VALUES (?, ?, ?)",
              [activityId, participationTypeValue, participationRewardValue]
            );
          };

          return new Response(
            JSON.stringify({ message: "Activity created successfully" }),
            { status: 200 }
          );
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error" }), {
          status: 500,
        });
      }
}

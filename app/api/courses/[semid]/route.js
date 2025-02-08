import { Course } from "@/models/course-model";
import connectMongo from "@/services/mongo/mongo";

import { NextResponse } from "next/server";

export async function GET(req, { params: { semid } }) {
  try {
    await connectMongo();

    // Fetch courses where semester ID matches the provided semid
    const courses = await Course.find({ semester: semid });

    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching courses",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

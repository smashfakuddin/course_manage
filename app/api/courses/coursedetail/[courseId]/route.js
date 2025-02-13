import { NextResponse } from "next/server";
import connectMongo from "@/services/mongo/mongo";
import { Topic } from "@/models/topic-model";

export async function GET(req, { params: { courseId } }) {
  try {
    await connectMongo();

    // Find topics based on courseId
    const courseData = await Topic.findOne({ courseId }).lean();

    if (!courseData) {
      return NextResponse.json(
        { status: false, message: "No topics found for this course" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: true, deatail: { ...courseData } });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 500 }
    );
  }
}

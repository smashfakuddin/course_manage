import { Picked } from "@/models/picked-model"; // Import Picked model
import connectMongo from "@/services/mongo/mongo"; // MongoDB connection utility
import { NextResponse } from "next/server";

export async function POST(req, { params: { courseId } }) {
  try {
    await connectMongo(); // Connect to MongoDB

    let body;
    try {
      body = await req.json(); // Parse incoming JSON request body
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON input" },
        { status: 400 }
      );
    }

    const { teacherId } = body;

    // Check if teacherId or courseId is missing
    if (!teacherId || !courseId) {
      return NextResponse.json(
        { success: false, message: "Missing teacherId or courseId" },
        { status: 400 }
      );
    }

    // Check if the teacher already has a Picked document
    let teacherPicked = await Picked.findOne({ teacher: teacherId });

    // If no Picked document exists, create a new one
    if (!teacherPicked) {
      teacherPicked = new Picked({
        teacher: teacherId,
        courses: [courseId], // Add course directly
      });

      await teacherPicked.save();
      return NextResponse.json({
        success: true,
        message: "Course added",
        data: teacherPicked,
      });
    }

    // Ensure that courses is an array and is initialized
    if (!Array.isArray(teacherPicked.courses)) {
      teacherPicked.courses = [];
    }

    // Check if the course already exists in the teacher's picked list
    const courseIndex = teacherPicked.courses.indexOf(courseId);

    if (courseIndex !== -1) {
      // Course exists → Remove it (Unpick)
      teacherPicked.courses.splice(courseIndex, 1);
      await teacherPicked.save();
      return NextResponse.json({
        success: true,
        message: "Course removed",
        data: teacherPicked,
      });
    } else {
      // Course does not exist → Add it
      if (teacherPicked.courses.length >= 4) {
        return NextResponse.json(
          { success: false, message: "You can only pick up to 4 courses." },
          { status: 400 }
        );
      }

      teacherPicked.courses.push(courseId);
      await teacherPicked.save();
      return NextResponse.json({
        success: true,
        message: "Course added",
        data: teacherPicked,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

import { Topic } from "@/models/topic-model";
import connectMongo from "@/services/mongo/mongo";
import { NextResponse } from "next/server";
export async function PUT(req) {
  try {
    await connectMongo();
    const { courseId, topicId, title, description } = await req.json();

    const courseTopics = await Topic.findOne({ courseId });

    if (!courseTopics) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const topic = courseTopics.topics.id(topicId);
    if (!topic) {
      return NextResponse.json(
        { success: false, message: "Topic not found" },
        { status: 404 }
      );
    }

    if (title) topic.title = title;
    if (description) topic.description = description;

    await courseTopics.save();
    return NextResponse.json({ success: true, data: topic });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

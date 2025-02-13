import { Topic } from "@/models/topic-model";
import connectMongo from "@/services/mongo/mongo";
import { NextResponse } from "next/server";



export async function POST(req) {
  try {
    await connectMongo();
    const { courseId, title, description } = await req.json();

    if (!courseId || !title) {
      return NextResponse.json({ success: false, message: "Course ID and Title are required" }, { status: 400 });
    }

    let courseTopics = await Topic.findOne({ courseId });

    if (!courseTopics) {
      courseTopics = new Topic({ courseId, topics: [] });
    }

    if (courseTopics.topics.length >= 8) {
      return NextResponse.json({ success: false, message: "Only 8 topics allowed per course" }, { status: 400 });
    }

    const newTopic = { title, description };
    courseTopics.topics.push(newTopic);

    await courseTopics.save();
    return NextResponse.json({ success: true, data: newTopic });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
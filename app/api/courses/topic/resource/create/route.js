import { Topic } from "@/models/topic-model";
import connectMongo from "@/services/mongo/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await connectMongo();
      const { courseId, topicId, url, description } = await req.json();
  
      if (!courseId || !topicId || !url || !description) {
        return NextResponse.json({ success: false, message: "courseId, topicId, url, and description are required." }, { status: 400 });
      }
  
      // Ensure the resource is an object
      const resource = { url, description };
  
      // Check if the topic exists before updating
      const updatedTopic = await Topic.findOneAndUpdate(
        { courseId, "topics._id": topicId },
        { $push: { "topics.$.resources": resource } }, // Push resource as an object, not as a string
        { new: true }
      );
  
      if (!updatedTopic) {
        return NextResponse.json({ success: false, message: "Topic not found." }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, data: updatedTopic });
    } catch (error) {
      console.error(error); // Log error to debug
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

  
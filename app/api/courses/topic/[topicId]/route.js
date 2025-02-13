import { Topic } from "@/models/topic-model";
import connectMongo from "@/services/mongo/mongo";
import { NextResponse } from "next/server";

export async function GET(req, { params: { topicId } }) {
  try {
    await connectMongo();

    // Find the topic inside the topics array
    const topicDoc = await Topic.findOne(
      { "topics._id": topicId },
      { "topics.$": 1 }
    );

    if (!topicDoc) {
      return NextResponse.json(
        { status: false, message: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: true, topic: topicDoc.topics[0] });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { Course } from "@/models/course-model";
import connectMongo from "@/services/mongo/mongo";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongo();
  const data = await Course.find();
  return NextResponse.json({ "success": true, data: data });
}

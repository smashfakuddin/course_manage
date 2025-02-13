import mongoose from "mongoose";



const TopicSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    topics: [
      {
        title: { type: String, required: true },
        description: { type: String }, // Resources stored as an array of objects
      },
    ],
  },
  { timestamps: true }
);

export const Topic =
  mongoose.models.Topic || mongoose.model("Topic", TopicSchema);

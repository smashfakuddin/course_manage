import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String },
});

export const Resource =
  mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);
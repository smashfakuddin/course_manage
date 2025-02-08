import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  code: { 
    type: String, 
    required: true,
    unique: true 
  },
  semester: { 
    type: Number, 
    required: true 
  },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false // A course might not have a teacher assigned initially
  },
  studentsEnrolled: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }
  ]
});

// Ensure unique course codes per semester (if needed)
courseSchema.index({ code: 1, semester: 1 }, { unique: true });

export const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

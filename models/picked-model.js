// models/picked-model.js

import mongoose from 'mongoose';

const pickedSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Teacher', // Assuming you have a Teacher model
    },
    courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Course', // Assuming you have a Course model
      validate: {
        validator: function (value) {
          return value.length <= 4; // Max 4 courses per teacher
        },
        message: 'A teacher can pick up to 4 courses only.',
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Picked = mongoose.models.Picked || mongoose.model('Picked', pickedSchema);

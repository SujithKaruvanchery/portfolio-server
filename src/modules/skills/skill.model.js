const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "devops", "tools", "other"],
      required: [true, "Category is required"],
    },
    proficiency: {
      type: Number,
      min: 1,
      max: 100,
      required: [true, "Proficiency is required"],
    },
    icon: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
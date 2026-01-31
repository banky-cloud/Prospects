import { Schema, model } from "mongoose";

const prospectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "engaged"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default model("clients", prospectSchema);

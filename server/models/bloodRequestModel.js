import mongoose from "mongoose";

const bloodRequestSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipient",
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    latitude: { type: Number },
    longitude: { type: Number },
    urgency: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Fulfilled"],
      default: "Pending",
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
    },
    feedback: {
      reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Recipient" },
      reviewerName: { type: String },
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      createdAt: { type: Date }
    }
  },
  { timestamps: true }
);

const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema);
export default BloodRequest;

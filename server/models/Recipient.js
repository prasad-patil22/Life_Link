import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const recipientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    requiredBloodGroup: { type: String, required: true },
    location: { type: String, required: true },
        phone: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
    urgency: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
}, { timestamps: true });

// Hash password before saving
recipientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
recipientSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Recipient", recipientSchema);

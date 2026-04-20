import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const donorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    location: { type: String, required: true },
    phone:{type: String,required: true},
    latitude: { type: Number,required:true },
    longitude: { type: Number ,required:true},
    lastDonationDate: { type: Date },
    reviews: [
        {
            reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "Recipient", required: true },
            reviewerName: { type: String },
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ],
}, { timestamps: true });

// Hash password before saving
donorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
donorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Donor", donorSchema);


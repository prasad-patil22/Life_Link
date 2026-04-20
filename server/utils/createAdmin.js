import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

dotenv.config();


mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const existing = await Admin.findOne({ email: "patilprasad2209@gmail.com" });
        if (existing) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("user@123", 10);
        const admin = await Admin.create({
            name: "Super Admin",
            email: "patilprasad2209@gmail.com",
            password: hashedPassword,
        });
        console.log("Default Admin created:", admin);
        process.exit();
    })
    .catch(err => console.log(err));

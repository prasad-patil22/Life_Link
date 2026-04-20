// import Admin from "../models/Admin.js";
// import jwt from "jsonwebtoken";

// // Generate JWT token
// const generateToken = (id) => {
//     return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
// };

// // Login admin
// export const loginAdmin = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const admin = await Admin.findOne({ email });
//         if (admin && (await admin.matchPassword(password))) {
//             res.json({
//                 _id: admin._id,
//                 name: admin.name,
//                 email: admin.email,
//                 token: generateToken(admin._id),
//             });
//         } else {
//             res.status(401).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
import Admin from "../models/Admin.js";
import Donor from "../models/Donor.js";
import Recipient from "../models/Recipient.js";
import jwt from "jsonwebtoken";

// Generate JWT token


// Admin login
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Get all donors
export const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find({});
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Get all recipients
export const getAllRecipients = async (req, res) => {
    try {
        const recipients = await Recipient.find({});
        res.json(recipients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Delete a donor
export const deleteDonor = async (req, res) => {
    try {
        await Donor.findByIdAndDelete(req.params.id);
        res.json({ message: "Donor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Delete a recipient
export const deleteRecipient = async (req, res) => {
    try {
        await Recipient.findByIdAndDelete(req.params.id);
        res.json({ message: "Recipient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



import Donor from "../models/Donor.js";
import jwt from "jsonwebtoken";
import Recipient from "../models/Recipient.js";
import mongoose from "mongoose";

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id, role: "donor" }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register donor
export const registerDonor = async (req, res) => {
    console.log("entered ")
    const { name, email, password, bloodGroup, location, latitude, longitude ,phone} = req.body;
    try {
        const donorExists = await Donor.findOne({ email });
        console.log("1st")
        if (donorExists) return res.status(400).json({ message: "Donor already exists" });
        console.log("2nd step")
        const donor = await Donor.create({ name, email, password, bloodGroup, location, latitude, longitude , phone });
        console.log("complete")
        res.status(201).json({
            name: donor.name,
            email: donor.email,
            bloodGroup: donor.bloodGroup,
            location:donor.location,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login donor
export const loginDonor = async (req, res) => {
    const { email, password } = req.body;
    try {
        const donor = await Donor.findOne({ email });
        if (donor && (await donor.matchPassword(password))) {
            res.json({
                _id: donor._id,
                name: donor.name,
                email: donor.email,
                bloodGroup: donor.bloodGroup,
                token: generateToken(donor._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllRecipientsForDonor = async (req, res) => {
    try {
        const recipients = await Recipient.find({}, "-password"); // exclude password
        res.json(recipients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get Donor Profile
export const getDonorProfile = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`getDonorProfile called with id: ${id}`);

        // Validate id format before querying
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.warn(`Invalid ObjectId: ${id}`);
            return res.status(400).json({ message: `Invalid donor id: ${id}` });
        }

        const donor = await Donor.findById(id, "-password");
        
        if (!donor) {
            console.warn(`Donor not found for id: ${id}`);
            return res.status(404).json({ message: `Donor not found for id: ${id}` });
        }
        res.json(donor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
import bcrypt from "bcryptjs";

// Update Donor Profile
export const updateDonorProfile = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) return res.status(404).json({ message: "Donor not found" });

        // Update only editable fields
    donor.name = req.body.name || donor.name;
    donor.bloodGroup = req.body.bloodGroup || donor.bloodGroup;
    donor.location = req.body.location || donor.location;
    donor.latitude = req.body.latitude || donor.latitude;
    donor.longitude = req.body.longitude || donor.longitude;
    donor.lastDonationDate = req.body.lastDonationDate || donor.lastDonationDate;

        // Handle password change
        if (req.body.oldPassword && req.body.newPassword) {
            const isMatch = await bcrypt.compare(req.body.oldPassword, donor.password);
            if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

            donor.password = req.body.newPassword; // will be hashed automatically by pre-save hook
        }

        const updatedDonor = await donor.save();
        res.json({
            _id: updatedDonor._id,
            name: updatedDonor.name,
            email: updatedDonor.email,
            bloodGroup: updatedDonor.bloodGroup,
            location: updatedDonor.location,
            latitude: updatedDonor.latitude,
            longitude: updatedDonor.longitude,
            lastDonationDate: updatedDonor.lastDonationDate,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add review for a donor (recipient adds feedback)
export const addDonorReview = async (req, res) => {
    try {
        const donorId = req.params.id;
        const { reviewerId, reviewerName, rating, comment } = req.body;

        if (!mongoose.Types.ObjectId.isValid(donorId)) return res.status(400).json({ message: 'Invalid donor id' });
        if (!reviewerId || !mongoose.Types.ObjectId.isValid(reviewerId)) return res.status(400).json({ message: 'Invalid reviewer id' });

        const donor = await Donor.findById(donorId);
        if (!donor) return res.status(404).json({ message: 'Donor not found' });

        const review = { reviewer: reviewerId, reviewerName: reviewerName || 'Anonymous', rating: rating || 0, comment: comment || '' };
        donor.reviews.unshift(review);
        await donor.save();

        res.status(201).json({ message: 'Review added', review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

import Recipient from "../models/Recipient.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id, role: "recipient" }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register recipient
export const registerRecipient = async (req, res) => {
  const { name, email, password, requiredBloodGroup, location, urgency, latitude, longitude, phone } = req.body;
    try {
        const recipientExists = await Recipient.findOne({ email });
        if (recipientExists) return res.status(400).json({ message: "Recipient already exists" });

    const recipient = await Recipient.create({ name, email, password, requiredBloodGroup, location, urgency, latitude, longitude, phone });
    res.status(201).json({
      _id: recipient._id,
      name: recipient.name,
      email: recipient.email,
      phone: recipient.phone,
      requiredBloodGroup: recipient.requiredBloodGroup,
      location: recipient.location,
      latitude: recipient.latitude,
      longitude: recipient.longitude,
      token: generateToken(recipient._id),
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login recipient
export const loginRecipient = async (req, res) => {
    const { email, password } = req.body;
    try {
        const recipient = await Recipient.findOne({ email });
        if (recipient && (await recipient.matchPassword(password))) {
            res.json({
        _id: recipient._id,
        name: recipient.name,
        email: recipient.email,
        phone: recipient.phone,
        requiredBloodGroup: recipient.requiredBloodGroup,
        location: recipient.location,
        latitude: recipient.latitude,
        longitude: recipient.longitude,
        token: generateToken(recipient._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


import Donor from "../models/Donor.js";

// Fetch all donors (Recipient Side)
export const getAllDonorsForRecipient = async (req, res) => {
    try {
        const donors = await Donor.find({}, "-password"); // exclude password
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


import bcrypt from "bcryptjs";

// Get Recipient Profile
export const getRecipientProfile = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id, "-password");
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });
    res.json(recipient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Recipient Profile
export const updateRecipientProfile = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.params.id);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

  // Editable fields
  recipient.name = req.body.name || recipient.name;
  recipient.requiredBloodGroup = req.body.requiredBloodGroup || recipient.requiredBloodGroup;
  recipient.location = req.body.location || recipient.location;
  recipient.urgency = req.body.urgency || recipient.urgency;
  recipient.phone = req.body.phone || recipient.phone;
  recipient.latitude = req.body.latitude !== undefined ? req.body.latitude : recipient.latitude;
  recipient.longitude = req.body.longitude !== undefined ? req.body.longitude : recipient.longitude;

    // Password change
    if (req.body.oldPassword && req.body.newPassword) {
      const isMatch = await bcrypt.compare(req.body.oldPassword, recipient.password);
      if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });
      recipient.password = req.body.newPassword;
    }

    const updatedRecipient = await recipient.save();
    res.json({
      _id: updatedRecipient._id,
      name: updatedRecipient.name,
      email: updatedRecipient.email,
      phone: updatedRecipient.phone,
      requiredBloodGroup: updatedRecipient.requiredBloodGroup,
      location: updatedRecipient.location,
      latitude: updatedRecipient.latitude,
      longitude: updatedRecipient.longitude,
      urgency: updatedRecipient.urgency,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

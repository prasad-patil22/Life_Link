import express from "express";
import { registerRecipient, loginRecipient, getAllDonorsForRecipient, getRecipientProfile, updateRecipientProfile } from "../controllers/recipientController.js";

const Recipientrouter = express.Router();

Recipientrouter.post("/register", registerRecipient);
Recipientrouter.post("/login", loginRecipient);
Recipientrouter.get("/all-donors", getAllDonorsForRecipient);

Recipientrouter.get("/profile/:id", getRecipientProfile);
Recipientrouter.put("/profile/:id", updateRecipientProfile);
export default Recipientrouter;

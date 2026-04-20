import express from "express";
import { registerDonor, loginDonor, getAllRecipientsForDonor, getDonorProfile, updateDonorProfile, addDonorReview } from "../controllers/donorController.js";

const donorRouter = express.Router();

donorRouter.post("/register", registerDonor);
donorRouter.post("/login", loginDonor);
donorRouter.get("/all-recipients", getAllRecipientsForDonor);
 
// Get donor profile
donorRouter.get("/profile/:id", getDonorProfile);

// Update donor profile
donorRouter.put("/profile/:id", updateDonorProfile);

// Add review to a donor
donorRouter.post("/review/:id", addDonorReview);


export default donorRouter;

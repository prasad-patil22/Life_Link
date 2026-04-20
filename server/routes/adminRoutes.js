import express from "express";
import { loginAdmin, getAllDonors, getAllRecipients, deleteDonor, deleteRecipient } from "../controllers/adminController.js";

const Adminrouter = express.Router();

Adminrouter.post("/login", loginAdmin);


// Admin CRUD
Adminrouter.get("/donors", getAllDonors);
Adminrouter.get("/recipients", getAllRecipients);
Adminrouter.delete("/donor/:id", deleteDonor);
Adminrouter.delete("/recipient/:id", deleteRecipient);

export default Adminrouter;

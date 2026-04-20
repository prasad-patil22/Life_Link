import express from "express";
import {
  createBloodRequest,
  getAllRequests,
  getRecipientRequests,
  acceptRequest,
  markFulfilled,

  getAllRequestsforAdmin,
} from "../controllers/bloodRequestController.js";

const bloodRequestrouter = express.Router();

// Recipient creates a new request
bloodRequestrouter.post("/", createBloodRequest);

// Donor views all pending requests
bloodRequestrouter.get("/all", getAllRequests);
bloodRequestrouter.get("/allrqt", getAllRequestsforAdmin);

// Recipient views their own requests
bloodRequestrouter.get("/recipient/:id", getRecipientRequests);

// Donor accepts a request
bloodRequestrouter.put("/accept/:id", acceptRequest);

// Recipient marks fulfilled
bloodRequestrouter.put("/fulfill/:id", markFulfilled);

export default bloodRequestrouter;

import BloodRequest from "../models/bloodRequestModel.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Donor from "../models/Donor.js";
import Recipient from "../models/Recipient.js";

// Create new blood request (recipient)
export const createBloodRequest = async (req, res) => {
  console.log("hey");
  try {
    const { recipient, bloodGroup, location, urgency, message } = req.body;

    // Validate recipient is present and a valid ObjectId
    if (!recipient) {
      return res.status(400).json({ message: "Recipient id is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(recipient)) {
      return res.status(400).json({ message: "Invalid recipient id" });
    }

    const newRequest = new BloodRequest({ recipient, bloodGroup, location, urgency, message });
    const saved = await newRequest.save();

    // populate recipient details for the email body
    await saved.populate("recipient", "name email phone location");

    // Prepare mail transporter (support explicit MAIL_* env vars or fallback to EMAIL/EMAIL_PASSWORD for Gmail)
    const mailHost = process.env.MAIL_HOST || (process.env.EMAIL ? 'smtp.gmail.com' : null);
    const mailPort = process.env.MAIL_PORT || (process.env.EMAIL ? '587' : null);
    const mailUser = process.env.MAIL_USER || process.env.EMAIL;
    const mailPass = process.env.MAIL_PASS || process.env.EMAIL_PASSWORD;
    const mailFrom = process.env.MAIL_FROM || mailUser;

    if (mailHost && mailPort && mailFrom) {
      const transporter = nodemailer.createTransport({
        host: mailHost,
        port: parseInt(mailPort, 10) || 587,
        secure: (process.env.MAIL_SECURE === 'true') || false,
        auth: mailUser && mailPass ? { user: mailUser, pass: mailPass } : undefined,
        tls: { rejectUnauthorized: false }
      });

      try {
        // Find all donors, regardless of blood group
        const donors = await Donor.find({});

        if (donors && donors.length > 0) {
          const subject = `Urgent: Blood request for ${bloodGroup} near ${location}`;
          const recipientInfo = saved.recipient
            ? `${saved.recipient.name}${saved.recipient.phone ? ` (${saved.recipient.phone})` : ""} — ${saved.recipient.email || ""}`
            : "Recipient details not available";

          const textBody = `A new blood request has been created and needs ${bloodGroup} blood.
Location: ${location}
Urgency: ${urgency || "Medium"}
Recipient: ${recipientInfo}

Message: ${message || "(no message)"}

If you'd like to help, please log in to the donors portal and accept the request.`;

          const htmlBody = `<p>A new blood request has been created and needs <strong>${bloodGroup}</strong> blood.</p>
<p><strong>Location:</strong> ${location}</p>
<p><strong>Urgency:</strong> ${urgency || "Medium"}</p>
<p><strong>Recipient:</strong> ${recipientInfo}</p>
<p><strong>Message:</strong> ${message || "(no message)"}</p>
<p>If you'd like to help, please log in to the donors portal and accept the request.</p>`;

          // send emails in parallel and await completion
          const sendPromises = donors.map(d => {
            const mailOptions = {
              from: mailFrom,
              to: d.email,
              subject,
              text: textBody,
              html: htmlBody,
            };
            return transporter.sendMail(mailOptions);
          });

          try {
            const results = await Promise.allSettled(sendPromises);
            const failures = results.filter(r => r.status === "rejected");
            if (failures.length > 0) {
              console.error(`${failures.length} email(s) failed to send for request ${saved._id}`);
            }
          } catch (mailErr) {
            console.error("Error while sending notification emails:", mailErr);
          }
        } else {
          console.log('No donors found in the system — skipping email notifications.');
        }
      } catch (errMail) {
        console.error("Failed to prepare or send donor notifications:", errMail);
      }
    } else {
      console.log("Mail configuration not provided; skipping donor notification emails.");
    }

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all requests (for donors to view)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: "Pending" })
      .populate("recipient", "name email location")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get all requests (for donors to view)
export const getAllRequestsforAdmin = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ })
      .populate("recipient", "name email location")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get requests for specific recipient
export const getRecipientRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ recipient: req.params.id })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Donor accepts a request
export const acceptRequest = async (req, res) => {
  try {
    const { donorId } = req.body;
    if (!donorId) return res.status(400).json({ message: 'donorId is required' });
    if (!mongoose.Types.ObjectId.isValid(donorId)) return res.status(400).json({ message: 'Invalid donorId' });

    const DonorModel = mongoose.model('Donor');
    const donorExists = await DonorModel.findById(donorId);
    if (!donorExists) return res.status(404).json({ message: 'Donor not found' });

    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "Accepted";
    request.donor = donorId;
    await request.save();

    // Populate both donor and recipient details for the email
    await request.populate([
      { path: "donor", select: "name email phone bloodGroup" },
      { path: "recipient", select: "name email phone" }
    ]);

    // Send email notification to recipient
    const mailHost = process.env.MAIL_HOST || (process.env.EMAIL ? 'smtp.gmail.com' : null);
    const mailPort = process.env.MAIL_PORT || (process.env.EMAIL ? '587' : null);
    const mailUser = process.env.MAIL_USER || process.env.EMAIL;
    const mailPass = process.env.MAIL_PASS || process.env.EMAIL_PASSWORD;
    const mailFrom = process.env.MAIL_FROM || mailUser;

    if (mailHost && mailPort && mailFrom && request.recipient.email) {
      const transporter = nodemailer.createTransport({
        host: mailHost,
        port: parseInt(mailPort, 10) || 587,
        secure: (process.env.MAIL_SECURE === 'true') || false,
        auth: mailUser && mailPass ? { user: mailUser, pass: mailPass } : undefined,
        tls: { rejectUnauthorized: false }
      });

      const subject = `Good News! A donor has accepted your blood request`;
      
      const textBody = `Dear ${request.recipient.name},

A donor has accepted your blood request for ${request.bloodGroup} blood.

Donor Details:
Name: ${request.donor.name}
Blood Group: ${request.donor.bloodGroup}
Contact: ${request.donor.phone || 'Not provided'}
Email: ${request.donor.email}

Your request details:
Location: ${request.location}
Urgency: ${request.urgency || "Medium"}

Please contact the donor to arrange the donation. After the donation is complete, please mark the request as fulfilled in the system.

Thank you for using our service.`;

      const htmlBody = `
<h2>Good News! A donor has accepted your blood request</h2>

<p>Dear ${request.recipient.name},</p>

<p>A donor has accepted your blood request for <strong>${request.bloodGroup}</strong> blood.</p>

<h3>Donor Details:</h3>
<ul>
  <li><strong>Name:</strong> ${request.donor.name}</li>
  <li><strong>Blood Group:</strong> ${request.donor.bloodGroup}</li>
  <li><strong>Contact:</strong> ${request.donor.phone || 'Not provided'}</li>
  <li><strong>Email:</strong> ${request.donor.email}</li>
</ul>

<h3>Your request details:</h3>
<ul>
  <li><strong>Location:</strong> ${request.location}</li>
  <li><strong>Urgency:</strong> ${request.urgency || "Medium"}</li>
</ul>

<p>Please contact the donor to arrange the donation. After the donation is complete, please mark the request as fulfilled in the system.</p>

<p>Thank you for using our service.</p>`;

      try {
        await transporter.sendMail({
          from: mailFrom,
          to: request.recipient.email,
          subject,
          text: textBody,
          html: htmlBody,
        });
        console.log(`Notification email sent to recipient ${request.recipient.email}`);
      } catch (mailErr) {
        console.error("Failed to send acceptance notification to recipient:", mailErr);
      }
    }

    res.json({ message: "Request accepted successfully", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark request as fulfilled (recipient after donation)
export const markFulfilled = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    const { recipientId, rating, comment } = req.body;

    // Only the original recipient can mark their request fulfilled
    if (!recipientId || request.recipient.toString() !== recipientId) {
      return res.status(403).json({ message: "Only the request recipient can mark this as fulfilled" });
    }

    // Ensure request was accepted by a donor
    if (!request.donor) return res.status(400).json({ message: "Request has not been accepted by a donor yet" });
    request.status = "Fulfilled";
    // Save feedback on the request
    request.feedback = {
      reviewer: recipientId,
      reviewerName: req.body.reviewerName || "",
      rating: rating || null,
      comment: comment || "",
      createdAt: new Date()
    };

    await request.save();

    // Also add review to donor document and get donor details
    const donor = await mongoose.model('Donor').findById(request.donor);
    if (donor) {
      const review = {
        reviewer: recipientId,
        reviewerName: req.body.reviewerName || '',
        rating: rating || 0,
        comment: comment || '',
        createdAt: new Date()
      };
      donor.reviews.unshift(review);
      await donor.save();
    }

    // Populate recipient details for emails
    await request.populate([
      { path: "recipient", select: "name email phone" }
    ]);

    // Send email notifications
    const mailHost = process.env.MAIL_HOST || (process.env.EMAIL ? 'smtp.gmail.com' : null);
    const mailPort = process.env.MAIL_PORT || (process.env.EMAIL ? '587' : null);
    const mailUser = process.env.MAIL_USER || process.env.EMAIL;
    const mailPass = process.env.MAIL_PASS || process.env.EMAIL_PASSWORD;
    const mailFrom = process.env.MAIL_FROM || mailUser;

    if (mailHost && mailPort && mailFrom) {
      const transporter = nodemailer.createTransport({
        host: mailHost,
        port: parseInt(mailPort, 10) || 587,
        secure: (process.env.MAIL_SECURE === 'true') || false,
        auth: mailUser && mailPass ? { user: mailUser, pass: mailPass } : undefined,
        tls: { rejectUnauthorized: false }
      });

      // Send to donor
      if (donor?.email) {
        const donorSubject = `Thank you for your blood donation!`;
        const donorTextBody = `Dear ${donor.name},

Thank you for your blood donation! The recipient has marked the blood request as fulfilled.

Request Details:
Blood Group: ${request.bloodGroup}
Location: ${request.location}
Recipient: ${request.recipient.name}

Feedback from recipient:
Rating: ${rating || 'Not provided'} / 5
Comment: ${comment || 'No comment provided'}

Your contribution helps save lives. Thank you for being a donor!`;

        const donorHtmlBody = `
<h2>Thank you for your blood donation!</h2>

<p>Dear ${donor.name},</p>

<p>Thank you for your blood donation! The recipient has marked the blood request as fulfilled.</p>

<h3>Request Details:</h3>
<ul>
  <li><strong>Blood Group:</strong> ${request.bloodGroup}</li>
  <li><strong>Location:</strong> ${request.location}</li>
  <li><strong>Recipient:</strong> ${request.recipient.name}</li>
</ul>

<h3>Feedback from recipient:</h3>
<p><strong>Rating:</strong> ${rating || 'Not provided'} / 5</p>
<p><strong>Comment:</strong> ${comment || 'No comment provided'}</p>

<p>Your contribution helps save lives. Thank you for being a donor!</p>`;

        try {
          await transporter.sendMail({
            from: mailFrom,
            to: donor.email,
            subject: donorSubject,
            text: donorTextBody,
            html: donorHtmlBody,
          });
          console.log(`Fulfillment notification sent to donor ${donor.email}`);
        } catch (mailErr) {
          console.error("Failed to send fulfillment notification to donor:", mailErr);
        }
      }

      // Send confirmation to recipient
      if (request.recipient?.email) {
        const recipientSubject = `Blood donation completed - Thank you!`;
        const recipientTextBody = `Dear ${request.recipient.name},

Your blood request has been marked as fulfilled. We hope the donation process went well.

Request Details:
Blood Group: ${request.bloodGroup}
Location: ${request.location}
Donor: ${donor?.name || 'Anonymous'}

Your feedback has been saved. Thank you for using our service!`;

        const recipientHtmlBody = `
<h2>Blood donation completed - Thank you!</h2>

<p>Dear ${request.recipient.name},</p>

<p>Your blood request has been marked as fulfilled. We hope the donation process went well.</p>

<h3>Request Details:</h3>
<ul>
  <li><strong>Blood Group:</strong> ${request.bloodGroup}</li>
  <li><strong>Location:</strong> ${request.location}</li>
  <li><strong>Donor:</strong> ${donor?.name || 'Anonymous'}</li>
</ul>

<p>Your feedback has been saved. Thank you for using our service!</p>`;

        try {
          await transporter.sendMail({
            from: mailFrom,
            to: request.recipient.email,
            subject: recipientSubject,
            text: recipientTextBody,
            html: recipientHtmlBody,
          });
          console.log(`Fulfillment confirmation sent to recipient ${request.recipient.email}`);
        } catch (mailErr) {
          console.error("Failed to send fulfillment confirmation to recipient:", mailErr);
        }
      }
    }

    res.json({ message: "Request marked as fulfilled and feedback saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate("recipient", "name email phone") // populate recipient fields
      .populate("donor", "name email phone bloodGroup") // populate donor fields
      .sort({ createdAt: -1 }); // newest first

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No blood requests found" });
    }

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching blood requests",
      error: error.message,
    });
  }
};
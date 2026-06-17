const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

// ==========================================
// Health Check
// ==========================================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    service: "ATRISI Meta Webhook Service",
    uptime: process.uptime(),
  });
});

// ==========================================
// Meta Webhook Verification
// ==========================================
app.get("/api/meta/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook verification request received");

  if (
    mode === "subscribe" &&
    token === VERIFY_TOKEN
  ) {
    console.log("Webhook verified successfully");
    return res.status(200).send(challenge);
  }

  console.log("Webhook verification failed");
  return res.sendStatus(403);
});

// ==========================================
// Receive Meta Events
// ==========================================
app.post("/api/meta/webhook", async (req, res) => {
  try {
    console.log("=================================");
    console.log("META EVENT RECEIVED");
    console.log("=================================");
    console.log(JSON.stringify(req.body, null, 2));

    // Future:
    // Save to database
    // Forward to ATRISI CRM
    // Trigger AI assistant
    // Analytics

    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 ATRISI Meta Service running on port ${PORT}`);
});

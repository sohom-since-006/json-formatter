const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" })); // Protects from very large JSON crashes

// POST format JSON
app.post("/api/format-json", (req, res) => {
  const { json } = req.body;

  if (!json) {
    return res.status(400).json({ error: "JSON content is required" });
  }

  try {
    const parsed = JSON.parse(json);
    const formatted = JSON.stringify(parsed, null, 2);
    return res.json({ formatted });
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
});

// Test route so browser doesn't show "Cannot GET /"
app.get("/", (req, res) => {
  res.send("JSON Formatter Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

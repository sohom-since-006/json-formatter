const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// POST format JSON
app.post("/api/format-json", (req, res) => {
  const { json } = req.body;

  if (!json) {
    res.status(400).json({ error: "JSON content is required" });
  }

  try {
    const parsed = JSON.parse(json);
    const formatted = JSON.stringify(parsed, null, 2);
    res.json({ formatted });
  } catch {
    res.status(400).json({ error: "Invalid JSON" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


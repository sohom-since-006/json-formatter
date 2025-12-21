import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/format-json";

function App() {
  const [json, setJson] = useState("");
  const [formattedJson, setFormattedJson] = useState(null);

  const formatJson = async () => {
    if (!json) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ json })
    });

    const formatObj = await res.json();
    setFormattedJson(formatObj);
    setJson("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>JSON Formatter</h1>

      <textarea
        rows="8"
        value={json}
        onChange={e => setJson(e.target.value)}
        placeholder="Paste JSON here..."
      />
      <button onClick={formatJson}>Format</button>

      {formattedJson &&
        <>
          <h4>Formatted JSON:</h4>
          <pre>{formattedJson.formatted}</pre>
        </>
      }
    </div>
  );
}

export default App;


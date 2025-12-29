import { useState } from "react";
import "./index.css";

const API_URL = "http://localhost:5000/api/format-json";

function App() {
  const [json, setJson] = useState("");
  const [formattedJson, setFormattedJson] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const formatJson = async () => {
    setError("");
    if (!json) return;

    // Validate JSON before sending
    try {
      JSON.parse(json);
    } catch (err) {
      setError("Invalid JSON! Please check your input.");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json })
      });

      const formatObj = await res.json();
      if (formatObj.error) {
        setError(formatObj.error);
        return;
      }

      setFormattedJson(formatObj);
      setJson("");
    } catch (err) {
      setError("Error formatting JSON. Please try again.");
    }
  };

  const minifyJson = () => {
    if (!formattedJson) return;
    try {
      const minified = JSON.stringify(JSON.parse(formattedJson.formatted));
      setFormattedJson({ formatted: minified });
    } catch {
      setError("Cannot minify. Invalid JSON.");
    }
  };

  const copyJson = () => {
    if (!formattedJson) return;
    navigator.clipboard.writeText(formattedJson.formatted);
    alert("Copied to clipboard!");
  };

  const downloadJson = () => {
    if (!formattedJson) return;
    const blob = new Blob([formattedJson.formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <h1>JSON Formatter</h1>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="dark-toggle"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <textarea
        rows="10"
        value={json}
        onChange={e => setJson(e.target.value)}
        placeholder="Paste JSON here..."
      />

      <button onClick={formatJson}>Format</button>

      {error && <p className="error">{error}</p>}

      {formattedJson && (
        <div className="output-section">
          <h4>Formatted JSON:</h4>
          <pre>{formattedJson.formatted}</pre>
          <div className="button-group">
            <button onClick={copyJson}>Copy</button>
            <button onClick={minifyJson}>Minify</button>
            <button onClick={downloadJson}>Download</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import fs from "fs";

// Manually load .env.local
const envFile = fs.readFileSync(".env.local", "utf8");
const lines = envFile.split(/\r?\n/);
let apiKey = "";
for (const line of lines) {
  if (line.startsWith("VITE_GEMINI_API_KEY=")) {
    apiKey = line.split("=")[1].trim();
    break;
  }
}

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    fs.writeFileSync("models.json", JSON.stringify(data, null, 2));
    console.log("Wrote models to models.json");
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();

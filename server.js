const express = require("express");
const app = express();
const cors = require("cors");
const process = require("process");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

const API_KEY = process.env.AI_API_KEY;
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 300,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];
const genAI = new GoogleGenerativeAI(API_KEY);
const aiModel = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig,
  safetySettings,
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/completions", async (req, res) => {
  const prompt = `Create SQL query for ${req.body.message}`;
  const result = await aiModel.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  res.send({
    data: text,
  });
});

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});

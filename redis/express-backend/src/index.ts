import { createClient } from "redis";
import express from "express";

const app = express();
app.use(express.json());

const client = createClient();
client.connect();

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  try {
    await client.lPush(
      "submissions",
      JSON.stringify({ problemId, userId, code, language }),
    );
    res.json({
      message: "Submitted",
    });
  } catch (error) {
    res.json({
      message: "not submitted",
    });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

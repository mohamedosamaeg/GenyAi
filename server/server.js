import express from "express";

const app = express();
app.use(express.json());

app.post("/api/image", async (req, res) => {
  const { prompt } = req.body;

  const r = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "256x256"
    }),
  });

  const data = await r.json();
  res.status(r.status).json(data);
});

app.listen(3000);

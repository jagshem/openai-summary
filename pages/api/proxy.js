import axios from "axios";

export default async function handler(req, res) {
  const { query, apiKey } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: query,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bir hata oluştu. Lütfen tekrar deneyin." });
  }
}

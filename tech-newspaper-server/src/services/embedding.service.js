import axios from "axios";

const AI_SERVICE_URL = process.env.AI_APP_URL;


export async function getEmbedding(text) {

  try {

    const res = await axios.post(`${AI_SERVICE_URL}/embed`, {
      text
    });

    return res.data.embedding;

  } catch (err) {

    console.error("❌ Embedding Error:", err.message);
    return null;
  }
}
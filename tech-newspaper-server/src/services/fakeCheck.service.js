import axios from "axios";

const AI_API = process.env.AI_APP_URL;

export async function checkFakeNews(text) {

  const res = await axios.post(`${AI_API}/verify`, {
    text
  });

  return res.data.prediction;
}
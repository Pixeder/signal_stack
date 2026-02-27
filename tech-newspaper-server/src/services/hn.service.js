import axios from "axios";

const BASE = "https://hacker-news.firebaseio.com/v0";

export async function getTopIds() {
  const res = await axios.get(`${BASE}/topstories.json`);
  return res.data.slice(0, 50); // top 50 only
}

export async function getStory(id) {
  const res = await axios.get(`${BASE}/item/${id}.json`);
  return res.data;
}

export async function getTopStories() {
  const ids = await getTopIds();
  // console.log(ids);

  const stories = await Promise.all(
    ids.map(id => getStory(id))
  );

  return stories.filter(Boolean);
}

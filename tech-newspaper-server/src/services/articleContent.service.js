import axios from "axios";
import * as cheerio from 'cheerio';

export async function getArticlePreview(url) {

  try {

    const { data } = await axios.get(url, {
      timeout: 5000
    });

    const $ = cheerio.load(data);

    let text = "";

    $("p").each((i, el) => {
      if (i < 3) {  // first 3 paragraphs
        text += $(el).text() + " ";
      }
    });

    return text.slice(0, 1000); // limit size

  } catch (err) {
    return "";
  }
}
import { getEmbedding } from "../services/embedding.service.js";
import { cosineSimilarity } from "./cosine.js";
import { getArticlePreview } from "../services/articleContent.service.js";

/**
 * Platform Interest Profile
 * (Change this anytime to tune relevance)
 */
const PLATFORM_PROFILE = `
We are interested in technology news including
software engineering,
programming languages like JavaScript, Go, Python,
DevOps, Docker, containers,
open source projects,
AI and machine learning,
large language models,
startups and SaaS,
developer tools,
system design,
cybersecurity,
backend infrastructure,
cloud computing.
`;

const ANCHORS = {
  ai: `
  This article is about artificial intelligence,
  machine learning,
  large language models,
  neural networks,
  AI startups.
  `,
  
  programming: `
  This article discusses programming languages,
  software engineering,
  backend systems,
  JavaScript, Python, Go,
  APIs, compilers, runtime systems.
  `,
  
  devops: `
  This article discusses Docker,
  containers,
  Kubernetes,
  cloud infrastructure,
  DevOps tools,
  CI/CD systems.
  `,
  
  security: `
  This article discusses cybersecurity,
  encryption,
  vulnerabilities,
  hacking,
  network security.
  `,
  
  startups: `
  This article discusses startups,
  funding,
  YC,
  SaaS companies,
  tech business models.
  `
};


let profileVector = null;


/**
 * Load profile embedding once
 */
async function loadProfileVector() {

  if (!profileVector) {

    console.log("⏳ Loading profile embedding...");

    profileVector = await getEmbedding(PLATFORM_PROFILE);

    if (profileVector) {
      console.log("✅ Profile vector loaded");
    }
  }
}


/**
 * Get semantic relevance score
 */
export async function getSemanticScore(article) {

  const preview = await getArticlePreview(article.url);

  const text = `
  Title: ${article.title}
  Content: ${preview}
  `;

  const articleVector = await getEmbedding(text);

  let maxScore = 0;

  for (const key in ANCHORS) {

    const anchorVector = await getEmbedding(ANCHORS[key]);

    const score = cosineSimilarity(articleVector, anchorVector);

    if (score > maxScore) {
      maxScore = score;
    }
  }

  return maxScore;
}
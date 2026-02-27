from transformers import pipeline

print("⏳ Loading fake news model...")

MODEL = "jy46604790/Fake-News-Bert-Detect"
clf = pipeline("text-classification", model=MODEL, tokenizer=MODEL, device=-1, truncation=True)

print("✅ Fake news model loaded")

def detect_fake_news(text: str):

    result = clf(text[:512])[0]  # limit length

    return {
        "label": result["label"],   # FAKE / REAL
        "score": result["score"]
    }

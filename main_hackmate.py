from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
import json
import os

app = FastAPI()
model = SentenceTransformer("all-MiniLM-L6-v2")

PROFILE_FILE = "profiles.json"


if os.path.exists(PROFILE_FILE):
    with open(PROFILE_FILE, "r") as f:
        profiles = json.load(f)
else:
    profiles = []

class Profile(BaseModel):
    name: str
    skills: str
    interests: str

@app.post("/create-profile")
def create_profile(profile: Profile):
    new_profile = profile.dict()
    profiles.append(new_profile)

    with open(PROFILE_FILE, "w") as f:
        json.dump(profiles, f, indent=4)

    return {"message": "Profile created", "profile": new_profile}

@app.get("/find-match")
def find_match(name: str = Query(...)):
    
    user_profile = next((p for p in profiles if p["name"].lower() == name.lower()), None)
    if not user_profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    
    all_texts = [f"{p['skills']} {p['interests']}" for p in profiles]
    embeddings = model.encode(all_texts, convert_to_tensor=True)

    
    user_text = f"{user_profile['skills']} {user_profile['interests']}"
    user_embedding = model.encode(user_text, convert_to_tensor=True)

    
    scores = util.cos_sim(user_embedding, embeddings)[0]
    ranked = sorted(zip(profiles, scores.tolist()), key=lambda x: x[1], reverse=True)

    
    ranked = [r for r in ranked if r[0]["name"].lower() != name.lower()]

    return {"user": name, "matches": ranked[:3]}

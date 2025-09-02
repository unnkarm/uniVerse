from fastapi import FastAPI, Query
from sentence_transformers import SentenceTransformer, util
import json

app = FastAPI()


model = SentenceTransformer("all-MiniLM-L6-v2")


events = [
    {"id": 1, "title": "Samarth-The Educational Club", "description": "This club is dedicated to fostering academic excellence by providing resources, workshops, and career guidance to help students achieve their educational goals."},
    {"id": 2, "title": "Ankuran-The Cultural Club", "description": "This club is dedicated to celebrating and promoting diverse cultural heritage through artistic performances, festivals, and creative events."},
    {"id": 3, "title": "Geekonix-The Robotics Club", "description": "This club is dedicated to exploring the world of robotics, drones, and intelligent machines through hands-on projects, workshops, and competitive events."},
    {"id": 4, "title": "Eclectica-The Quiz and Debate Club", "description": "This club is dedicated to sharpening critical thinking and public speaking skills through engaging quizzes, spirited debates, and intellectual discussions."},
    {"id": 5, "title": "Technotkarsh-The Sports Club", "description": "This club is dedicated to promoting physical fitness and sportsmanship through organized events, tournaments, and various athletic activities."},
    {"id": 6, "title": "Samaritans-The Social Awareness and Charity Club", "description": "This club is dedicated to fostering social responsibility and community welfare through awareness campaigns, fundraising, and various charitable activities."},
    {"id": 7, "title": "IIC Club-The Business and Entrepreneurship Club", "description": "This club is dedicated to cultivating an entrepreneurial mindset by providing a platform for students to develop business skills, innovate, and connect with industry leaders."}
]


event_descriptions = [e["description"] for e in events]
event_embeddings = model.encode(event_descriptions, convert_to_tensor=True)

@app.get("/recommend")
def recommend(user_input: str = Query(..., description="Enter your club or interest")):
    
    user_embedding = model.encode(user_input, convert_to_tensor=True)

    
    scores = util.cos_sim(user_embedding, event_embeddings)[0]

    
    top_results = sorted(
        zip(events, scores.tolist()), key=lambda x: x[1], reverse=True
    )

    
    recommendations = [{"title": r[0]["title"], "score": float(r[1])} for r in top_results[:3]]

    return {"input": user_input, "recommendations": recommendations}

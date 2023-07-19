import pandas as pd
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

best_movies = pd.read_csv("./api/models/movies/best_movies.csv")
movie_data = pd.read_csv("./api/models/movies/movie_data.csv")
movie_titles = pd.read_csv("./api/models/movies/movie_titles.csv")


def get_movie_details(title):
    movie_details = movie_data[movie_data["title"] == title]
    return movie_details.to_dict(orient="records")


def get_movie_poster(title):
    poster_path = movie_data[movie_data["title"] == title]["poster_path"].values[0]
    return "https://image.tmdb.org/t/p/original" + poster_path


@app.get("/api/test")
def read_root():
    return {"message": "Recommender System Project"}


@app.get("/api/movie_titles")
def all_movie_titles():
    return movie_titles["title"].values.tolist()


@app.get("/api/recommend_movie/{movie}")
def get_recommendation(movie: str):
    movie = movie.replace("%20", " ")
    response = requests.post("https://wykonos-movie-recommender.hf.space/run/predict", json={"data": [movie]}).json()
    data = response["data"][0]
    recommendation = data[0]
    movie_posters = data[1]
    movie_details = data[2]
    return {
        "recommendation": recommendation,
        "movie_posters": movie_posters,
        "movie_details": movie_details
    }


@app.get("/api/random_best_movies")
def random_best_movies():
    random_movies = best_movies.sample(n=4)
    for i in range(len(random_movies)):
        while random_movies.iloc[i]["title"] not in movie_titles["title"].values:
            random_movies.iloc[i] = best_movies.sample(n=1)
    return random_movies.to_dict(orient="records")

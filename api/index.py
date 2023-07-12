import _pickle as cPickle
import bz2

import pandas as pd
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


def decompress_model(file):
    data = bz2.BZ2File(file, 'rb')
    data = cPickle.load(data)
    return data


movies_list = decompress_model("./api/models/movies/movies_model.pbz2")
movies_similarity = decompress_model("./api/models/movies/movies_similarity.pbz2")
best_movies = pd.read_csv("./api/models/movies/best_movies.csv")
movie_data = pd.read_csv("./api/models/movies/movie_data.csv")


def recommend(movie_title):
    movie_index = movies_list[movies_list["title"] == movie_title].index[0]
    distances = movies_similarity[movie_index]
    sorted_movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:120]
    recommended_movies, recommended_posters = [], []
    unique_movies = set()
    for i in sorted_movie_list:
        poster_path = movies_list["poster_path"][i[0]]
        recommended_movie = movies_list.iloc[i[0]].title
        if recommended_movie not in unique_movies:
            unique_movies.add(recommended_movie)
            recommended_movies.append(recommended_movie)
            recommended_posters.append("https://image.tmdb.org/t/p/original" + poster_path)
    return recommended_movies, recommended_posters


def get_movie_details(title):
    movie_details = movie_data[movie_data["title"] == title]
    return movie_details.to_dict(orient="records")


@app.get("/api/test")
def read_root():
    return {"message": "Recommender System Project"}


@app.get("/api/movie_titles")
def all_movie_titles():
    return movies_list["title"].tolist()


@app.get("/api/recommend_movie/{movie}")
def get_recommendation(movie: str):
    recommendation, movie_posters = recommend(movie)
    movie_details = [get_movie_details(movie) for movie in recommendation]
    return {
        "recommendation": recommendation,
        "movie_posters": movie_posters,
        "movie_details": movie_details
    }


@app.get("/api/random_best_movies")
def random_best_movies():
    random_movies = best_movies.sample(n=4)
    return random_movies.to_dict(orient="records")

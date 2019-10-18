import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      loadingMessage: "aa",
      user: null
    };
  }

  componentDidMount() {

    this.setState({loadingMessage: "Loading..."});
    axios
      .get("https://my-flix-gerinfact.herokuapp.com/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => {
        this.setState({ loadingMessage: "Connection Error: No movies found." });
        console.log(err.message);
      });
  }

  onMovieClick(movie) {
    this.setState({ selectedMovie: movie });
  }

  onMovieClose() {
    this.setState({ selectedMovie: null });
  }

  onLoggedIn(user) {
    this.setState({user: user});
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    return movies && movies.length ? (
      <div className="main-view">
      <h1 className="title">Movies</h1>
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onClose={() => this.onMovieClose()}
          />
        ) : (
          movies.map(m => (
            <MovieCard
              movie={m}
              key={m._id}
              onClick={m => this.onMovieClick(m)}
            />
          ))
        )}
      </div>
    ) : (
      <div className="main-view">
        <h2>{this.state.loadingMessage}</h2>
      </div>
    );
  }
}

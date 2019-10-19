import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Button from "react-bootstrap/Button";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      loadingMessage: "aa",
      user: null,
      isRegistration: false
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) return;

    this.setState({ user: localStorage.getItem("user") });
    this.getMovies(accessToken);
  }

  getMovies(token) {
    this.setState({ loadingMessage: "Loading..." });
    axios
      .get("https://my-flix-gerinfact.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
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

  onLoggedIn(authData) {
    this.setState({ user: authData.user.Username });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistered(user) {
    this.setState({ user: user });
  }

  onRegister() {
    this.setState({ isRegistration: true });
  }
  onRegisterReturn() {
    this.setState({ isRegistration: false });
  }
  onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.reload();
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return this.state.isRegistration ? (
        <div className="registration">
           <RegistrationView onRegistered={user => this.onRegistered(user)} />
          <Button
            className="action-button"
            variant="primary"
            type="button"
            onClick={() => this.onRegisterReturn()}
          >
            Return
          </Button>
        </div>
      ) : (
        <div className="login">
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          <Button
            className="action-button"
            variant="primary"
            type="button"
            onClick={() => this.onRegister()}
          >
            Register
          </Button>
        </div>
      );

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

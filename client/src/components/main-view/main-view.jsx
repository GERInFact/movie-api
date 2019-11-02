import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import Button from "react-bootstrap/Button";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      loadingMessage: "",
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
    console.log(user);
    axios
      .post("https://my-flix-gerinfact.herokuapp.com/users", user)
      .then(res =>
        console.log(`${res.data.Username} has successfully been registered.`)
      )
      .catch(err => console.log(err.message));
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
      <Router>
        <div className="main-view">
          <h1 className="title">myFlix</h1>
          <Route
            exact
            path="/"
            render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}
          />
          <Route
            path="/movies/:title"
            render={({ match }) => (
              <MovieView
                movie={movies.find(m => m.Title === match.params.title)}
              />
            )}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => {
              return (
                <DirectorView
                  director={
                    movies.find(m => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              );
            }}
          />
          <Route
            path="/genre/:name"
            render={({ match }) => {
              return (
                <GenreView
                  movie={
                    movies.find(m => m.Genre.Name === match.params.name)
                  }
                />
              );
            }}
          />
        </div>
      </Router>
    ) : (
      <div className="main-view">
        <h2>{this.state.loadingMessage}</h2>
      </div>
    );
  }
}

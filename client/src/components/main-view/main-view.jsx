import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies, setUser } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./main-view.scss";
import { ProfileView } from "../profile-view/profile-view";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMovie: null,
      loadingMessage: "",
      isRegistration: false
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) return;

    this.props.setUser({ user: localStorage.getItem("user") });
    this.getMovies(accessToken);
  }

  getMovies(token) {
    this.setState({ loadingMessage: "Loading..." });
    axios
      .get("https://my-flix-gerinfact.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {this.props.setMovies(res.data); console.log(movies);})
      .catch(err => {
        this.setState({ loadingMessage: "Connection Error: No movies found." });
        console.log(err.message);
      });
  }

  onMovieClick(movie) {
    console.log(movie);
    this.setState({ selectedMovie: movie });
  }

  onMovieClose() {
    this.setState({ selectedMovie: null });
  }

  onLoggedIn(authData) {
    this.props.setUser({ user: authData.user.Username });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistered(user) {
    console.log(user);
    axios
      .post("https://my-flix-gerinfact.herokuapp.com/users", user)
      .then(res => {
        console.log(`${res.data.Username} has successfully been registered.`);
        location.reload();
      })
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
    const { selectedMovie } = this.state;
    const { movies, user } = this.props;

    if (!user) return this.getCredentialsView();

    return this.getMainView(movies, user, selectedMovie);
  }

  getMainView(movies, user, selectedMovie) {
    return movies && movies.length ? (
      <Router basename="/client">
        <Link to={`/users/${user}`}>
          <h2>{user}</h2>
        </Link>
        <div className="main-view">
          <h1 className="title">myFlix</h1>
          <Route
            exact
            path="/"
            render={() => (
              // movies.map(m => (
              //   <MovieCard
              //     key={m._id}
              //     movie={m}
              //     onMovieClick={() => this.onMovieClick(m)}
              //   />
              // ))
              <MoviesList
                movies={movies}
                onMovieClick={m => this.onMovieClick(m)}
              />
            )}
          />
          <Route
            path="/movies/:title"
            render={({ match }) => (
              <MovieView
                movie={movies.find(m => m.Title === match.params.title)}
                previousMovie={selectedMovie}
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
                  previousMovie={selectedMovie}
                />
              );
            }}
          />
          <Route
            path="/genre/:name"
            render={({ match }) => {
              return (
                <GenreView
                  genre={
                    movies.find(m => m.Genre.Name === match.params.name).Genre
                  }
                  previousMovie={selectedMovie}
                />
              );
            }}
          />
          <Route
            path="/users/:username"
            render={({ match }) => {
              return (
                <ProfileView
                  movies={movies}
                  user={user}
                  onMovieClick={m => this.onMovieClick(m)}
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

  getCredentialsView() {
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
  }
}

const mapStateToProps = state => {
  return { movies: state.movies, user: state.user };
};

export default connect(
  mapStateToProps,
  { setMovies, setUser }
)(MainView);

MainView.propTypes = {
  setUser: PropTypes.func.isRequired
};

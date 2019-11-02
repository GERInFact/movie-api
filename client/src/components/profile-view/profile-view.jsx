import React from "react";
import PropTypes from "prop-types";
import "./profile-view.scss";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      password: null,
      passwordConfirmed: null,
      birth: null,
      email: null
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");

    axios
      .get(`https://my-flix-gerinfact.herokuapp.com/users/${this.props.user}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => this.setState({ userData: res.data }))
      .catch(err => {
        console.log(err.message);
      });
  }
  onUserDelete() {
    const accessToken = localStorage.getItem("token");
    axios
      .delete(
        `https://my-flix-gerinfact.herokuapp.com/users/${this.props.user}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(res =>{
        localStorage.clear();
        window.location ="/";
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  onSaveUser() {
    const accessToken = localStorage.getItem("token");
    const { userData } = this.state;

    axios
      .put(
        `https://my-flix-gerinfact.herokuapp.com/users/${this.props.user}`,
        {
          username: userData.Username,
          password: userData.Password,
          email: userData.Email,
          birth: userData.Birth
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    const { movies, onMovieClick } = this.props;
    const { userData, password, passwordConfirmed, birth, email } = this.state;
    if (!movies || !userData) return null;

    return (
      <div className="profile-view">
        {/* Close View */}
        <div className="profile-close">
          <Link to={`/`}>
            <button className="close">Movies</button>
          </Link>
          <button
            className="close"
            id="save-user"
            onClick={() => this.onSaveUser()}
          >
            Save
          </button>
          <button className="close" id="delete-user" onClick={() => this.onUserDelete()}>
            Delete
          </button>
        </div>
        {/* Close View End */}

        {/* Username */}
        <div className="profile-title">
          <div className="label">Username</div>
          <div className="value">{userData.Username}</div>
        </div>
        {/* Username End */}

        {/* Password */}
        <div className="profile-password">
          <div className="label">Password</div>
          <input
            type="password"
            className="value"
            id="password"
            onChange={e => {
              this.setState({ password: e.target.value });
              userData.Password = password;
            }}
          />
          <div className="label">Confirm Password</div>
          <input
            type="password"
            className="value"
            id="password-confirmed"
            onChange={e => this.setState({ passwordConfirmed: e.target.value })}
          />
          {password !== passwordConfirmed ? (
            <div className="info">Passwords do not match.</div>
          ) : (
            <div></div>
          )}
        </div>
        {/* Password End */}

        {/* Email */}
        <div className="profile-email">
          <div className="label">Email</div>
          <input
            type="email"
            className="value"
            value={userData.Email}
            onChange={e => {
              this.setState({ email: e.target.value });
              userData.Email = email;
            }}
          />
        </div>
        {/* Email End */}

        {/* Birth */}
        <div className="profile-birth">
          <div className="label">
            Birth {new Date(userData.Birth).toLocaleDateString()}
          </div>
          <input
            type="date"
            className="value"
            onChange={e => {
              this.setState({ birth: e.target.value });
              userData.Birth = birth;
            }}
          />
        </div>
        {/* Birth End */}

        {/* Favorite Movies */}
        <div className="label">Favorite Movies</div>
        <div className="favorite-movie-container">
          {userData ? (
            userData.FavoriteMovies.map(id => {
              const movie = movies.find(m => id === m._id);
              return (
                <MovieCard
                  key={id}
                  movie={movie}
                  onMovieClick={() => onMovieClick(movie)}
                />
              );
            })
          ) : (
            <div>No movies yet.</div>
          )}
        </div>
        {/* Favorite Movies End */}
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired
};

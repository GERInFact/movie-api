import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { movie } = this.props;

    return (
      <div className="movie-card">
        <Link to={`/movies/${movie.Title}`}>
          <img src={movie.ImageUrl} />
          <h2>{movie.Title}</h2>
          <p> by {movie.Director.Name}</p>
          <h3>{movie.Description.slice(0, 30)}...</h3>
        </Link>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
};

import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";

import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { movie } = this.props;
    if (!movie) return null;

    return (
      <div className="movie-view">
        {/* Title */}
        <div className="movie-title">
          <div className="label">Title</div>
          <div className="value">{movie.Title}</div>
        </div>
        {/* Title End */}

        {/* Description */}
        <div className="movie-description">
          <div className="label">Description</div>
          <div className="value">{movie.Description}</div>
        </div>
        {/* Description End */}

        {/* Poster */}
        <img className="movie-poster" src={movie.ImageUrl} />
        {/* Poster End */}

        {/* Genre */}
        <div className="movie-genre">
          <Link to={`/genre/${movie.Genre.Name}`}>
            <div className="label">Genre</div>
            <div className="value">{movie.Genre.Name}</div>
          </Link>
        </div>
        {/* Genre End */}

        {/* Director */}
        <div className="movie-director">
          <Link to={`/directors/${movie.Director.Name}`}>
            <div className="label">Director</div>
            <div className="value">{movie.Director.Name}</div>
          </Link>
        </div>
        {/* Director End */}

        {/* Close View */}
        <div className="movie-close">
          <Link to={`/`}>
            <button className="close">
              Return
            </button>
          </Link>
        </div>
        {/* Close View End */}
      </div>
    );
  }
}

MovieView.propTypes = {
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

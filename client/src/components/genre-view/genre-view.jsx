import React from "react";
import PropTypes from "prop-types";
import "./genre-view.scss";

import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { movie } = this.props;
    if (!movie || !movie.Genre) return null;

    return (
      <div className="genre-view">
        {/* Title */}
        <div className="genre-name">
          <div className="label">Name</div>
          <div className="value">{movie.Genre.Name}</div>
        </div>
        {/* Title End */}

        {/* Description */}
        <div className="genre-description">
          <div className="label">Description</div>
          <div className="value">{movie.Genre.Description}</div>
        </div>
        {/* Description End */}


        {/* Close View */}
        <div className="genre-close">
          <Link to={`/movies/${movie.Title}`}>
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

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
};

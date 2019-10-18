import React from "react";
import ProtoTypes from "prop-types";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        {movie.Title} by {movie.Director.Name}
      </div>
    );
  }

}

MovieCard.protoTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
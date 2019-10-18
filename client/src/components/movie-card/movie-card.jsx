import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        <img src={movie.ImageUrl}/>
        {movie.Title} by {movie.Director.Name}
      </div>
    );
  }

}

MovieCard.protoTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
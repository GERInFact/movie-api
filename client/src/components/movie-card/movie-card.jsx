import React from "react";
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

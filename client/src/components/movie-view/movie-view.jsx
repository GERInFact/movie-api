import React from "react";
import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { movie, onClose } = this.props;
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
        <img className="movie-poster" src={movie.ImagePath} />
        {/* Poster End */}

        {/* Genre */}
        <div className="movie-genre">
          <div className="label">Genre</div>
          <div className="value">{movie.Genre.Name}</div>
        </div>
        {/* Genre End */}

        {/* Director */}
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value">{movie.Director.Name}</div>
        </div>
        {/* Director End */}

        {/* Close View */}
        <div className="movie-close">
          <button className="close" onClick={() => onClose()}>Return</button>
        </div>
        {/* Close View End */}
        
      </div>
    );
  }
}

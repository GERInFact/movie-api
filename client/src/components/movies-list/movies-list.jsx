import React from "react";
import { connect } from "react-redux";

import "./movies-list.scss";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, onMovieClick } = props;
  let filteredMovies = movies;

  if (visibilityFilter) {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }
  if (!movies) return <div className="main-view"></div>;

  return (<div className="movies-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} className="filter-bar"/>
      {filteredMovies.map(m => <MovieCard key={m._id} movie={m} onMovieClick={(m) => onMovieClick(m)}/>)}
  </div>)
}

export default connect(mapStateToProps)(MoviesList);
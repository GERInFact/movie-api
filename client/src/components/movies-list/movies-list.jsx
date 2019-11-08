import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./movies-list.scss";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import SortFilterDropdown from "../sort-filter-dropdown/sort-filter-dropdown";

import { MovieCard } from "../movie-card/movie-card";

function MoviesList(props) {
  const { movies, visibilityFilter, sortFilter, onMovieClick } = props;
  let filteredMovies = movies;

  if (visibilityFilter) {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  switch (sortFilter) {
    case "Movie Title":
      filteredMovies.sort((a, b) => (a.Title > b.Title ? 1 : -1));
      break;
    case "Movie Director":
      filteredMovies.sort((a,b) => (a.Director.Name > b.Director.Name) ? 1: -1);
      break;
  }

  if (!movies) return <div className="main-view"></div>;

  return (
    <div className="movies-list">
      <VisibilityFilterInput
        visibilityFilter={visibilityFilter}
        className="filter-bar"
      />
      <SortFilterDropdown sortFilter={sortFilter} />
      {filteredMovies.map(m => (
        <MovieCard key={m._id} movie={m} onMovieClick={() => onMovieClick(m)} />
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  const { visibilityFilter, sortFilter } = state;
  return { visibilityFilter, sortFilter };
};

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      ImageUrl: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.exact({
        _id: PropTypes.string,
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string
      })
    })
  )
};

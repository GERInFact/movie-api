import React from "react";
import PropTypes from "prop-types";
import "./director-view.scss";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { director, previousMovie } = this.props;
    if (!director) return null;

    return (
      <div className="director-view">
        {/* Title */}
        <div className="director-name">
          <div className="label">Name</div>
          <div className="value">{director.Name}</div>
        </div>
        {/* Title End */}

        {/* Description */}
        <div className="director-bio">
          <div className="label">Bio</div>
          <div className="value">{director.Bio}</div>
        </div>
        {/* Description End */}

        {/* Description */}
        <div className="director-birth">
          <div className="label">Birth</div>
          <div className="value">{director.Birthyear}</div>
        </div>
        {/* Description End */}

        {/* Description */}
        <div className="director-death">
          <div className="label">Death</div>
          <div className="value">{director.Deathyear || "alive"}</div>
        </div>
        {/* Description End */}

        {/* Close View */}
        <div className="director-close">
          <Link
            to={
              previousMovie && previousMovie.Title
                ? `/movies/${previousMovie.Title}`
                : "/"
            }
          >
            <button className="close">Return</button>
          </Link>
        </div>
        {/* Close View End */}
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string.isRequired,
    Deathyear: PropTypes.string
  }).isRequired
};

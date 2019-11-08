import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import "./sort-filter-doopdwn.scss";

// get bootstrap imports
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { setSortFilter } from '../../actions/actions';

function SortFilterDropdown(props) {
  const { sortFilter } = props;
  let dropdownTitle = 'Sort by';
  if (sortFilter) {
    dropdownTitle = `Sort by ${sortFilter}`;
  }
  return (
    <ButtonToolbar className="sort-action">
      <DropdownButton
        variant="outline-secondary"
        title={dropdownTitle}
        onSelect={(eventKey) => { props.setSortFilter(eventKey);}}
      >
        <Dropdown.Item eventKey=''>None</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="Movie Title">Movie Title</Dropdown.Item>
      </DropdownButton>
  </ButtonToolbar>    
 
  );
}

export default connect( null, { setSortFilter })(SortFilterDropdown);

SortFilterDropdown.propTypes = {
    sortFilter: PropTypes.func.isRequired
  };
  
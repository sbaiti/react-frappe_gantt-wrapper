import React, { Component } from 'react';
import DateRangeFilter from './DateRangeFilter';
import { Button } from 'react-bootstrap';

class DateFilterController extends Component {
  state = {
    isFilterOpen: false
  };

  handleToggleFilter = () =>
    this.setState(({ isFilterOpen }) => ({
      isFilterOpen: !isFilterOpen
    }));

  render() {
    const { isFilterOpen } = this.state;

    return (
      <div className="date__filter__container">
        <Button
          bsSize="large"
          bsStyle={isFilterOpen ? 'primary' : 'default'}
          onClick={this.handleToggleFilter}
        >
          date range
        </Button>
        {this.state.isFilterOpen && (
          <div className="date__filter__wrapper">
            <div className="arrow__up" />
            <DateRangeFilter {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

export default DateFilterController;

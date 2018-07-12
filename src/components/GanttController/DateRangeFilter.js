import React from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { isEmpty } from 'lodash';

function DateRangeFilter(props) {
  const { handleFilterChange, dateRangeValue } = props;
  const { start, end } = dateRangeValue;
  return (
    <div className="date__filter">
      <div className="date__range__info">
        <h3>{(start && start.format('YYYY-MM-DD')) || '..'}</h3>
        --
        <h3>{(end && end.format('YYYY-MM-DD')) || '..'}</h3>
      </div>
      <DateRangePicker
        value={!isEmpty(dateRangeValue) ? dateRangeValue : null}
        onSelect={handleFilterChange}
        singleDateRange={true}
      />
    </div>
  );
}

export default DateRangeFilter;

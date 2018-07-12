import React from 'react';
import ViewModeController from './ViewModeController';
import DateFilterController from './DateFilterController';
import TaskLabelProperty from './TaskLabelProperty';
import './styles.css';

function GanttController(props) {
  const {
    handleChangeViewMode,
    handleFilterChange,
    handleEditTaskLabel,
    viewMode,
    dateRangeValue,
    fields
  } = props;
  return (
    <div className="controller__container">
      <div className="diag__title">Digramm gantt for React</div>
      <div className="controllers__wrapper">
        <ViewModeController
          handleChangeViewMode={handleChangeViewMode}
          viewMode={viewMode}
        />
        <DateFilterController
          dateRangeValue={dateRangeValue}
          handleFilterChange={handleFilterChange}
        />
        <TaskLabelProperty
          fields={fields}
          handleEditTaskLabel={handleEditTaskLabel}
        />
      </div>
    </div>
  );
}
export default GanttController;

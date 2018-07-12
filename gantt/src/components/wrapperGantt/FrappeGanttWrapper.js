import React, { Component } from 'react';
import Gantt from '../../gantt';
import './css.css';
class FrappeGanttWrapper extends Component {
  constructor() {
    super();
    this.ganttRef = null;
  }
  componentDidMount() {
    const {
      handleDateChange,
      handleClick,
      handleProgressChange,
      appTasks,
      viewMode
    } = this.props;

    this.gantt_chart = new Gantt(this.ganttRef, appTasks, {
      on_click: handleClick,
      on_date_change: handleDateChange,
      on_progress_change: handleProgressChange
      //on_view_change: handleViewChange
    });
    this.gantt_chart.change_view_mode(viewMode);
  }

  componentDidUpdate() {
    this.gantt_chart.refresh(this.props.appTasks);
    this.gantt_chart.change_view_mode(this.props.viewMode);
  }

  render() {
    return (
      <div className="gantt__wrapper">
        <div ref={ref => (this.ganttRef = ref)} />
      </div>
    );
  }
}

export default FrappeGanttWrapper;

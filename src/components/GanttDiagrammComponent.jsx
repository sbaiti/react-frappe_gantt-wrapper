import React, { Component } from 'react';
import FrappeGanttWrapper from './wrapperGantt';
import TasksInfo from './TasksInfo/index';

import {
  filter,
  reduce,
  findIndex,
  keys,
  values,
  map,
  omit,
  isEqual
} from 'lodash';
import PropTypes from 'prop-types';
import Resizable from 're-resizable';

import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';

import './Component.css';

const transfromDataProviderToTasks = (dataProvider, fields) => {
  return map(
    (dataProvider || []).slice(0, 50).reduce(fieldsReducer(fields), {}),
    task => ({
      ...task,
      start: new Date(task.start).toISOString(),
      end: new Date(task.end).toISOString()
    })
  );
};

const fieldsReducer = fieldsCfg => (acc, item) => {
  const transformedItem = reduce(
    fieldsCfg,
    (acc, val, key) => {
      if (item[val]) {
        return {
          ...acc,
          [key]: item[val]
        };
      }
      return acc;
    },
    {}
  );
  if (keys(transformedItem).length > 0) {
    return [...acc, { ...transformedItem, ...omit(item, values(fieldsCfg)) }];
  }
  return [...acc, { ...item }];
};

class GanttDiagrammComponent extends Component {
  constructor(props) {
    super(props);
    const { dataProvider, fields } = props;
    this.state = {
      tasks: transfromDataProviderToTasks(dataProvider, fields)
    };
  }

  static staticMethod = () => {
    return 'static method has been called.';
  };

  handleDateChange = (task, start, end) => {
    this.setState(({ tasks }) => {
      const taskIndex = findIndex(tasks, { id: task.id });
      return {
        tasks: [
          ...tasks.slice(0, taskIndex),
          {
            ...task,
            start: new Date(start).toISOString(),
            end: new Date(end).toISOString()
          },
          ...tasks.slice(taskIndex + 1, tasks.length)
        ]
      };
    });
  };

  filterTasksByStartEndDate = (tasks, start, end) =>
    filter(
      tasks,
      task => isAfter(task.start, start) && isBefore(task.end, end)
    );

  componentWillReceiveProps(newProps) {
    if (
      !isEqual(
        transfromDataProviderToTasks(newProps.dataProvider, newProps.fields),
        this.state.tasks
      )
    ) {
      this.setState({
        tasks: transfromDataProviderToTasks(
          newProps.dataProvider,
          newProps.fields
        )
      });
    }
  }

  // static getDerivedStateFromProps(nextProps, state) {
  //   console.log('getDerivedStateFromProps');
  //   // avoid update when befor component constructor
  //   if (!nextProps.dataProvider || !state.tasks) {
  //     return null;
  //   }
  //   if (
  //     !isEqual(
  //       transfromDataProviderToTasks(nextProps.dataProvider, nextProps.fields),
  //       state.tasks
  //     )
  //   ) {
  //     console.log('updated dataProvider');
  //     const nextTasks = {
  //       tasks: transfromDataProviderToTasks(
  //         nextProps.dataProvider,
  //         nextProps.fields
  //       )
  //     };
  //     console.log('//////////', nextTasks);
  //     return nextTasks;
  //   }
  //   return null;
  // }

  render() {
    if (this.props.dataProvider === null) {
      return (
        <div className="gantt__filter">
          <h1> the dataProvider is null !</h1>
        </div>
      );
    }

    const {
      dateRangeValue,
      fields,
      handleClick,
      viewMode,
      listWidth
    } = this.props;

    const { tasks } = this.state;
    const { start, end } = dateRangeValue;

    const filteredTasks = this.filterTasksByStartEndDate(tasks, start, end);

    const effectiveTasks = start && end ? filteredTasks : tasks;

    if (!effectiveTasks.length) {
      return (
        <div className="gantt__filter">
          <h1>there is no tasks still after filter !</h1>
        </div>
      );
    }
    return (
      <div className="gantt__container">
        <Resizable defaultSize={{ width: listWidth }}>
          <div className="gantt__list">
            <TasksInfo tasks={effectiveTasks} fields={fields} />
          </div>
        </Resizable>

        <div className="gantt__component">
          <FrappeGanttWrapper
            appTasks={effectiveTasks}
            handleClick={handleClick}
            handleDateChange={this.handleDateChange}
            viewMode={viewMode}
          />
        </div>
      </div>
    );
  }
}
GanttDiagrammComponent.propTypes = {
  dataProvider: PropTypes.array,
  viewMode: PropTypes.string,
  dateRangeValue: PropTypes.object,
  fields: PropTypes.object
};
export default GanttDiagrammComponent;

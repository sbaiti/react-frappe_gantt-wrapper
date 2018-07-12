import React from 'react';
import format from 'date-fns/format';
import './index.css';

const formatDDMM = date => format(date, 'MM-DD');

const TasksInfoHeader = x => (
  <div className="task__item__header">
    <div className="task__name">
      <span className="glyphicon glyphicon-user" />
      {x || 'NAME'}
    </div>
    <div className="task__times">
      <div>start</div>
      <div>end</div>
    </div>
  </div>
);

function TaskItem({ task, propertylabel, renderSwitch }) {
  const star = task.start;
  return (
    <div className="task__item">
      <div className="task__name">
        <span className="glyphicon glyphicon-user" />
        {renderSwitch(propertylabel, task)}
      </div>
      <div className="task__times">
        <div>{task.start.substring(5, 10)}</div>
        <div>{formatDDMM(task.end)}</div>
      </div>
    </div>
  );
}

export default class TasksInfo extends React.Component {
  renderSwitch = (propertylabel, task) => {
    switch (propertylabel) {
      case '':
        return task.name;
      case 'ART':
        return task.ART;
      case 'ROWID':
        return task.id;
      case 'KALENDER':
        return task.KALENDER;
      case 'BEMERKUNG':
        return task.BEMERKUNG;
      case 'BEARBEITER':
        return task.BEARBEITER;
      case 'HOMEPAGE':
        return task.HOMEPAGE;
      case 'BENUTZER':
        return task.BENUTZER;
      case 'ID':
        return task.ID;
      case 'EVENTERSTELLER':
        return task.EVENTERSTELLER;
      case null:
        return task.name;
      default:
        return task.name;
    }
  };
  render() {
    const { tasks, fields } = this.props;
    return (
      <div className="task__info__container">
        {TasksInfoHeader(fields.propertylabel)}
        <div className="tasks__info__wrapper">
          {tasks.map((task, key) => (
            <TaskItem
              task={task}
              propertylabel={fields.propertylabel}
              key={key}
              renderSwitch={this.renderSwitch}
            />
          ))}
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { GanttDiagrammComponent } from './components';
import GanttController from './components/GanttController/index';

import { dataProvider } from './data/data';
import './App.css';

class App extends Component {
  state = {
    viewMode: 'Day',
    dateRangeValue: {},
    dataProvider,
    fields: {
      id: 'ROWID',
      start: 'START',
      end: 'ENDE',
      name: 'NAME',
      listFieldProperty: [
        'NAME',
        'ROWID',
        'KALENDER',
        'ART',
        'BEMERKUNG',
        'BEARBEITER',
        'HOMEPAGE',
        'BENUTZER',
        'ID',
        'EVENTERSTELLER'
      ],
      propertylabel: '',
      fields: {
        id: 'ROWID',
        start: 'START',
        end: 'ENDE',
        name: 'NAME'
      }
    },
    listWidth: '350px'
  };

  handleChangeViewMode = value => this.setState({ viewMode: value });

  handleInitiateStartEndDate = () =>
    this.setState({ startDate: null, endDate: null });

  handleEditTaskLabel = newTaskLabel =>
    this.setState({ fields: { propertylabel: newTaskLabel } });

  handleFilterChange = dateRangeValue =>
    this.setState({
      dateRangeValue
    });

  handleClick = task => console.log('task', task);

  handleViewChange = mode => {
    console.log('mode', mode);
  };

  customPopupHtml = task => {
    const end_date = task._end.format('MMM D');
    return `
          <div class="details-container">
            <h5>${task.name}</h5>
            <p>Expected to finish by ${end_date}</p>
            <p>${task.progress}% completed!</p>
          </div>
        `;
  };

  handleOnDataProviderChange() {
    this.setState(({ dataProvider }) => ({
      dataProvider: dataProvider.slice(0, 5)
    }));
  }

  componentDidMount() {
    setTimeout(() => {
      this.handleOnDataProviderChange();
    }, 5000);
  }

  render() {
    const {
      dataProvider,
      dateRangeValue,
      fields,
      viewMode,
      listWidth
    } = this.state;
    const {
      handleClick,
      handleEditTaskLabel,
      handleFilterChange,
      handleChangeViewMode
    } = this;

    const controllerProps = {
      handleChangeViewMode,
      handleFilterChange,
      handleEditTaskLabel,
      fields,
      viewMode,
      dateRangeValue
    };

    return (
      <div className="gantt">
        <GanttController {...controllerProps} />
        <GanttDiagrammComponent
          listWidth={listWidth}
          viewMode={viewMode}
          dataProvider={dataProvider}
          dateRangeValue={dateRangeValue}
          fields={fields}
          handleClick={handleClick}
        />
      </div>
    );
  }
}

export default App;

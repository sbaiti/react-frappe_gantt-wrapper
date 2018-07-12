import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button } from 'react-bootstrap';

class TaskLabelProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      options: this.handleMakeOptionSelect(this.props.fields.listFieldProperty),
      isLabelOpen: false
    };
  }
  handleToggleLabel = () =>
    this.setState(({ isLabelOpen }) => ({
      isLabelOpen: !isLabelOpen
    }));

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.handleEditTaskLabel(selectedOption.value);
  };

  handleMakeOptionSelect = x => {
    const a = x.map((elem, key) => ({
      value: elem,
      label: elem
    }));
    return a;
  };
  render() {
    const { isLabelOpen, selectedOption } = this.state;
    return (
      <div className="label__Property__container">
        <Button
          bsSize="large"
          bsStyle={isLabelOpen ? 'primary' : 'default'}
          onClick={this.handleToggleLabel}
        >
          task label
        </Button>
        {this.state.isLabelOpen && (
          <div className="date__filter__wrapper">
            <div className="arrow__up" />
            <div className="date__filter">
              <div className="date__range__info">
                <Select
                  style={{
                    width: '250px',
                    height: '15px'
                  }}
                  name="form-field-name"
                  value={selectedOption || 'name'}
                  onChange={this.handleChange}
                  options={this.state.options}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TaskLabelProperty;

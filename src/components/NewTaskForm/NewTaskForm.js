import { Component } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  static defaultProps = {
    addNewTask: () => {},
  };

  static propTypes = {
    addNewTask: PropTypes.func,
  };

  state = {
    label: '',
  };

  keys = {
    Escape: () => {
      this.setState(() => ({
        label: '',
      }));
    },

    Enter: () => {
      this.props.addNewTask(this.state.label);
      this.setState(() => ({
        label: '',
      }));
    },
  };

  onLabelChange = (e) => {
    this.setState(() => ({
      label: e.target.value,
    }));
  };

  onLabelSubmit = (e) => {
    const { key } = e;
    const text = e.target.value.trim();
    if (this.keys.hasOwnProperty(key) && text !== '') {
      this.keys[key]();
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
          onKeyUp={this.onLabelSubmit}
        />
      </header>
    );
  }
}

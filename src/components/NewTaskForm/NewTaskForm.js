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
    mins: '',
    seconds: '',
  };

  keys = {
    Escape: () => {
      this.setState(() => ({
        label: '',
        mins: '',
        seconds: '',
      }));
    },

    Enter: () => {
      this.props.addNewTask(this.state.label, this.state.mins, this.state.seconds);
      this.setState(() => ({
        label: '',
        mins: '',
        seconds: '',
      }));
    },
  };

  onMinsChange = (e) => {
    this.setState(() => ({
      mins: e.target.value,
    }));
  };

  onSecondsChange = (e) => {
    this.setState(() => ({
      seconds: e.target.value,
    }));
  };

  onLabelChange = (e) => {
    this.setState(() => ({
      label: e.target.value,
    }));
  };

  onLabelSubmit = (e) => {
    const { key } = e;
    const text = e.target.value.trim();
    if (this.keys.hasOwnProperty(key) && text !== '' && this.state.mins !== '' && this.state.seconds !== '') {
      this.keys[key]();
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            type="text"
            autoFocus
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
            onKeyUp={this.onLabelSubmit}
          />
          <input
            type="text"
            pattern="^([0-5]?[0-9])$"
            maxLength={2}
            value={this.state.mins}
            onChange={this.onMinsChange}
            className="new-todo-form__timer"
            placeholder="Min"
            onKeyUp={this.onLabelSubmit}
          />
          <input
            type="text"
            pattern="^([0-5]?[0-9])$"
            maxLength={2}
            value={this.state.seconds}
            onChange={this.onSecondsChange}
            className="new-todo-form__timer"
            placeholder="Sec"
            onKeyUp={this.onLabelSubmit}
          />
        </form>
      </header>
    );
  }
}

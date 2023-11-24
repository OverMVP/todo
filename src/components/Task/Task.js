import { Component } from 'react';
import './Task.css';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    label: '',
    creationTime: 'created N-mins ago',
    onDeleted: () => {},
    editing: false,
    completed: false,
    onToggleDone: () => {},
    onClickEdit: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    creationTime: PropTypes.string,
    onDeleted: PropTypes.func,
    editing: PropTypes.bool,
    completed: PropTypes.bool,
    onToggleDone: PropTypes.func,
    onClickEdit: PropTypes.func,
  };

  state = {
    label: this.props.label || '',
  };

  onChangeInput = (e) => {
    e.preventDefault();
    const text = e.target.value;
    this.setState(() => ({
      label: text,
    }));
  };

  onEditing = (e) => {
    const { key } = e;
    const text = e.target.value.trim();
    const { onChangeEdit } = this.props;
    if (key === 'Enter' && text !== '') {
      onChangeEdit(this.props.id, text);
      return;
    }
    if (key === 'Escape') {
      this.props.onClickEdit();
      this.setState(() => ({
        label: this.props.label || '',
      }));
    }
  };

  onBlurEdit = () => {
    this.props.onClickEdit();
    this.setState(() => ({
      label: this.props.label || '',
    }));
  };

  render() {
    const { label, creationTime, onDeleted, editing, completed, onToggleDone, onClickEdit } = this.props;

    let liClass = '';

    if (completed) {
      liClass = 'completed';
    }

    if (editing) {
      liClass = 'editing';
    }

    const editModeInput = (
      <input
        onBlur={this.onBlurEdit}
        type="text"
        className="edit"
        autoFocus
        value={this.state.label}
        onChange={this.onChangeInput}
        onKeyUp={this.onEditing}
      />
    );

    return (
      <li className={liClass}>
        <div className="view">
          <input checked={completed} className="toggle" type="checkbox" onChange={onToggleDone} />
          <label htmlFor="desription">
            <span id="description" className="description" value={label}>
              {label}
            </span>
            <span className="created">{creationTime}</span>
          </label>
          <button type="button" onClick={onClickEdit} className="icon icon-edit" />
          <button type="button" onClick={onDeleted} className="icon icon-destroy" />
        </div>
        {editing ? editModeInput : null}
      </li>
    );
  }
}

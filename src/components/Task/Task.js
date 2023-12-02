import { Component } from 'react';
import './Task.css';
import PropTypes from 'prop-types';

function convertToMMSS(timeLeft) {
  const mins = Math.floor(timeLeft / 60);
  const seconds = timeLeft - mins * 60;

  return [mins <= 9 ? `0${mins}` : mins, seconds <= 9 ? `0${seconds}` : seconds];
}

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
    isCounting: false,
    timeLeft: this.props.timeLeft,
  };

  componentDidMount() {
    const savedTimeLeft = Number(sessionStorage.getItem(`${this.props.label}`));
    const savedIsCounting = sessionStorage.getItem(`${this.props.label}State`);

    if (savedIsCounting === 'true') {
      this.onClickStart();
    }

    if (savedTimeLeft || savedTimeLeft === 0) {
      this.setState({
        timeLeft: savedTimeLeft,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.timeLeft !== this.state.timeLeft) {
      sessionStorage.setItem(`${this.props.label}`, `${this.state.timeLeft}`);
    }

    if (prevState.isCounting !== this.state.isCounting) {
      sessionStorage.setItem(`${this.props.label}State`, this.state.isCounting);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChangeInput = (e) => {
    e.preventDefault();
    const text = e.target.value;
    this.setState(() => ({
      label: text,
    }));
  };

  onClickStart = () => {
    if (this.state.isCounting || this.props.completed) {
      return;
    }
    this.setState({
      isCounting: true,
    });

    this.interval = setInterval(() => {
      if (!this.state.isCounting) {
        clearInterval(this.interval);
      }

      if (this.state.timeLeft > 0) {
        this.setState(({ timeLeft }) => ({
          timeLeft: timeLeft - 1,
        }));
      } else {
        this.props.onToggleDone();
        clearInterval(this.interval);
        this.onClickStop();
        console.log(this.state.timeLeft);
      }
    }, 1000);
  };

  onClickStop = () => {
    this.setState({
      isCounting: false,
    });
    clearInterval(this.interval);
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
    const { timeLeft } = this.state;
    const timeArr = convertToMMSS(timeLeft);
    const [mins, secs] = timeArr;

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
            <div className="timer-button-group">
              <button type="button" className="icon icon-play" onClick={this.onClickStart} />
              <button type="button" className="icon icon-pause" onClick={this.onClickStop} />
              <span className="time">
                {mins}:{secs}
              </span>
            </div>

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

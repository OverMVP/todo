import { Component } from 'react';
import './TaskFilter.css';
import PropTypes from 'prop-types';

export default class TaskFilter extends Component {
  static defaultProps = {
    onFilterAll: () => {},
    onFilterActive: () => {},
    onFilterCompleted: () => {},
  };

  static propTypes = {
    onFilterAll: PropTypes.func,
    onFilterActive: PropTypes.func,
    onFilterCompleted: PropTypes.func,
  };

  state = {
    selected: 'all',
  };

  // returns boolean
  isRadioSelected = (value) => this.state.selected === value;

  // setState to value of the radioBtn
  handleRadioClick = (e) => {
    this.setState(() => ({
      selected: e.target.value,
    }));
  };

  render() {
    const {
      filters: { onFilterAll, onFilterActive, onFilterCompleted },
    } = this.props;

    return (
      <form className="filters">
        <fieldset>
          <div>
            <input
              checked={this.isRadioSelected('all')}
              id="all"
              name="filter"
              type="radio"
              value="all"
              onClick={onFilterAll}
              onChange={this.handleRadioClick}
            />
            <label htmlFor="all">All</label>

            <input
              checked={this.isRadioSelected('active')}
              id="active"
              name="filter"
              type="radio"
              value="active"
              onChange={this.handleRadioClick}
              onClick={onFilterActive}
            />
            <label htmlFor="active">Active</label>

            <input
              checked={this.isRadioSelected('completed')}
              id="completed"
              name="filter"
              type="radio"
              value="completed"
              onClick={onFilterCompleted}
              onChange={this.handleRadioClick}
            />
            <label htmlFor="completed">Completed</label>
          </div>
        </fieldset>
      </form>
    );
  }
}

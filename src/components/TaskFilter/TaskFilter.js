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
            <label htmlFor="all">
              <input
                checked={this.isRadioSelected('all')}
                id="all"
                name="filter"
                type="radio"
                value="all"
                onClick={onFilterAll}
                onChange={this.handleRadioClick}
              />
              All
            </label>

            <label htmlFor="active">
              <input
                checked={this.isRadioSelected('active')}
                id="active"
                name="filter"
                type="radio"
                value="active"
                onChange={this.handleRadioClick}
                onClick={onFilterActive}
              />
              Active
            </label>

            <label htmlFor="completed">
              <input
                checked={this.isRadioSelected('completed')}
                id="completed"
                name="filter"
                type="radio"
                value="completed"
                onClick={onFilterCompleted}
                onChange={this.handleRadioClick}
              />
              Completed
            </label>
          </div>
        </fieldset>
      </form>
    );
  }
}

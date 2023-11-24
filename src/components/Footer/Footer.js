import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter';
import './Footer.css';

Footer.defaultProps = {
  tasksLeft: 0,
  clearCompleted: () => {},
  filters: {},
};

Footer.propTypes = {
  tasksLeft: PropTypes.number,
  clearCompleted: PropTypes.func,
  filters: PropTypes.objectOf(PropTypes.func),
};

function Footer({ tasksLeft, clearCompleted, filters }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter filters={filters} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;

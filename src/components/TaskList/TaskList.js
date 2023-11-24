import PropTypes from 'prop-types';

import Task from '../Task';
import './TaskList.css';

TaskList.defaultProps = {
  todos: [
    {
      label: 'ERR: todos is default props now',
      creationTime: 'just now',
      id: 'default prop',
      completed: false,
      editing: false,
    },
  ],
  onDeleted: () => {},
  onToggleDone: () => {},
  onClickEdit: () => {},
  onChangeEdit: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      creationTime: PropTypes.string,
      id: PropTypes.string,
      completed: PropTypes.bool,
      editing: PropTypes.bool,
    })
  ),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onClickEdit: PropTypes.func,
  onChangeEdit: PropTypes.func,
};

function TaskList({ todos, onDeleted, onClickEdit, onToggleDone, onChangeEdit }) {
  const list = todos.map((item) => {
    const { id, ...rest } = item;
    return (
      <Task
        onChangeEdit={onChangeEdit}
        onClickEdit={() => onClickEdit(id)}
        onToggleDone={() => onToggleDone(id)}
        onDeleted={() => onDeleted(id)}
        id={id}
        key={id}
        {...rest}
      />
    );
  });

  return <ul className="todo-list">{list}</ul>;
}

export default TaskList;

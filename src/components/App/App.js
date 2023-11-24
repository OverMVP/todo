import { formatDistanceToNow } from 'date-fns';
import { nanoid } from 'nanoid';
import { Component } from 'react';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import './App.css';

export default class App extends Component {
  state = {
    tasks: [
      this.createTodoItem('Drink a Beer'),
      this.createTodoItem('Drink One More Beer'),
      this.createTodoItem('Become a Senior Dev'),
    ],
    filter: 'all',
  };

  // Got functions into the obj to make it drill easier
  filters = {
    onFilterAll: () => {
      this.setState(() => ({
        filter: 'all',
      }));
    },
    onFilterCompleted: () => {
      this.setState(() => ({
        filter: 'completed',
      }));
    },
    onFilterActive: () => {
      this.setState(() => ({
        filter: 'active',
      }));
    },
  };

  // When clicking edit Btn
  onClickEdit = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => id === el.id);
      const targetElement = tasks[idx];
      const newElement = {
        ...targetElement,
        editing: !targetElement.editing,
      };
      const newArr = [...tasks.slice(0, idx), newElement, ...tasks.slice(idx + 1)];

      return {
        tasks: newArr,
      };
    });
  };

  // When changing task input is opened
  onChangeEdit = (id, text) => {
    const label = this.validateAndTrim(text);
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => id === el.id);
      const targetElement = tasks[idx];
      const editedElement = {
        ...targetElement,
        label,
        editing: false,
      };
      const newArr = [...tasks.slice(0, idx), editedElement, ...tasks.slice(idx + 1)];
      return {
        tasks: newArr,
      };
    });
  };

  // When marking a task as done
  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => id === el.id);
      const targetElement = tasks[idx];
      const newElement = {
        ...targetElement,
        completed: !targetElement.completed,
      };
      const newArr = [...tasks.slice(0, idx), newElement, ...tasks.slice(idx + 1)];

      return {
        tasks: newArr,
      };
    });
  };

  // When pressing delete btn
  onDeleted = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => id === el.id);
      const newArr = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
      return {
        tasks: newArr,
      };
    });
  };

  // function that add a new Task into the tasks array
  addNewTask = (text) => {
    const label = this.validateAndTrim(text);
    this.setState(({ tasks }) => {
      const newEl = this.createTodoItem(label);
      const newArr = [...tasks.slice(0), newEl];
      return {
        tasks: newArr,
      };
    });
  };

  // function calls when clearCompletedBtn is pressed
  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const newArr = tasks.filter((el) => !el.completed);
      if (tasks.length !== newArr.length) {
        return {
          tasks: newArr,
        };
      }
    });
  };

  // function for creation an item (object) of the tasks array (made to avoid a boilerplate code) !!! using inside AddNewTask.fn
  createTodoItem(text) {
    return {
      label: text,
      creationTime: formatDistanceToNow(new Date()),
      completed: false,
      editing: false,
      id: nanoid(),
    };
  }

  // validating input (trim and adds "..." if string.length > 20)
  validateAndTrim(text) {
    const textBefore = text.trim();
    let textAfter;
    if (text.length > 19) {
      textAfter = `${textBefore.slice(0, 19)}...`;
      return textAfter;
    }
    return textBefore;
  }

  // filter logic
  filter(items, filter) {
    const filters = {
      all: () => items,
      active: () => items.filter((item) => !item.completed),
      completed: () => items.filter((item) => item.completed),
    };
    return filters.hasOwnProperty(filter) ? filters[filter]() : null;
  }

  render() {
    const { tasks, filter } = this.state;
    const tasksLeft = tasks.filter((el) => !el.completed).length;
    const filteredItems = this.filter(tasks, filter);

    return (
      <section className="todoapp">
        <NewTaskForm addNewTask={this.addNewTask} />
        <section className="main">
          <TaskList
            onDeleted={this.onDeleted}
            todos={filteredItems}
            onClickEdit={this.onClickEdit}
            onToggleDone={this.onToggleDone}
            onChangeEdit={this.onChangeEdit}
          />
          <Footer filters={this.filters} tasksLeft={tasksLeft} clearCompleted={this.clearCompleted} />
        </section>
      </section>
    );
  }
}

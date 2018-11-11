import {html} from 'lit-html';
import {repeat} from 'lit-html/directives/repeat';
import {component, useState, useEffect} from '@matthewp/haunted';
import {blockStyle} from './block-style';
import {router} from './router';
import {store} from './todo-store';
import './check-list';
import './check-item';

function TodoManager(host) {
  const filters = {
    all: () => true,
    active: todo => !todo.checked,
    completed: todo => todo.checked
  };

  const routes = {
    '/': () => setFilter('all'),
    '/active': () => setFilter('active'),
    '/completed': () => setFilter('completed')
  };

  const [filter, setFilter] = useState('all');
  const [state, _setState] = useState(store());
  const setState = newState => {
    store(newState);
    _setState(newState);
  };
  const todos = state.todos;
  const hasTodos = !!todos.length;
  const activeLength = todos.filter(todo => filters.active(todo)).length;
  const completedLength = todos.length - activeLength;
  const pluralizeActive = activeLength !== 1;

  router(routes);

  useEffect(() => {
    host.shadowRoot.querySelector('input[name=text]').focus();
  }, []);

  useEffect(() => {
    const editable = host.shadowRoot.querySelector('.editing input');
    if (editable) editable.select();
  });

  return html`
    ${blockStyle}

    <style>
      form > input {min-width: 130px;}
      check-item {display: inline;}
      check-item[checked] > span {text-decoration: line-through;}
      .selected {text-decoration: none;}
      footer > * {margin-right: 10px;}
    </style>

    <h1>todos</h1>

    <form @submit=${_onSubmitTodo()}>
      <input
        type=checkbox
        .hidden=${!hasTodos}
        .checked=${!activeLength}
        @change=${_onChangeTodoChecked()}
      >

      <input name=text placeholder="What needs to be done?">
    </form>

    <!-- TODO: error when setting prop .hidden on nested component -->
    <check-list ?hidden=${!hasTodos}>
      ${repeat(todos, todo => todo.id, todo => html`
        <div .hidden=${!filters[filter](todo)}>
          <check-item
            class=${todo.editing ? 'editing' : ''}
            .checked=${todo.checked}
            @change=${_onChangeTodoChecked(todo)}
          >
            <input
              .value=${todo.text}
              .hidden=${!todo.editing}
              @keydown=${_onKeydownTodoEdit(todo)}
              @blur=${_onBlurTodoEdit(todo)}
            >

            <span
              .hidden=${todo.editing}
              @dblclick=${_onDblclickTodo(todo)}
            >${todo.text}</span>
          </check-item>

          <button
            @click=${_onRemoveTodosClick(todo)}
            .hidden=${todo.editing}
          >&times;</button>
        </div>
      `)}
    </check-list>

    <footer .hidden=${!hasTodos}>
      <i>${activeLength} item${pluralizeActive ? 's' : ''} left</i>
      <span>
        <a href=#/ class=${filter === 'all' ? 'selected': ''}>All</a>
        <a href=#/active class=${filter === 'active' ? 'selected': ''}>Active</a>
        <a href=#/completed class=${filter === 'completed' ? 'selected': ''}>Completed</a>
      </span>
      <button
        .hidden=${!completedLength}
        @click=${_onRemoveTodosClick()}
      >Clear completed</button>
    </footer>
  `

  function _addTodo(todo) {
    todo = {...todo, id: state.lastId + 1};
    setState({...state, lastId: todo.id, todos: [...state.todos, todo]});
  }

  // todo arg optional, noarg = all
  function _updateTodos(patch, todo) {
    if (patch.text != null && !patch.text.length) {
      _removeTodos(todo);
    } else {
      setState({...state, todos: state.todos.map(t => {
        return todo && t !== todo ? t : {...t, ...patch};
      })});
    }
  }

  // todo arg optional, noarg = all completed
  function _removeTodos(todo) {
    setState({...state, todos: state.todos.filter(
      todo ? t => t !== todo : filters.active
    )});
  }

  function _onSubmitTodo() {
    return evt => {
      evt.preventDefault();

      const value = evt.target.text.value.trim();
      if (value) {
        _addTodo({text: value});
        evt.target.reset();
      }
    }
  }

  function _onChangeTodoChecked(todo) {
    return evt => {
      // ignore change event of edit todo text input
      if (!evt.target.matches('check-item, [type=checkbox]')) return;
      _updateTodos({checked: evt.target.checked}, todo);
    }
  }

  function _onRemoveTodosClick(todo) {
    return () => _removeTodos(todo);
  }

  function _onDblclickTodo(todo) {
    return evt => {
      _updateTodos({editing: true}, todo);
    }
  }

  function _onKeydownTodoEdit(todo) {
    return evt => {
      if (evt.key === 'Enter') {
        _updateTodos({editing: false, text: evt.target.value.trim()}, todo);
      } else if (evt.key === 'Escape') {
        // TODO: figure out why input is holding old value, workaround for now
        evt.target.value = todo.text;
        _updateTodos({editing: false}, todo);
      }
    }
  }

  function _onBlurTodoEdit(todo) {
    return evt => {
      if (!todo.editing) return;
      _updateTodos({editing: false, text: evt.target.value.trim()}, todo);
    }
  }
}

customElements.define('todo-manager', component(TodoManager));

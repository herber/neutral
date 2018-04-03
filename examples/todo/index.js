const neutral = require('neutral/lib/index.js');
const xou = require('xou');
const vxv = require('vxv');

vxv`
:global(body) {
  background: #f6e58d;
  max-width: 600px;
  color: deeppink;
  margin: auto;
  margin-top: 100px;
  text-align: center;
  font-family: sans-serif;

  & input {
    background: transparent;
    border: none;
    border-bottom: solid deeppink 2px;
    padding: 7px;
    outline: none;
  }

  & button {
    border: solid deeppink 2px;
    background: none;
    // font-size: 16px;
    padding: 7px 20px;
    transition: all .3s;

    &:hover {
      background: deeppink;
      color: white;
    }
  }

  & ul {
    list-style-type: none;
  }

  & li:hover {
    text-decoration: line-through;
  }
}
`;

const app = neutral({ initial: () => ({
  title: 'Neutral - TODO',
  todos: [{
    value: 'Buy milk',
    deleted: false
  }, {
    value: 'Make Neutral usable',
    deleted: false
  }]
})});

app.state.action((state) => ({
  addTodo: (value) => {
    const todos = app.state.state().todos;
    todos.push({ value, deleted: false });

    app.state.setState({ todos });
  },
  deleteTodo: (value) => {
    const todos = app.state.state().todos;

    const newTodos = todos.map((todo) => {
      if (todo.value == value) {
        return { value: todo.value, deleted: true };
      } else {
        return todo;
      }
    })

    app.state.setState({ todos: newTodos });
  }
}));

app.route('/', (state) => {
  const add = (e) => {
    e.preventDefault();

    const input = document.querySelector('#new').value;
    state.actions().addTodo(input);
  };

  const del = (val) => {
    state.actions().deleteTodo(val);
  };

  return xou`<div>
    <ul>${ state.state().todos.map((todo) => {
      if (!todo.deleted) {
        return xou`<li onclick=${ () => del(todo.value) }>${ todo.value }</li>`;
      } else {
        return '';
      }
    }) }</ul>
    <form onsubmit=${ (e) => add(e) }>
      <input type="text" placeholder="new todo" id="new">
      <button type="submit">Add</button>
    </form>
  </div>`;
});

app.mount('body');

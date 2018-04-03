const neutral = require('../../lib/');
const html = require('xou');
const app = neutral({
  initial: () => ({
    title: 'Hello world'
  })
});

app.state.setState({ count: 0 });

app.route('/', state => {
  const countUp = () => {
    state.setState({ count: app.state.state().count + 1 });
  };

  return html`<div>
    <h1>Hello world.</h1>
    <a href="/about">About</a><br>
    <a href="/nope">Not found</a>
    <p>Count: ${state.state().count}</p>
    <button onclick=${() => countUp()}>+1</button>
  </div>`;
});

app.route('/about', state => {
  return html`<div>
    <h1>About.</h1>
    <p>This is a single page JavaScript app it runs on the first working version of <a href="https://github.com/herber/neutral">Neutral</a> (a new frontend framework that comes with batteries included).</p>
    <a href="/">Home</a>
  </div>`;
});

app.mount('body');

const neutral = require('../dist/neutral.js');
const xou = require('xou');

const app = neutral({
  initial: () => ({
    foo: 'bar'
  })
});

window.location = { href: '/' };

test('state', done => {
  app.route('/*', state => {
    expect(state.state().foo).toBe('bar');
    state.setState({ foo: 'baz' });
    expect(state.state().foo).toBe('baz');

    done();

    return xou`<h1>Test</h1>`;
  });
});

app.mount('body');

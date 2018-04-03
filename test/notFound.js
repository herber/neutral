const neutral = require('../dist/neutral.js');

const app = neutral();

window.location = { href: '/index' };

test('state', done => {
  app.route('/index', state => {
    return xou`<h1>Test</h1>`;
  });

  app.route('/xyz', state => {
    return xou`<h1>Other</h1>`;
  });

  setTimeout(() => {
    window.location = { href: '/xyz' };

    setTimeout(() => {
      done();
    }, 100);
  }, 100);
});

app.mount(document.body);

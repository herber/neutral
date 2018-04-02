const ready = require('document-ready');
const shipharbor = require('shipharbor');
const nation = require('nation');
const routeChanged = require('route-changed');
const xou = require('xou');
const mitt = require('mitt');
const nanohref = require('nanohref');

const neutral = (opts) => {
  opts = opts || {};

  const router = new shipharbor();
  const emitter = mitt();
  const state = nation(opts);
  let outerNode = null;
  let node = xou`<div class="__neutral_placeholder"></div>`;
  let params = null;
  let handler = null;
  let renderable = false;
  let prevState = null;

  state.onChange(() => emitter.emit('state-changed'));

  const mount = (selector) => {
    ready(() => {
      if (typeof selector == 'string') selector = document.querySelector(selector);
      outerNode = xou`<div class="__neutral"></div>`;
      selector.appendChild(outerNode);

      renderable = true;
      _init();
    });
  };

  const _init = () => {
    emitter.emit('route-changed');
    outerNode.appendChild(node);
  };

  const route = (path, renderFn) => {
    router.add(path, () => {
      handler = renderFn;
    });
  };

  emitter.on('route-changed', () => {
    const match = router.match(window.location.pathname);

    if (match !== false) {
      match.handler();
      const params = match.params;
      emitter.emit('render');
    } else {
      handler = () => {
        return xou`<div><p style="font-family: sans-serif; text-align: center; line-height: calc(100vh - 3em); white-space: nowrap; font-size: 1.5em">
          <b>Neutral</b> - Not found
        </p></div>`;
      };

      emitter.emit('render');
    }
  });

  emitter.on('state-changed', () => emitter.emit('render'));

  emitter.on('render', () => {
    if (renderable === true && prevState !== state.state()) {
      window.requestAnimationFrame(() => {
        const newNode = handler(state, { emitter });
        xou.update(node, newNode);
      });
    }

    document.title = state.state().title || 'Neutral App';
  });

  routeChanged(() => {
    emitter.emit('route-changed')
  });

  nanohref((location) => {
    history.pushState({}, state.state().title || 'Neutral App', location);
    emitter.emit('route-changed');
  })

  return {
    emitter,
    state,
    mount,
    route
  };
};

module.exports = neutral;

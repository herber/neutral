const ready = require('document-ready');
const shipharbor = require('shipharbor');
const nation = require('nation');
const routeChanged = require('route-changed');
const xou = require('xou');
const assigner = require('assigner');
const mitt = require('mitt');

class Neutral {
  constructor(opts) {
    this.state = nation(opts);
    this.router = new shipharbor();
    this.emitter = mitt();
  }

  route(path, handler) {
    this.router.add('path', (params) => {
      this.state.setState({ params: null });
      this.state.setState({ params });
      this.node.firstChild.remove();
      this.node.appendChild(handler(state));
    })
  }

  mount(selector) {
    ready(() => {
      if (typeof selector == 'string') selector = document.querySelector(selector);
      this.node = xou`<div class="__nation"></div>`;
      selector.appendChild(this.node);
    });
  }
}

module.exports Neutral;

const neutral = require('../lib/');
const html = require('xou');
const vxv = require('vxv');

vxv`
:global(body) {
  margin: 0px;
  padding: 0px;
  top: 0px;
  left: 0px;
}

:global(hr) {
  max-width: 100px;
  background: black;
  height: 5px;
  border: none;
  display: inline;
}
`;

const homeStyle = vxv`
  font-family: sans-serif;
  text-align: center;
  font-size: 1.4em;
  background: #cdecff;
  height: 70vh;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & h1, & p {
    padding: 20px 0px;
    margin: 0px;
  }
`;

const app = neutral();

app.state.setState({
  title: '🚀 Neutral'
});

app.route('/', () => {
  return html`<div class="${homeStyle}">
    <h1>🚀 Neutral</h1>
    <hr>
    <p>The JavaScript framework that comes with batteries included.</p>
  </div>`;
});

app.mount(document.body);

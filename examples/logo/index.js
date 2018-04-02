const neutral = require('../../lib/');
const html = require('xou');
const vxv = require('vxv');

vxv`
:global(body) {
  background: #cdecff;
}
`

const homeStyle = vxv`
  font-family: sans-serif;
  text-align: center;
  margin-top: calc(50vh - 2em);
  font-size: 1.7em;
`;

const app = neutral();

app.state.setState({
  title: '🚀 Neutral'
});

app.route('/', () => {
  return html`<div class="${ homeStyle }">
    <h1>🚀 Neutral</h1>
  </div>`;
})

app.mount(document.body);

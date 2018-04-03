const neutral = require('../../lib/');
const html = require('xou');
const vxv = require('vxv');

const app = neutral();

vxv`
:global(body) {
  background: mistyrose;
}
`;

const homeStyle = vxv`
  font-family: sans-serif;
  color: deeppink;
  text-align: center;
  margin-top: 40vh;

  & a {
    color: deeppink;
  }
`;

app.route('/', () => {
  return html`<div class="${homeStyle}">
    <h1><a href="https://github.com/herber/neutral">Neutral</a> + <a href="https://github.com/herber/vxv">VXV</a></h1>
    <p>Neutral handles the content and the functionality - VXV handles the styles.</p>
  </div>`;
});

app.mount('body');

backbonejs-jquerymobile-sample
==============================

A demo of one way to create jQuery Mobile Applications with jQuery Mobile.

This app is built using [anvil.js](http://appendto.github.com/anvil.js/), so to run the demo, install [node.js](http://nodejs.org).

Then run...

```bash
npm install -g anvil.js
```

Next,

```bash
anvil install anvil.http
```

And finally,

```bash
anvil --host --ci --browser
```

This will run the demo app at `localhost:3080` in CI mode. Any time a file changes, the browser is automatically refreshed.

The `--browser` flag causes the default browser to open pointed to the url.
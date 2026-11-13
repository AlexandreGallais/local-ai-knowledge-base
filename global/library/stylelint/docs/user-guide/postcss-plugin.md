---
title: "PostCSS plugin"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/docs/user-guide/postcss-plugin.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# PostCSS plugin

As with any other PostCSS plugin, you can use Stylelint's PostCSS plugin either with a PostCSS runner or with the PostCSS JS API directly.

_However, we recommend using the CLI or Node.js API (directly or via an integration) as they provide better reporting._

## Options

The PostCSS plugin uses the standard options, _except the `customSyntax` option_. Instead, the syntax must be set within the PostCSS options as there can only be one parser/syntax in a pipeline.

## Usage examples

We recommend you lint your CSS before applying any transformations. You can do this by either:

- creating a separate lint task that is independent of your build one.
- using the `plugins` option of `postcss-import` or `postcss-easy-import` to lint your files before any transformations.
- placing Stylelint at the beginning of your plugin pipeline.

You'll also need to use a reporter. _The Stylelint plugin registers warnings via PostCSS_. Therefore, you'll want to use it with a PostCSS runner that prints warnings or another PostCSS plugin whose purpose is to format and print warnings (e.g. `postcss-reporter`).

### Example A

A separate lint task that uses the plugin via the PostCSS JS API to lint SCSS using `postcss-scss`.

```js
import fs from "node:fs";
import postcss from "postcss";
import scss from "postcss-scss";
import reporter from "postcss-reporter";
import stylelint from "stylelint";

// Code to be processed
const code = fs.readFileSync("input.scss", "utf8");

postcss([
  stylelint({/* your options */}),
  reporter({ clearReportedMessages: true })
])
  .process(code, {
    from: "input.scss",
    syntax: scss
  })
  .then(() => {})
  .catch((err) => console.error(err.stack));
```

The same pattern can be used to lint other syntaxes, such as SugarSS.

### Example B

A combined lint and build task where the plugin is used via the PostCSS JS API, but within `postcss-import` (using its `plugins` option) so that the source files are linted before any transformations.

```js
import fs from "node:fs";
import postcss from "postcss";
import atImport from "postcss-import";
import reporter from "postcss-reporter";
import stylelint from "stylelint";

// CSS to be processed
const css = fs.readFileSync("lib/app.css", "utf8");

postcss([
  atImport({
    plugins: [stylelint({/* your options */})]
  }),
  reporter({ clearReportedMessages: true })
])
  .process(css, {
    from: "lib/app.css",
    to: "app.css"
  })
  .then((result) => {
    fs.writeFileSync("app.css", result.css);
  })
  .catch((err) => console.error(err.stack));
```

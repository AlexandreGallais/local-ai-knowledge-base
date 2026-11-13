---
title: "npm-start"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-start.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-start

### Description

This runs a predefined command specified in the `"start"` property of a package's `"scripts"` object.

If the `"scripts"` object does not define a  `"start"` property, npm will run `node server.js`.

Note that this is different from the default node behavior of running the file specified in a package's `"main"` attribute when evoking with `node .`

As of `user@example.com`, you can use custom arguments when executing scripts.
Refer to `npm run` for more details.

### Example

```json
{
  "scripts": {
    "start": "node foo.js"
  }
}
```

```bash
npm start

> user@example.com start
> node foo.js

(foo.js output would be here)

```

### See Also

* npm run
* npm scripts
* npm test
* npm restart
* npm stop

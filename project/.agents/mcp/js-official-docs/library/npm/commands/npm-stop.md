---
title: "npm-stop"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-stop.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-stop

### Description

This runs a predefined command specified in the "stop" property of a package's "scripts" object.

Unlike with npm start, there is no default script that will run if the `"stop"` property is not defined.

### Example

```json
{
  "scripts": {
    "stop": "node bar.js"
  }
}
```

```bash
npm stop

> user@example.com stop
> node bar.js

(bar.js output would be here)

```

### See Also

* npm run
* npm scripts
* npm test
* npm start
* npm restart

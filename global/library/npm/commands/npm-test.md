---
title: "npm-test"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-test.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-test

### Description

This runs a predefined command specified in the `"test"` property of a package's `"scripts"` object.

### Example

```json
{
  "scripts": {
    "test": "node test.js"
  }
}
```

```bash
npm test
> user@example.com test
> node test.js

(test.js output would be here)
```

### See Also

* npm run
* npm scripts
* npm start
* npm restart
* npm stop

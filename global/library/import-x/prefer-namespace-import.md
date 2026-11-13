---
title: "import-x/prefer-namespace-import"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/prefer-namespace-import.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/prefer-namespace-import

🔧 This rule is automatically fixable by the `--fix` CLI option.

Enforce using namespace imports for specific modules, like `react`/`react-dom`, etc.

## Rule Details

### rule schema

```jsonc
{
  "import-x/prefer-namespace-import": [
    "error", // or "off", "warn"
    {
      "patterns": [
        // Exact match
        "foo",
        // RegExp
        "/^prefix-/",
      ],
    },
  ],
}
```

### Config Options

`patterns` is an array of strings or `RegExp` patterns that specify which modules should be imported using namespace imports.

#### Example

```js
/*eslint import-x/prefer-namespace-import: [2, { patterns: ['react'] }]*/

// bad
import React from 'react'

// good
import * as React from 'react'

// ignored
import ReactDOM from 'react-dom'
```

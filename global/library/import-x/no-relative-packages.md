---
title: "import-x/no-relative-packages"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-relative-packages.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-relative-packages

🔧 This rule is automatically fixable by the `--fix` CLI option.

Use this rule to prevent importing packages through relative paths.

It's useful in a monorepo setup, where it's possible to import a sibling package using `../package` relative path, while direct `package` is the correct one.

## Examples

Given the following folder structure:

```pt
my-project
├── packages
│   ├── foo
│   │   ├── index.js
│   │   └── package.json
│   └── bar
│       ├── index.js
│       └── package.json
└── entry.js
```

And the .eslintrc file:

```json
{
  ...
  "rules": {
    "import-x/no-relative-packages": "error"
  }
}
```

The following patterns are considered problems:

```js
/** In my-project/packages/foo.js */

import bar from '../bar' // Import sibling package using relative path
import entry from '../../entry.js' // Import from parent package using relative path

/** In my-project/entry.js */

import bar from './packages/bar' // Import child package using relative path
```

The following patterns are NOT considered problems:

```js
/** In my-project/packages/foo.js */

import bar from 'bar' // Import sibling package using package name

/** In my-project/entry.js */

import bar from 'bar' // Import sibling package using package name
```

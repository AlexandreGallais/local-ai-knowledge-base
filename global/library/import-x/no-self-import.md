---
title: "import-x/no-self-import"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-self-import.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-self-import

Forbid a module from importing itself. This can sometimes happen during refactoring.

## Rule Details

### Fail

```js
// foo.js
import foo from './foo'

const foo = require('./foo')
```

```js
// index.js
import index from '.'

const index = require('.')
```

### Pass

```js
// foo.js
import bar from './bar'

const bar = require('./bar')
```

---
title: "import-x/no-dynamic-require"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-dynamic-require.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-dynamic-require

The `require` method from CommonJS is used to import modules from different files. Unlike the ES6 `import` syntax, it can be given expressions that will be resolved at runtime. While this is sometimes necessary and useful, in most cases it isn't. Using expressions (for instance, concatenating a path and variable) as the argument makes it harder for tools to do static code analysis, or to find where in the codebase a module is used.

This rule forbids every call to `require()` that uses expressions for the module name argument.

## Options

This rule supports the following options:

### `esmodule`

By default, this rule does not report dynamic `import()` expressions.

Given `{ "esmodule": true }`:

### Fail

```js
import(name)
import('../' + name)
import(`../${name}`)
import(name())
```

### Pass

```js
import('foo')
import(`foo`)
import('./foo')
import('@scope/foo')
```

## Rule Details

### Fail

```js
require(name)
require('../' + name)
require(`../${name}`)
require(name())
```

### Pass

```js
require('../name')
require(`../name`)
```

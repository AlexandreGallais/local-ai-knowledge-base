---
title: "import-x/exports-last"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/exports-last.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/exports-last

This rule enforces that all exports are declared at the bottom of the file. This rule will report any export declarations that comes before any non-export statements.

## This will be reported

```js

const bool = true

export default bool

const str = 'foo'

```

```js

export const bool = true

const str = 'foo'

```

## This will not be reported

```js
const arr = ['bar']

export const bool = true

export default bool

export function func() {
  console.log('Hello World 🌍')
}

export const str = 'foo'
```

## When Not To Use It

If you don't mind exports being sprinkled throughout a file, you may not want to enable this rule.

### ES6 exports only

The exports-last rule is currently only working on ES6 exports. You may not want to enable this rule if you're using CommonJS exports.

If you need CommonJS support feel free to open an issue or create a PR.

---
title: "import-x/no-default-export"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-default-export.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-default-export

Prohibit default exports. Mostly an inverse of [`prefer-default-export`].

## Rule Details

The following patterns are considered warnings:

```javascript
// bad1.js

// There is a default export.
export const foo = 'foo'
const bar = 'bar'
export default 'bar'
```

```javascript
// bad2.js

// There is a default export.
const foo = 'foo'
export { foo as default }
```

The following patterns are not warnings:

```javascript
// good1.js

// There is only a single module export and it's a named export.
export const foo = 'foo'
```

```javascript
// good2.js

// There is more than one named export in the module.
export const foo = 'foo'
export const bar = 'bar'
```

```javascript
// good3.js

// There is more than one named export in the module
const foo = 'foo'
const bar = 'bar'
export { foo, bar }
```

```javascript
// export-star.js

// Any batch export will disable this rule. The remote module is not inspected.
export * from './other-module'
```

## When Not To Use It

If you don't care if default imports are used, or if you prefer default imports over named imports.

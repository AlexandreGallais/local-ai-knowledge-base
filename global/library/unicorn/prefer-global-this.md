---
title: "prefer-global-this"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-global-this.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-global-this

📝 Prefer `globalThis` over `window`, `self`, and `global`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule will enforce the use of `globalThis` over `window`, `self`, and `global`.

`globalThis` is the standard cross-environment reference, so it keeps code portable between browsers, Node.js, and other JavaScript runtimes.

However, there are several exceptions that remain permitted:

1. Certain window-specific APIs, such as `window.innerHeight`
2. Window-specific events, such as `window.addEventListener('resize')`
3. Computed property access on `window`, such as `window[foo]`
4. `typeof` existence checks, such as `typeof window === 'undefined'`

The complete list of permitted APIs can be found in the rule's source code.

## Examples

```js
// ❌
window;

// ✅
globalThis;
```

```js
// ❌
window.foo;

// ✅
globalThis.foo;
```

```js
// ❌
global;

// ✅
globalThis;
```

```js
// ❌
global.foo;

// ✅
globalThis.foo;
```

```js
// ❌
const {foo} = window;

// ✅
const {foo} = globalThis;
```

```js
// ❌
window.navigator;

// ✅
globalThis.navigator;
```

```js
// ❌
window.location;

// ✅
globalThis.location;
```

```js
// ✅
window.innerWidth;

// ✅
window.innerHeight;
```

```js
// ✅
typeof window === 'undefined';

// ✅
typeof window === 'object';
```

```js
// ❌
window.addEventListener('click', () => {});

// ✅
globalThis.addEventListener('click', () => {});

// ✅
window.addEventListener('resize', () => {});

// ✅
window.addEventListener('load', () => {});

// ✅
window.addEventListener('unload', () => {});
```

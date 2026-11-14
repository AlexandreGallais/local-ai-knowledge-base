---
title: "prefer-query-selector"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-query-selector.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-query-selector

📝 Prefer `.querySelector()` and `.querySelectorAll()` over older DOM query methods.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

It's better to use the same method to query DOM elements. This helps keep consistency and it lends itself to future improvements (e.g. more specific selectors).

## Examples

```js
// ❌
document.getElementById('foo');

// ✅
document.querySelector('#foo');
```

```js
// ❌
document.getElementsByClassName('foo');

// ✅
document.querySelectorAll('.foo');
```

```js
// ❌
document.getElementsByClassName('foo bar');

// ✅
document.querySelectorAll('.foo.bar');
```

```js
// ❌
document.getElementsByTagName('main');

// ✅
document.querySelectorAll('main');
```

```js
const singleClassName = 'foo';

// ❌
document.getElementsByClassName(singleClassName);

// ✅
document.querySelectorAll(`.${CSS.escape(singleClassName)}`);
```

```js
// ❌
document.getElementsByTagName('form')[0];

// ✅
document.querySelector('form');
```

## Options

### `allowWithVariables`

Type: `boolean`\
Default: `false`

When set to `true`, allows using `.getElementById()` and `.getElementsByClassName()` when called with a variable or expression. This avoids the need to manually compose a CSS selector string, which can be less readable.

```js
// eslint unicorn/prefer-query-selector: ["error", {"allowWithVariables": true}]

// ✅ Allowed - variable argument
document.getElementById(someId);
document.getElementsByClassName(someClass);

// ❌ Still reported - literal argument
document.getElementById('foo');
document.getElementsByClassName('foo');

// ❌ Still reported - getElementsByTagName and getElementsByName are never allowed
document.getElementsByTagName(someTag);
document.getElementsByName(someName);
```

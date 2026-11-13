---
title: "no-console-spaces"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-console-spaces.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-console-spaces

📝 Do not use leading/trailing space between `console.log` parameters.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

The `console.log()` method and similar methods joins the parameters with a space, so adding a leading/trailing space to a parameter, results in two spaces being added.

## Examples

```js
// ❌
console.log('abc ', 'def');

// ❌
console.log('abc', ' def');

// ❌
console.log("abc ", " def");

// ❌
console.log(`abc `, ` def`);

// ✅
console.log('abc', 'def');
```

```js
// ❌
console.debug('abc ', 'def');

// ✅
console.debug('abc', 'def');
```

```js
// ❌
console.info('abc ', 'def');

// ✅
console.info('abc', 'def');
```

```js
// ❌
console.warn('abc ', 'def');

// ✅
console.warn('abc', 'def');
```

```js
// ❌
console.error('abc ', 'def');

// ✅
console.error('abc', 'def');
```

```js
// ✅
console.log('abc ');

// ✅
console.log(' abc');
```

```js
// ✅
console.log('abc  ', 'def');

// ✅
console.log('abc\t', 'def');

// ✅
console.log('abc\n', 'def');
```

```js
// ✅ A space that belongs to an escape sequence, removing it would break the literal
console.log('a\ ', 'def');
```

---
title: "no-keyword-prefix"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-keyword-prefix.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-keyword-prefix

📝 Disallow identifiers starting with `new` or `class`.

🚫 Disabled by default.

`new Foo` and `newFoo` look very similar. Use alternatives that do not look like keyword usage.

## Examples

```js
// ❌
const newFoo = 'foo';

// ❌
const classFoo = 'foo';

// ✅
const foo = 'foo';

// ✅
const _newFoo = 'foo';

// ✅
const new_foo = 'foo';

// ✅
const fooNew = 'foo';
```

## Options

### `disallowedPrefixes`

If you want a custom list of disallowed prefixes you can set them with `disallowedPrefixes`:

```js
/* eslint unicorn/no-keyword-prefix: ["error", {"disallowedPrefixes": ["new", "for"]}] */
// ✅
const classFoo = "a";

// ❌
const forFoo = "a";
```

The default is `["new", "class"]`.

### `checkProperties`

If you want to disable this rule for properties, set `checkProperties` to `false`:

```js
/* eslint unicorn/no-keyword-prefix: ["error", {"checkProperties": true}] */
// ❌
foo.newFoo = 2;

// ✅
foo.foo = 2;
```

```js
/* eslint unicorn/no-keyword-prefix: ["error", {"checkProperties": false}] */
// ✅
var foo = {newFoo: 1}; // pass

// ✅
foo.newFoo = 2; // pass
```

### `onlyCamelCase`

The default behavior is to check for camel case usage. If you want to disallow the prefix entirely, set `onlyCamelCase` to `false`:

```js
/* eslint unicorn/no-keyword-prefix: ["error", {"onlyCamelCase": true}] */
// ✅
const new_foo = "foo";
```

```js
/* eslint unicorn/no-keyword-prefix: ["error", {"onlyCamelCase": false}] */
// ❌
const new_foo = "foo";

// ✅
const foo = "foo";
```

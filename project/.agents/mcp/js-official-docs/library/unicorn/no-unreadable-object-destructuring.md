---
title: "no-unreadable-object-destructuring"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unreadable-object-destructuring.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unreadable-object-destructuring

📝 Disallow unreadable object destructuring.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

Destructuring is very useful, but it can also make some code harder to read. This rule prevents hard-to-read object destructuring patterns, including assigning destructured values to object properties.

## Examples

```js
// ✅
const {foo} = object;
```

```js
// ✅
const {foo: bar = defaultValue} = object;
```

```js
// ✅
const {foo: {bar}} = object;
```

```js
// ❌
const {[key]: value} = object;

// ✅
const value = object[key];
```

A computed key is allowed when the same pattern collects a rest element, since that is the only way to exclude a dynamic property from the rest.

```js
// ✅
const {[key]: value, ...rest} = object;
```

```js
// ❌
const {foo: [bar]} = object;

// ✅
const [bar] = object.foo;
```

```js
// ❌
const {foo: {bar: {baz}}} = object;

// ✅
const {baz} = object.foo.bar;
```

```js
// ❌
({foo: object.property} = object);

// ✅
({foo} = object);
object.property = foo;
```

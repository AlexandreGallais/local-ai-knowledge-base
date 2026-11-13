---
title: "max-nested-calls"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/max-nested-calls.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# max-nested-calls

📝 Limit the depth of nested calls.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

Deeply nested calls make code hard to read. Extract intermediate results to named variables instead.

This rule counts calls and constructor calls passed into other calls or constructors. Fluent receiver chains and JSX wrappers are ignored.

## Examples

```js
// ❌
foo(bar(baz(qux())));

// ✅
const value = baz(qux());
foo(bar(value));
```

```js
// ✅
query().filter().map().toArray();
```

## Options

### max

Type: `integer`\
Default: `3`

The maximum allowed nested call depth.

```js
/* eslint unicorn/max-nested-calls: ["error", {"max": 4}] */
// ✅
foo(bar(baz(qux())));
```

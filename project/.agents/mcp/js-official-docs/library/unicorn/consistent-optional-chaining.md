---
title: "consistent-optional-chaining"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/consistent-optional-chaining.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# consistent-optional-chaining

📝 Enforce consistent optional chaining for same-base member access.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Enforce consistent optional chaining for same-base member access in logical expressions.

Using optional chaining consistently for the same base makes nullish behavior easier to see and avoids visually similar expressions that handle missing values differently.

This rule intentionally handles only direct member access on both sides of `&&` or `||`. It does not rewrite broad truthiness checks like `foo && foo.bar` to `foo?.bar`, because that can change runtime values.

## Examples

```js
// ❌
foo?.bar || foo.baz;

// ✅
foo?.bar || foo?.baz;
```

```js
// ❌
foo.bar || foo?.baz;

// ✅
foo.bar || foo.baz;
```

```js
// ❌
foo?.bar && foo?.baz;

// ✅
foo?.bar && foo.baz;
```

```js
// ❌
foo.bar && foo?.baz;

// ✅
foo.bar && foo.baz;
```

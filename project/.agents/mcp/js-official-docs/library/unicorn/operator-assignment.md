---
title: "operator-assignment"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/operator-assignment.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# operator-assignment

📝 Require assignment operator shorthand where possible.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

This rule is the same as the built-in ESLint `operator-assignment` rule, but it also suggests compound assignment when a template literal starts by interpolating the assigned identifier.

The template literal case is suggestion-only because the change can affect coercion and side-effect ordering for unusual values.

## Replacement for ESLint `operator-assignment`

This rule replaces ESLint's built-in `operator-assignment` rule, which Unicorn presets disable when this rule is enabled.

## Examples

```js
// ❌
foo = foo + bar;

// ✅
foo += bar;
```

```js
// ❌
foo = `${foo} bar`;

// ✅
foo += ` bar`;
```

## Options

This rule supports the same options as ESLint `operator-assignment`.

### `always`

Require assignment operator shorthand where possible. This is the default.

### `never`

Disallow assignment operator shorthand.

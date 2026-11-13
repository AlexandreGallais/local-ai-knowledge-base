---
title: "no-useless-logical-operand"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-logical-operand.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-logical-operand

📝 Disallow unnecessary operands in logical expressions involving boolean literals.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Logical `&&` and `||` expressions return one of their operands. A boolean literal can make part of the expression unnecessary, but it is not always safe to simplify. For example, `value && true` returns `true` for any truthy non-boolean `value`, while `value` would return the original value.

This rule only reports boolean literal operands when the simplification preserves the logical expression value, or when the expression is used only for truthiness. It ignores directive prologue cases where simplifying to a string literal could change strict-mode semantics, and autofixes are skipped when comments could be affected.

It intentionally does not report non-leading absorbing operands like `value && false` or `value || true`. Those expressions still evaluate `value`, so replacing the whole expression with a literal could drop side effects or thrown errors. Use ESLint's `no-constant-binary-expression` rule if you want those suspicious expressions reported without an autofix.

## Examples

```js
// ❌
const value = true && input;
const other = input && true && fallback;

// ✅
const value = input;
const other = input && fallback;
```

```js
// ❌
if (input && true) {}
const value = Boolean(input || false);

// ✅
if (input) {}
const value = Boolean(input);
```

```js
// ❌
const value = false && input;
const other = true || input;

// ✅
const value = false;
const other = true;
```

```js
// Not reported by this rule
const value = input && true;
const other = input || false;
const alwaysFalse = input && false;
const alwaysTrue = input || true;
```

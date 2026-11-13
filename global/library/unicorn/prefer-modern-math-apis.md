---
title: "prefer-modern-math-apis"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-modern-math-apis.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-modern-math-apis

📝 Prefer modern `Math` APIs over legacy patterns.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Standard `Math` methods express mathematical intent directly and are less error-prone than reimplementing them.

Replacements can change rounding, overflow, or underflow behavior. The rule provides an autofix only when it can prove the change preserves behavior; otherwise, it offers a suggestion.

Math additions in ES2015:

- Math.sign()
- Math.trunc()
- Math.cbrt()
- Math.expm1()
- Math.log1p()
- Math.log10()
- Math.log2()
- Math.sinh()
- Math.cosh()
- Math.tanh()
- Math.asinh()
- Math.acosh()
- Math.atanh()
- Math.hypot()
- Math.clz32()
- Math.imul()
- Math.fround()

Currently, we only check a few known cases, but we are open to adding more patterns.

If you find a suitable case for this rule, please open an issue.

## Examples

```js
// ❌
Math.log(x) * Math.LOG10E

// ❌
Math.LOG10E * Math.log(x)

// ❌
Math.log(x) / Math.LN10

// ✅
Math.log10(x)
```

```js
// ❌
Math.log(x) * Math.LOG2E

// ❌
Math.LOG2E * Math.log(x)

// ❌
Math.log(x) / Math.LN2

// ✅
Math.log2(x)
```

```js
// ❌
Math.sqrt(a * a + b * b)

// ❌
Math.sqrt(a ** 2 + b ** 2)

// ✅
Math.hypot(a, b)
```

```js
// ❌
Math.sqrt(x ** 2)

// ✅
Math.abs(x)
```

## Separate rule for `Math.trunc()`

See `unicorn/prefer-math-trunc` rule.

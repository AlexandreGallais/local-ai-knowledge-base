---
title: "no-useless-template-literals"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-template-literals.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-template-literals

📝 Disallow useless template literal expressions.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Template literal expressions are useful when they interpolate dynamic values into surrounding text. They are unnecessary when the expression is already a static value, or when the whole template literal only coerces a single expression to a string.

Expression-only templates get a manual `String(value)` suggestion instead of an autofix because `String()` can differ for values like `Symbol()` or when `String` is shadowed. In TypeScript, dynamic expression-only templates are ignored without type information and reported only when type information shows the replacement is type-compatible; `as const` and `<const>` assertions are always ignored because `String()` cannot be used in a const assertion.

This rule does not replace ESLint's `no-implicit-coercion`. They can be enabled together: `no-implicit-coercion` checks shorthand coercions, while this rule checks useless template literal syntax. The only overlap is expression-only templates like `` `${value}` `` when `no-implicit-coercion` enables `disallowTemplateShorthand`.

Tagged templates are ignored because tags can observe raw template parts and expression boundaries.

## Examples

```js
// ❌
const message = `${'Hello'}`;

// ✅
const message = 'Hello';
```

```js
// ❌
const message = `Hello ${'world'}!`;

// ✅
const message = `Hello world!`;
```

```js
// ❌
const message = `${value}`;

// ✅
const message = String(value);
```

```js
// ✅
const message = tag`${'value'}`;
```

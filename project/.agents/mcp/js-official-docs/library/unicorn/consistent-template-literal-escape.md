---
title: "consistent-template-literal-escape"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/consistent-template-literal-escape.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# consistent-template-literal-escape

📝 Enforce consistent style for escaping `${` in template literals.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When you need to include a literal `${` in a template literal (without it being interpreted as the start of an interpolation), there are multiple ways to escape it. This rule enforces using `\${` (escaping the dollar sign) for consistency, as it's the most intuitive and clearest approach.

## Escaping methods

- `\${` — escape the dollar sign ✅ (recommended)
- `$\{` — escape the opening brace (works, but inconsistent)
- `\$\{` — escape both (redundant)

## Examples

```js
// ❌ - Escaping the brace is inconsistent
const template = `$\{variableName}`;

// ❌ - Escaping both is redundant
const template = `\$\{variableName}`;

// ✅ - Escape the dollar sign
const template = `\${variableName}`;
```

```js
// ✅ - Common use case: template strings for users
const message = `Use \${variable} in your code`;

// ✅ - JavaScript regex pattern
const regex = `/\${pattern}/g`;
```

```js
// ✅ - Normal variable interpolation still works
const name = 'Alice';
const greeting = `Hello ${name}, use \${variable} for templates`;
// → "Hello Alice, use ${variable} for templates"
```

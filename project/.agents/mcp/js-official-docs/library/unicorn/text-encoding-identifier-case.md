---
title: "text-encoding-identifier-case"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/text-encoding-identifier-case.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# text-encoding-identifier-case

📝 Enforce consistent case for text encoding identifiers.

💼 This rule is enabled in the following configs: ✅ `recommended`, 🎨 `recommended-css`, 🌐 `recommended-html`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Consistent encoding spellings avoid visually different forms of the same encoding and make encoding intent easier to scan.

- Enforce `'utf8'` for UTF-8 encoding.
- Enforce `'ascii'` for ASCII encoding.

This rule only auto-fix encoding in `fs.readFile()` and `fs.readFileSync()`.

Module specifiers, like `import utf8 from 'utf-8'` or `require('utf-8')`, are package names, so they are ignored.

When linting CSS files with `@eslint/css`, this rule also checks `@charset` declarations and enforces the dash form (`utf-8`) as required by the CSS specification.

When linting HTML files with `@html-eslint/eslint-plugin`, this rule also checks `<meta charset>` and `<form accept-charset>` attributes.

## Examples

```js
// ❌
await fs.readFile(file, 'UTF-8');

// ✅
await fs.readFile(file, 'utf8');
```

```js
// ❌
await fs.readFile(file, 'ASCII');

// ✅
await fs.readFile(file, 'ascii');
```

```js
// ❌
const string = buffer.toString('utf-8');

// ✅
const string = buffer.toString('utf8');
```

## Options

Type: `object`

### withDash

Type: `boolean`\
Default: `false`

Use WHATWG standard encoding notation with dashes (e.g., ⁠`utf-8` instead of `⁠utf8`).

```js
// ❌
/* eslint unicorn/text-encoding-identifier-case: ["error", {"withDash": true}] */
await fs.readFile(file, 'utf8');
```

```js
// ✅
/* eslint unicorn/text-encoding-identifier-case: ["error", {"withDash": true}] */
await fs.readFile(file, 'utf-8');
```

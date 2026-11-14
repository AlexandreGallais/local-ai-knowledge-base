---
title: "prefer-string-raw"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-string-raw.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-string-raw

📝 Prefer using the `String.raw` tag to avoid escaping `\`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

`String.raw` is a tagged template that allows you to use backslashes without escaping them. This is particularly useful for file paths, regex patterns, and other strings with many backslashes, making the code more readable and less error-prone.

Adding or removing `String.raw` from a template with two or more substitutions can change the order in which the substitutions are converted to strings.

In TypeScript, `String.raw` can widen literal types to `string`. With type information, unsafe conversions are ignored; otherwise, uncertain cases use suggestions. Strings directly under const assertions are always ignored.

## Examples

```js
// ❌
const file = "C:\\windows\\style\\path\\to\\file.js";

// ✅
const file = String.raw`C:\windows\style\path\to\file.js`;
```

```js
// ❌
const regexp = new RegExp('foo\\.bar');

// ✅
const regexp = new RegExp(String.raw`foo\.bar`);
```

```js
// ❌
const file = `C:\\windows\\temp\\myapp-${process.pid}.log`;

// ✅
const file = String.raw`C:\windows\temp\myapp-${process.pid}.log`;
```

`String.raw` should not be used if the string does not contain any `\`.

```js
// ❌
const noBackslash = String.raw`foobar`

// ✅
const noBackslash = 'foobar'
```

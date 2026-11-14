---
title: "prefer-url-href"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-url-href.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-url-href

📝 Prefer `URL#href` over stringifying a `URL`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer `URL#href` over explicit URL stringification.

The `href` property is the native way to get the serialized URL string.

This rule detects direct `new URL()` expressions, references to `const` variables initialized from `new URL()`, TypeScript `URL` annotations, and TypeScript type information when available. It intentionally does not follow assignments or arbitrary aliases without annotations or type information.

## Examples

```js
// ❌
new URL('https://example.com').toString();

// ✅
new URL('https://example.com').href;
```

```js
// ❌
const url = new URL('https://example.com');
String(url);

// ✅
const url = new URL('https://example.com');
url.href;
```

```ts
// ❌
function stringify(url: URL) {
	return url.toString();
}

// ✅
function stringify(url: URL) {
	return url.href;
}
```

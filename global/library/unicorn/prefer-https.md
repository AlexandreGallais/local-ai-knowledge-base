---
title: "prefer-https"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-https.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-https

📝 Prefer HTTPS over HTTP.

💼🚫 This rule is enabled in the following configs: ✅ `recommended`, 🎨 `recommended-css`, 🌐 `recommended-html`, 🧩 `recommended-json`, 📚 `recommended-markdown`, 💎 `recommended-soml`, 🛠️ `recommended-toml`, 📋 `recommended-yaml`. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Using HTTPS avoids sending URLs to public resources over an insecure protocol.

This rule checks source text, including strings, template literals, JSX, comments, and non-JavaScript files when they are linted with ESLint language plugins such as `@eslint/css`, `@eslint/json`, `@eslint/markdown`, and `html-eslint`.

URLs without a public-looking top-level domain are ignored. For example, `http://localhost`, `http://example`, and `http://127.0.0.1` are allowed. Reserved non-public top-level domains are ignored too: `.example`, `.internal`, `.invalid`, `.local`, `.localdomain`, `.localhost`, `.onion`, and `.test`.

Some well-known XML identifiers are also ignored because rewriting them to `https:` would change their meaning.

## Options

### ignore

Type: `Array<string | RegExp>`\
Default: `[]`

Specify URLs or regular expressions to ignore. Strings must start with `http://` and match the complete recognized URL exactly. Regular expressions match the same text, so use `^` and `$` for a full match. They are tested from `lastIndex = 0`, without carrying state between URLs.

```js
'unicorn/prefer-https': [
	'error',
	{
		ignore: [
			'http://example.com/identifier/value',
			/^http:\/\/schemas\.example\.com\//v,
		],
	},
]
```

## Examples

```js
// ❌
const url = 'http://sindresorhus.com';

// ✅
const url = 'https://sindresorhus.com';
```

```js
// ❌
// See http://sindresorhus.com

// ✅
// See https://sindresorhus.com
```

```jsx
// ❌
const element = <a href="http://sindresorhus.com">http://sindresorhus.com</a>;

// ✅
const element = <a href="https://sindresorhus.com">https://sindresorhus.com</a>;
```

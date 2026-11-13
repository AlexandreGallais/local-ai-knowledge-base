---
title: "no-invalid-url-protocol-comparison"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-invalid-url-protocol-comparison.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-invalid-url-protocol-comparison

📝 Disallow invalid protocol strings in comparisons with `URL#protocol`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`URL#protocol` returns a lowercase scheme followed by a colon, such as `'https:'`. Comparing it with `'https'` or `'HTTPS:'` can never match. This rule automatically normalizes protocol strings in equality and inequality comparisons, `switch` cases, inline-array `.includes()`, `.indexOf()`, and `.lastIndexOf()` calls, and inline `new Set([...]).has()` calls.

The rule checks scheme names, including custom schemes such as `'web+demo'`, rather than a fixed list of protocols. Strings must start with an ASCII letter and contain only ASCII letters, digits, `+`, `-`, and `.`, optionally followed by a colon. Other malformed strings and empty strings are ignored.

## Examples

```js
// ❌
const url = new URL('https://example.com');
url.protocol === 'https';
url.protocol !== 'HTTP:';

// ✅
const url = new URL('https://example.com');
url.protocol === 'https:';
url.protocol !== 'http:';
```

```js
// ❌
const url = new URL('https://example.com');
switch (url.protocol) {
	case 'https': {
		break;
	}
}

// ✅
const url = new URL('https://example.com');
switch (url.protocol) {
	case 'https:': {
		break;
	}
}
```

```js
const url = new URL('https://example.com');

// ❌
['http', 'HTTPS:'].includes(url.protocol);
['https'].indexOf(url.protocol) !== -1;
new Set(['http', 'https']).has(url.protocol);

// ✅
['http:', 'https:'].includes(url.protocol);
['https:'].indexOf(url.protocol) !== -1;
new Set(['http:', 'https:']).has(url.protocol);
```

Assigning a colonless protocol is valid and is not reported:

```js
const url = new URL('http://example.com');
url.protocol = 'https';
```

## Detection limits

The rule recognizes `new URL()`, `const` bindings of known URLs, and native TypeScript `URL` annotations, including named imports from `node:url` or `url`. Typed linting additionally recognizes inferred built-in URL types and guarded `URL | string` values.

Only string literals and templates without substitutions are checked. Unknown receivers, URL subclasses, nested member types from Node.js imports, named collections, extracted protocol values, and dynamic strings are ignored. Prefix and substring checks are allowed.

`switch` labels are reported without a fix when another literal label normalizes to the same protocol.

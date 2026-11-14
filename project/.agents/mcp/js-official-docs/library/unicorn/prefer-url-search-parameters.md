---
title: "prefer-url-search-parameters"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-url-search-parameters.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-url-search-parameters

📝 Prefer `URLSearchParams` over manually splitting query strings.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

`URLSearchParams` handles query string parsing, decoding, duplicate names, and empty values. Manually splitting query strings with `.split('&')` and `.split('=')` is easy to get subtly wrong.

This rule reports the common pair-list pipeline shape:

```js
query.split('&').map(part => part.split('='));
```

It also reports the same pipeline when it is passed to `Object.fromEntries()`, `new Map()`, or `new URLSearchParams()`.

The rule intentionally only provides suggestions because replacing manual splitting can change behavior. `URLSearchParams` decodes percent-encoded values, treats `+` as a space when parsing strings, preserves duplicate names, and treats `foo` and `foo=` the same.

## Examples

```js
// ❌
const parameters = Object.fromEntries(query.split('&').map(part => part.split('=')));

// ✅
const parameters = Object.fromEntries(new URLSearchParams(query));
```

```js
// ❌
const parameters = new Map(query.split('&').map(part => part.split('=')));

// ✅
const parameters = new Map(new URLSearchParams(query));
```

```js
// ❌
const parameters = new URLSearchParams(query.split('&').map(part => part.split('=')));

// ✅
const parameters = new URLSearchParams(query);
```

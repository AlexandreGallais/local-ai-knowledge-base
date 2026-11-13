---
title: "no-unnecessary-fetch-options"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unnecessary-fetch-options.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unnecessary-fetch-options

📝 Disallow unnecessary options in `fetch()` and `new Request()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Redundant `fetch()` and `Request` options make the request harder to scan.

The rule removes options that are equivalent to omission. Some `RequestInit` defaults are only equivalent when the input is known not to be an existing `Request`, because omitted options inherit from the input request.

## Examples

```js
// ❌
await fetch('/', {});

// ✅
await fetch('/');
```

```js
// ❌
await fetch('/', {method: 'GET'});

// ✅
await fetch('/');
```

```js
// ❌
await fetch('/', {credentials: 'same-origin'});

// ✅
await fetch('/');
```

```js
// ❌
await fetch(url, {signal: undefined});

// ✅
await fetch(url);
```

```js
// ❌
new Request(url, {body: null});

// ✅
new Request(url);
```

```js
// ✅
await fetch(request, {method: 'GET'});
```

---
title: "no-invalid-fetch-options"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-invalid-fetch-options.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-invalid-fetch-options

📝 Disallow invalid options in `fetch()` and `new Request()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

`fetch()` throws a `TypeError` when the method is `GET` or `HEAD` and a body is provided.

## Examples

```js
// ❌
const response = await fetch('/', {body: 'foo=bar'});
```

```js
// ❌
const request = new Request('/', {body: 'foo=bar'});
```

```js
// ✅
const response = await fetch('/', {method: 'HEAD'});
```

```js
// ✅
const request = new Request('/', {method: 'HEAD'});
```

```js
// ❌
const response = await fetch('/', {method: 'GET', body: 'foo=bar'});

// ✅
const response = await fetch('/', {method: 'POST', body: 'foo=bar'});
```

```js
// ❌
const request = new Request('/', {method: 'GET', body: 'foo=bar'});

// ✅
const request = new Request('/', {method: 'POST', body: 'foo=bar'});
```

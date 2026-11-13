---
title: "prefer-response-static-json"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-response-static-json.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-response-static-json

📝 Prefer `Response.json()` over `new Response(JSON.stringify())`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Response.json()` is a cleaner and more explicit way to create JSON responses. It automatically stringifies the data and sets the correct `Content-Type` header to `application/json`, whereas manually using `JSON.stringify()` requires you to handle the content-type yourself.

The autofix is skipped when the data is `undefined`, `void …`, a function, or a class, including TypeScript assertions around them. `JSON.stringify()` returns `undefined` for these, while `Response.json()` throws.

## Examples

```js
// ❌
const response = new Response(JSON.stringify(data));

// ✅
const response = Response.json(data);
```

```js
// ❌
const response = new Response(JSON.stringify(users), {
	headers: {'Content-Type': 'application/json'},
});

// ✅
const response = Response.json(users);
```

```js
// ❌
const response = new Response(JSON.stringify({error: 'Not found'}), {
	status: 404,
	headers: {'Content-Type': 'application/json'},
});

// ✅
const response = Response.json({error: 'Not found'}, {status: 404});
```

---
title: "no-invalid-response-options"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-invalid-response-options.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-invalid-response-options

📝 Disallow invalid options in `new Response()`, `Response.json()`, and `Response.redirect()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Invalid status and body combinations throw at runtime, even with an empty string or buffer, as defined by the Fetch standard.

This rule checks:

- `new Response()` and `Response.json()` statuses outside the range 200 to 599, inclusive.
- Non-nullish bodies with status 204, 205, or 304. `Response.json()` creates a body even when its data is `null`.
- `Response.redirect()` statuses other than 301, 302, 303, 307, or 308.

## Examples

```js
// ❌
new Response('', {status: 204});
new Response(new Uint8Array(), {status: 205});
Response.json(data, {status: 304});
Response.json(null, {status: 204});
new Response(undefined, {status: 101});
Response.json(data, {status: 600});
Response.redirect(url, 200);

// ✅
new Response(undefined, {status: 204});
new Response(null, {status: 205});
new Response(undefined, {status: 304});
new Response('', {status: 200});
Response.json(data, {status: 200});
Response.redirect(url, 302);
Response.redirect(url);
```

The rule suggests replacing a forbidden, statically known primitive constructor body with `undefined` when comments and side effects are preserved. It has no autofixes.

## Detection

Checks direct calls with inline constructor or JSON options objects, using conservative static evaluation and Web IDL status conversion. Constructor body conflicts require a provably non-nullish body.

Skips unknown values or overrides, aliases, qualified globals, optional or computed method calls, and spread arguments in the first two positions. Assumes unshadowed built-ins. Headers, `statusText`, and redirect URLs are not checked.

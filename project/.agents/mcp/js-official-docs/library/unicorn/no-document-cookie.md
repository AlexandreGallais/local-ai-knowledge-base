---
title: "no-document-cookie"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-document-cookie.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-document-cookie

📝 Do not use `document.cookie` directly.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

It's not recommended to use `document.cookie` directly as it's easy to get the string wrong. Instead, you should use the Cookie Store API or a cookie library.

## Examples

```js
// ❌
document.cookie =
	'foo=bar' +
	'; Path=/' +
	'; Domain=example.com' +
	'; expires=Fri, 31 Dec 9999 23:59:59 GMT' +
	'; Secure';

// ✅
await cookieStore.set({
	name: 'foo',
	value: 'bar',
	expires: Date.now() + 24 * 60 * 60 * 1000,
	domain: 'example.com'
});
```

```js
// ❌
document.cookie += '; foo=bar';

// ✅
await cookieStore.set('foo', 'bar');

// ✅
import Cookies from 'js-cookie';

Cookies.set('foo', 'bar');
```

```js
// ✅
const array = document.cookie.split('; ');
```

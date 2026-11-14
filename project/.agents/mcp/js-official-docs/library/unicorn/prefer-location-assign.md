---
title: "prefer-location-assign"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-location-assign.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-location-assign

📝 Prefer `location.assign()` over assigning to `location.href`.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Location#assign()` is more explicit and semantic than assigning to `.href`. Use `assign()` when you want to preserve the current page in browser history (user can go back), and `Location#replace()` when you want to replace the current history entry.

## Examples

```js
// ❌ - Assigns to a property (less semantic)
location.href = url;

// ✅ - Method call is more explicit
location.assign(url);
```

```js
// ✅ - Normal navigation, user can go back
const loginUrl = 'https://example.com/login';
location.assign(loginUrl);
```

```js
// ✅ - Use replace() for redirects where user shouldn't go back
if (isLoggedOut) {
	location.replace('/login'); // Can't go back to protected page
}
```

```js
// ✅ - assign() for user-initiated navigation
button.onclick = () => location.assign('/next-page');

// ✅ - replace() for authentication redirects
if (!hasValidToken) {
	location.replace('/login');
}
```

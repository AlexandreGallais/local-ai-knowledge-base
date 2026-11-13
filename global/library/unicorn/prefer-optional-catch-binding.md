---
title: "prefer-optional-catch-binding"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-optional-catch-binding.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-optional-catch-binding

📝 Prefer omitting the `catch` binding parameter.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Optional catch binding (ES2019) allows you to omit the error parameter in catch blocks when you don't need it. This is cleaner and makes it clear that the error is not being used. The binding parameter is required in older JavaScript versions, but modern codebases should embrace this feature.

## Examples

```js
// ❌
try {
	// do something
} catch (notUsedError) {
	// ignore error
}

// ✅
try {
	// do something
} catch {
	// ignore error
}
```

```js
// ❌
try {
	await fetch(url);
} catch (error) {
	// error is not used, just continue
}

// ✅
try {
	await fetch(url);
} catch {
	// ignore fetch errors
}
```

```js
// ✅
try {
	doSomething();
} catch (error) {
	// error is actually used
	console.log(error.message);
}
```

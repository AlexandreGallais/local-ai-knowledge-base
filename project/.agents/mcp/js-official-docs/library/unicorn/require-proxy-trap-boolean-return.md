---
title: "require-proxy-trap-boolean-return"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/require-proxy-trap-boolean-return.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# require-proxy-trap-boolean-return

📝 Require boolean-returning Proxy traps to return booleans.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Some Proxy traps are specified to return a boolean result. Returning `undefined` by forgetting to return can throw in common operations, and returning another truthy or falsy value relies on implicit coercion.

A trap that always throws, loops forever, or calls the global `process.exit()` function does not need to return a boolean.

This rule checks inline object-literal handlers passed to `new Proxy()` and `Proxy.revocable()`.

## Examples

```js
// ❌
new Proxy(target, {
	set(target, property, value) {
		target[property] = value;
	}
});

// ✅
new Proxy(target, {
	set(target, property, value) {
		target[property] = value;
		return true;
	}
});
```

```js
// ❌
new Proxy(target, {
	deleteProperty() {
		return 1;
	}
});

// ✅
new Proxy(target, {
	deleteProperty() {
		return true;
	}
});
```

```js
// ✅
new Proxy(target, {
	set(target, property, value) {
		return Reflect.set(target, property, value);
	}
});
```

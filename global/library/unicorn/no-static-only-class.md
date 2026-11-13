---
title: "no-static-only-class"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-static-only-class.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-static-only-class

📝 Disallow classes that only have static members.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

A class with only static members could just be an object instead.

Using an object avoids implying that instances or a prototype are meaningful when the class has no instance behavior.

## Examples

```js
// ❌
class X {
	static foo = false;
	static bar() {};
}

// ✅
const X = {
	foo: false,
	bar() {},
};
```

```js
// ✅
class X {
	static foo = false;
	static bar() {}

	constructor() {}
}
```

```js
// ✅
class X {
	static foo = false;
	static bar() {}

	unicorn() {}
}
```

```js
// ✅
class X {
	static #foo = false;
	static bar() {}
}
```

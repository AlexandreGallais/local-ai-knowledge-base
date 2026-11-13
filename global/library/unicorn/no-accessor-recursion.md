---
title: "no-accessor-recursion"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-accessor-recursion.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-accessor-recursion

📝 Disallow recursive access to `this` within getters and setters.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

This rule prevents recursive access to `this` within getter and setter methods in objects and classes, avoiding infinite recursion and stack overflow errors.

## Examples

```js
// ❌
const foo = {
	get bar() {
		return this.bar;
	}
};

// ✅
const foo = {
	get bar() {
		return this.baz;
	}
};
```

```js
// ❌
class Foo {
	get bar() {
		return this.bar;
	}
}

// ✅
class Foo {
	get bar() {
		return this.baz;
	}
}
```

```js
// ❌
const foo = {
	set bar(value) {
		this.bar = value;
	}
};

// ✅
const foo = {
	set bar(value) {
		this._bar = value;
	}
};
```

```js
// ❌
class Foo {
	set bar(value) {
		this.bar = value;
	}
}

// ✅
class Foo {
	set bar(value) {
		this._bar = value;
	}
}
```

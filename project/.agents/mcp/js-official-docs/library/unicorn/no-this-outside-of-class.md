---
title: "no-this-outside-of-class"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-this-outside-of-class.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-this-outside-of-class

📝 Disallow `this` outside of classes.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

`this` should only be used when JavaScript class syntax or an explicit TypeScript `this` parameter defines the receiver. Prefer classes for stateful objects instead of relying on constructor functions, manually patched prototypes, object-literal methods, top-level `this`, or callback APIs that bind `this`.

This rule is intentionally strict. Vue options-style methods, object methods, and SDK callbacks that rely on an implicit `this` binding are unsupported. In TypeScript, non-arrow functions with an explicit `this` parameter are supported. Disable the rule for that file or block when other patterns are intentional.

## Examples

```js
// ❌
function Foo(value) {
	this.value = value;
}

// ❌
const foo = {
	method() {
		return this.value;
	}
};

// ❌
Foo.prototype.method = function () {
	this.value();
};

// ✅
class Foo {
	constructor(value) {
		this.value = value;
	}

	method() {
		return this.value;
	}
}
```

```js
// ❌
class Foo {
	method() {
		function getValue() {
			return this.value;
		}

		return getValue();
	}
}

// ✅
class Foo {
	method() {
		const getValue = () => this.value;
		return getValue();
	}
}
```

```ts
// ✅ TypeScript
const foo = {
	method(this: Foo) {
		return this.value;
	}
};
```

---
title: "no-this-assignment"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-this-assignment.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-this-assignment

📝 Disallow assigning `this` to a variable.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

`this` should be used directly. If you want a reference to `this` from a higher scope, consider using arrow function expression or `Function#bind()`.

## Examples

```js
// ❌
const foo = this;

setTimeout(function () {
	foo.bar();
}, 1000);

// ✅
setTimeout(() => {
	this.bar();
}, 1000);

// ✅
setTimeout(function () {
	this.bar();
}.bind(this), 1000);
```

```js
// ❌
const foo = this;

class Bar {
	method() {
		foo.baz();
	}
}

new Bar().method();

// ✅
class Bar {
	constructor(fooInstance) {
		this.fooInstance = fooInstance;
	}
	method() {
		this.fooInstance.baz();
	}
}

new Bar(this).method();
```

## Related rules

- `@typescript-eslint/no-this-alias` - Equivalent rule from typescript-eslint. If you already use that one, you don't need this rule. It has `allowDestructuring` (enabled by default) and `allowedNames` options.

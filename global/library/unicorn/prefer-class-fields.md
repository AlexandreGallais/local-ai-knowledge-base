---
title: "prefer-class-fields"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-class-fields.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-class-fields

📝 Prefer class field declarations over `this` assignments in constructors.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Enforces declaring property defaults with class fields instead of setting them inside the constructor.

Class fields keep property initialization next to the declaration and avoid boilerplate in constructors.

> To avoid leaving empty constructors after autofixing, use the `no-useless-constructor` rule.

## Examples

```js
// ❌
class Foo {
	constructor() {
		this.foo = 'foo';
	}
}

// ✅
class Foo {
	foo = 'foo';
}
```

```js
// ❌
class Foo {
	foo = 'foo';
	constructor() {
		this.foo = 'bar';
	}
}

// ✅
class Foo {
	foo = 'bar';
}
```

```js
// ❌
class Foo {
	#foo = 'foo';
	constructor() {
		this.#foo = 'bar';
	}
}

// ✅
class Foo {
	#foo = 'bar';
}
```

```js
// ✅
class MyError extends Error {
	constructor(message) {
		super(message);
		this.name = 'MyError';
	}
}
```

Only a constructor that starts with the assignment is checked. An assignment after `super()` is ignored, because the parent class could define a setter with the same name, and a class field would shadow it.

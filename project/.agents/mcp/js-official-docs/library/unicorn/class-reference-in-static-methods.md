---
title: "class-reference-in-static-methods"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/class-reference-in-static-methods.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# class-reference-in-static-methods

📝 Enforce consistent class references in static methods.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

💡 This rule is manually fixable by editor suggestions.

This rule enforces either dynamic static dispatch with `this` and `super`, or direct references with class names.

Choosing one style makes it clear whether a static method is intended to follow subclass dispatch or stay tied to a specific class.

By default, it prefers `this` and `super`.

## Examples

```js
// ❌
class Foo extends Bar {
	static baz() {
		Foo.qux();
		Bar.qux();
	}
}

// ✅
class Foo extends Bar {
	static baz() {
		this.qux();
		super.qux();
	}
}
```

With `{preferThis: false, preferSuper: false}`:

```js
// ❌
class Foo extends Bar {
	static baz() {
		this.qux();
		super.qux();
	}
}

// ✅
class Foo extends Bar {
	static baz() {
		Foo.qux();
		Bar.qux();
	}
}
```

## Options

Type: `object`

### preferThis

Type: `boolean`\
Default: `true`

Prefer `this` over the current class name in static methods.

### preferSuper

Type: `boolean`\
Default: `true`

Prefer `super` over the superclass name in static methods.

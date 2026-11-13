---
title: "no-useless-override"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-override.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-override

📝 Disallow useless overrides of class methods.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

A class method that does nothing but forward to `super.sameMethod(...)` with the same arguments is dead code. Removing it is equivalent to inheriting the parent method, so the override only adds noise and a maintenance burden. This is the method counterpart to `no-useless-constructor`.

## Examples

```js
// ❌
class Foo extends Bar {
	doThing(a, b) {
		return super.doThing(a, b);
	}
}

// ✅
class Foo extends Bar {} // Inherits `doThing` from `Bar`.
```

```js
// ❌ Reported only with type information, when `render` is known to return nothing.
class Foo extends Bar {
	render(...args) {
		super.render(...args);
	}
}

// ✅ The override adds behavior.
class Foo extends Bar {
	render(...args) {
		this.prepare();
		super.render(...args);
	}
}
```

```js
// ✅ Not a plain passthrough; arguments are changed.
class Foo extends Bar {
	doThing(a) {
		return super.doThing(a, true);
	}
}
```

## Limitations

To stay safe, the rule only reports cases where removal cannot change behavior. It skips getters/setters, generators, decorated methods, methods with accessibility modifiers, and methods with TypeScript overload signatures.

The statement form `super.method(…)` (without `return`) and `async` methods are only reported with type information available — when the parent is known to return nothing or a promise, respectively. Removing an `async` override does not preserve promise identity or the extra microtask ticks of its wrapper.

Computed method and `super` keys with side effects are left unchanged.

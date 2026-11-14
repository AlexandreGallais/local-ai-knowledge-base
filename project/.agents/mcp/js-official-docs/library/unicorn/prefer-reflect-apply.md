---
title: "prefer-reflect-apply"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-reflect-apply.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-reflect-apply

📝 Prefer `Reflect.apply()` over `Function#apply()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Reflect.apply()` is arguably less verbose and easier to understand. In addition, when you accept arbitrary methods, it's not safe to assume `.apply()` exists or is not overridden.

If you prefer `.apply()` calls to be converted to spread syntax when it preserves the `this` value, enable ESLint's built-in `prefer-spread` rule.

Computed method keys are only checked when they are string literals or template literals without substitutions, so their evaluation is safe to remove.

Targets within an optional chain are ignored to preserve short-circuiting. Grouping the target ends the chain, so `(object?.method).apply(null, [])` can still be converted.

## Examples

```js
function foo() {}

// ❌
foo.apply(null, [42]);

// ❌
Function.prototype.apply.call(foo, null, [42]);

// ✅
Reflect.apply(foo, null, [42]);
```

```js
function foo() {}

// ❌
foo.apply(this, [42]);

// ❌
Function.prototype.apply.call(foo, this, [42]);

// ✅
Reflect.apply(foo, this, [42]);
```

```js
function foo() {}

// ❌
foo.apply(null, arguments);

// ❌
Function.prototype.apply.call(foo, null, arguments);

// ✅
Reflect.apply(foo, null, arguments);
```

```js
function foo() {}

// ❌
foo.apply(this, arguments);

// ❌
Function.prototype.apply.call(foo, this, arguments);

// ✅
Reflect.apply(foo, this, arguments);
```

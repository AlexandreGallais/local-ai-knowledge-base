---
title: "logical-assignment-operators"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/logical-assignment-operators.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# logical-assignment-operators

📝 Require or disallow logical assignment operator shorthand.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

This rule is the same as the built-in ESLint `logical-assignment-operators` rule, but when `enforceForIfStatements` is enabled, falsy `if` assignments are reported with suggestions for both `||=` and `??=` instead of being autofixed.

Consistently choosing logical-assignment shorthand or an explicit assignment or conditional makes updates easier to scan and avoids mixing the same pattern in different forms.

## Replacement for ESLint `logical-assignment-operators`

This rule replaces ESLint's built-in `logical-assignment-operators` rule, which Unicorn presets disable when this rule is enabled.

## Examples

```js
/* eslint unicorn/logical-assignment-operators: ["error", "always", {"enforceForIfStatements": true}] */

// ❌
if (!foo) {
	foo = bar;
}

// ✅
foo ||= bar;

// ✅
foo ??= bar;
```

Computed properties are supported too:

```js
/* eslint unicorn/logical-assignment-operators: ["error", "always", {"enforceForIfStatements": true}] */

// ❌
if (!object[key]) {
	object[key] = [];
}

// ✅
object[key] ||= [];

// ✅ When the intent is to replace only null or undefined values
object[key] ??= [];
```

Property checks such as `key in object`, `object.hasOwnProperty(key)`, `Object.hasOwn(object, key)`, and `Object.keys(object).includes(key)` are not reported. They check for a property rather than a nullish value. For example, an `Object.hasOwn()` guard preserves an own property set to `undefined` and does not treat an inherited `constructor` as an own property. Replacing that guard with `??=` would change both behaviors.

## Options

This rule supports the same options as ESLint `logical-assignment-operators`.

---
title: "prefer-type-error"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-type-error.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-type-error

📝 Enforce throwing `TypeError` in type checking conditions.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule enforces you to throw a `TypeError` after a type checking if-statement, instead of a generic `Error`.

`TypeError` communicates that a value has the wrong type, giving callers and debuggers more specific failure information.

It's aware of the most commonly used type checking operators and identifiers like `typeof`, `instanceof`, `.isString()`, etc, borrowed from ES2017, Underscore, Lodash, and jQuery. For a complete list of the recognized identifiers, please take a look at the identifier-definition.

The rule investigates every throw-statement which throws a generic `Error`. It will fail if the throw-statement is the only expression in the surrounding block and is preceded by an if-statement whose condition consists of type-checks exclusively. You have to replace the `Error` with a `TypeError`.

Comparing `typeof x` against `'undefined'` is treated as an existence or environment check (for example, `typeof window !== 'undefined'`) rather than a type check, so it's not reported.

## Examples

```js
// ❌
if (Array.isArray(foo) === false) {
	throw new Error('Array expected');
}

// ✅
if (Array.isArray(foo) === false) {
	throw new TypeError('Array expected');
}
```

```js
// ❌
if (Number.isNaN(foo) === false && Number.isInteger(foo) === false) {
	throw new Error('Integer expected');
}

// ✅
if (Number.isNaN(foo) === false && Number.isInteger(foo) === false) {
	throw new TypeError('Integer expected');
}
```

```js
// ❌
if (isNaN(foo) === false) {
	throw new Error('Number expected');
}

// ✅
if (isNaN(foo) === false) {
	throw new TypeError('Number expected');
}
```

```js
// ❌
if (typeof foo !== 'function' &&
	foo instanceof CookieMonster === false &&
	foo instanceof Unicorn === false) {
	throw new Error('Magic expected');
}

// ✅
if (typeof foo !== 'function' &&
	foo instanceof CookieMonster === false &&
	foo instanceof Unicorn === false) {
	throw new TypeError('Magic expected');
}
```

---
title: "yield-star-spacing"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/yield-star-spacing.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# yield-star-spacing

## Rule Details

This rule enforces spacing around the `*` in `yield*` expressions.

## Options

The rule takes one option, an object, which has two keys `before` and `after` having boolean values `true` or `false`.

* `before` enforces spacing between the `yield` and the `*`.
  If `true`, a space is required, otherwise spaces are disallowed.

* `after` enforces spacing between the `*` and the argument.
  If it is `true`, a space is required, otherwise spaces are disallowed.

The default is `{"before": false, "after": true}`.

```json
"yield-star-spacing": ["error", {"before": true, "after": false}]
```

The option also has a string shorthand:

* `{"before": false, "after": true}` → `"after"`
* `{"before": true, "after": false}` → `"before"`
* `{"before": true, "after": true}` → `"both"`
* `{"before": false, "after": false}` → `"neither"`

```json
"yield-star-spacing": ["error", "after"]
```

### after

Examples of **correct** code for this rule with the default `"after"` option:

**Correct:**

```js
/*eslint yield-star-spacing: ["error", "after"]*/

function* generator() {
  yield* other();
}
```

### before

Examples of **correct** code for this rule with the `"before"` option:

**Correct:**

```js
/*eslint yield-star-spacing: ["error", "before"]*/

function *generator() {
  yield *other();
}
```

### both

Examples of **correct** code for this rule with the `"both"` option:

**Correct:**

```js
/*eslint yield-star-spacing: ["error", "both"]*/

function * generator() {
  yield * other();
}
```

### neither

Examples of **correct** code for this rule with the `"neither"` option:

**Correct:**

```js
/*eslint yield-star-spacing: ["error", "neither"]*/

function*generator() {
  yield*other();
}
```

## When Not To Use It

If your project will not be using generators or you are not concerned with spacing consistency, you do not need this rule.

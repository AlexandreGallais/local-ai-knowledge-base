---
title: "regexp/simplify-set-operations"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/simplify-set-operations.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/simplify-set-operations

💼 This rule is enabled in the following configs: 🟢 `flat/recommended`, 🔵 `recommended`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

> require simplify set operations

## :book: Rule Details

This rule aims to optimize patterns by simplifying set operations in character classes (with `v` flag).

This rule does not report simple nested negations. (e.g. `/[^[^abc]]/v`)\
If you want to report simple nested negations, use the [regexp/negation] rule.

<eslint-code-block fix>

```js
/* eslint regexp/simplify-set-operations: "error" */

/* ✗ BAD */
var re = /[a&&[^b]]/v; // -> /[a--b]/v
var re = /[[^b]&&a]/v; // -> /[a--b]/v
var re = /[a--[^b]]/v; // -> /[a&&b]/v
var re = /[[^a]&&[^b]]/v; // -> /[^ab]/v
var re = /[[^a][^b]]/v; // -> /[^a&&b]/v

/* ✓ GOOD */
var re = /[a--b]/v;
var re = /[a&&b]/v;
var re = /[^ab]/v;
var re = /[^a&&b]/v;
```

</eslint-code-block>

### How does this rule work?

This rule attempts to simplify set operations in the ways listed below:

#### De Morgan's laws

This rule uses De Morgan's laws to look for patterns that can convert multiple negations into a single negation, reports on them, and auto-fix them.\
For example, `/[[^a]&&[^b]]/v` is equivalent to `/[^ab]/v`, and `/[^a]/v` is equivalent to `/[^a&&b]/v`.

See <https://en.wikipedia.org/wiki/De_Morgan's_laws>.

#### Conversion from the intersection to the subtraction

Intersection sets with complement operands can be converted to difference sets.\
The rule looks for character class intersection with negation operands, reports on them, auto-fix them.\
For example, `/[a&&[^b]]/v` is equivalent to `/[a--b]/v`, `/[[^a]&&b]/v` is equivalent to `/[b--a]/v`.

#### Conversion from the subtraction to the intersection

Difference set with a complement operand on the right side can be converted to intersection sets.\
The rule looks for character class subtraction with negation operand on the right side, reports on them, auto-fix them.\
For example, `/[a--[^b]]/v` is equivalent to `/[a&&b]/v`.

### Auto Fixes

This rule's auto-fix does not remove unnecessary brackets. For example, `/[[^a]&&[^b]]/v` will be automatically fixed to `/[^a]/v`.\
If you want to remove unnecessary brackets (e.g. auto-fixed to `/[^ab]/v`), use [regexp/no-useless-character-class] rule together.

## :wrench: Options

Nothing.

## :couple: Related rules

- [regexp/negation]
- [regexp/no-useless-character-class]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v2.0.0-next.11

## :mag: Implementation

- Rule source
- Test source

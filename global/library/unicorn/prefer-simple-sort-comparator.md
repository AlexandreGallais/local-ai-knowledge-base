---
title: "prefer-simple-sort-comparator"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-simple-sort-comparator.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-simple-sort-comparator

📝 Prefer a simple comparison function for `Array#sort()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

A comparison function passed to `Array#sort()` (or `Array#toSorted()`) is often written as a verbose chain of `if` statements or ternaries that compares two values with `>` and `<` and returns `1`, `-1`, and `0`. When the two sides are mirror images of each other (for example `a` and `b`, or `a.foo` and `b.foo`), the whole thing can be replaced with a single subtraction.

This rule only offers a suggestion, never an autofix, because the verbose form also works for strings, whereas subtraction only works for numbers. Switch to `a.localeCompare(b)` instead when sorting strings.

Multi-key <example-value> (comparing different properties as tiebreakers), `Math.random()` based shuffles, and operands using optional chaining are intentionally not reported.

## Examples

```js
// ❌
array.sort((a, b) => {
	if (a > b) {
		return 1;
	}

	if (a < b) {
		return -1;
	}

	return 0;
});

// ❌
array.sort((a, b) => a > b ? 1 : -1);

// ✅
array.sort((a, b) => a - b);
```

```js
// ❌
array.sort((a, b) => a.foo > b.foo ? -1 : 1);

// ✅
array.sort((a, b) => b.foo - a.foo);
```

```js
// ✅ Sorting strings
array.sort((a, b) => a.localeCompare(b));

// ✅ Multi-key <example-value>, not reported
array.sort((a, b) => a.foo - b.foo || a.bar - b.bar);
```

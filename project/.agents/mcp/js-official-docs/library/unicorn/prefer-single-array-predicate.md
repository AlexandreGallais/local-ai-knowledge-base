---
title: "prefer-single-array-predicate"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-single-array-predicate.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-single-array-predicate

📝 Prefer a single `Array#some()` or `Array#every()` with a combined predicate.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

Combining multiple predicates into a single `Array#some()` or `Array#every()` call is more efficient and readable. Calling the same method multiple times iterates the array multiple times unnecessarily.

This rule only provides suggestions (not autofix) because combining calls can change evaluation order when receivers or predicates have side effects.

## Examples

```js
// ❌ - Iterates array twice
const hasErrors = messages.some(m => m.type === 'error') || messages.some(m => m.severity === 'critical');

// ✅ - Single iteration with combined predicate
const hasErrors = messages.some(m => m.type === 'error' || m.severity === 'critical');
```

```js
// ❌ - Iterates array twice
const allValid = items.every(item => item.valid) && items.every(item => item.complete);

// ✅ - Single iteration
const allValid = items.every(item => item.valid && item.complete);
```

```js
// ❌ - Multiple same-method calls
const hasMissingValue = values.some(value => value === null) || values.some(value => value === undefined);

// ✅ - Combine into one check
const hasMissingValue = values.some(value => value === null || value === undefined);
```

```js
// ✅ - Different methods or unrelated conditions
array.some(x => x > 5) && array.every(x => x < 100); // OK - different methods
array.some(x => x > 5) || someOtherCondition; // OK - unrelated condition
```

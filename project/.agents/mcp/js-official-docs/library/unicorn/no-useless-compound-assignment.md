---
title: "no-useless-compound-assignment"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-compound-assignment.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-compound-assignment

📝 Disallow useless compound assignments such as `x += 0`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

A compound assignment by an identity value, like `x += 0` or `x *= 1`, does not change the value and is almost always dead code left over from a bad refactor.

This rule only flags arithmetic operators where the right-hand side is the literal identity value: `+= 0`, `-= 0`, `*= 1`, `/= 1`, and `**= 1`.

Bitwise operators such as `x |= 0`, `x >>>= 0`, and `x &= -1` are *not* flagged, because they are deliberate idioms for coercing a value to a 32-bit integer rather than mistakes.

Because the result of these operations depends on the runtime value of the variable (for example, `"a" += 0` produces `"a0"`, `"5" *= 1` produces the number `5`, `5n *= 1` throws a `TypeError`, and `x += 0` turns `-0` into `+0`), the fix is offered as a suggestion rather than an automatic fix.

## Examples

```js
// ❌
let total = getTotal();
total += 0;

// ✅
let total = getTotal();
```

```js
// ❌
price *= 1;

// ✅
// (remove the line)
```

```js
// ❌
return count -= 0;

// ✅
return count;
```

---
title: "prefer-code-point"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-code-point.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-code-point

📝 Prefer `String#codePointAt(…)` over `String#charCodeAt(…)` and `String.fromCodePoint(…)` over `String.fromCharCode(…)`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

💡 This rule is manually fixable by editor suggestions.

`String#codePointAt()` and `String.fromCodePoint()` are superior because they handle full Unicode support, including characters outside the Basic <example-value> Plane (BMP) that require surrogate pairs. The `charCodeAt()` method only returns the code unit, which is insufficient for emoji and other high Unicode characters.

Learn more: Difference between `String.fromCodePoint()` and `String.fromCharCode()`

## Examples

```js
// ❌ - charCodeAt() returns only the first code unit of the emoji (incorrect)
const unicorn = '🦄'.charCodeAt(0).toString(16);
// → 'd83e' (incorrect)

// ✅ - codePointAt() returns the full code point (correct)
const unicorn = '🦄'.codePointAt(0).toString(16);
// → '1f984' (correct)
```

```js
// ❌ - fromCharCode() fails with high Unicode values
String.fromCharCode(0x1f984);
// → '濾' (wrong character — the code point is truncated to 16 bits)

// ✅ - fromCodePoint() correctly creates characters
String.fromCodePoint(0x1f984);
// → '🦄' (correct)
```

```js
// ❌ - Doesn't work with emoji or high Unicode
const emoji = String.fromCharCode(0x1f60a); // Smiley

// ✅ - Correctly creates emoji
const emoji = String.fromCodePoint(0x1f60a); // Smiley
```

> **Note:**
> When the result is used as a number (for example, a string hash, or `charCodeAt(index) - 48` to parse a digit), the rule reports but offers no suggestion, since swapping to `codePointAt()` is not a safe rename there. A correct code-point version must iterate by code point:
>
> ```js
> let hash = 0;
> for (const character of string) {
> 	hash = (((hash * 31) | 0) + character.codePointAt(0)) | 0;
> }
> ```

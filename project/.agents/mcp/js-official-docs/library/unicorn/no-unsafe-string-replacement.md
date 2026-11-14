---
title: "no-unsafe-string-replacement"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-unsafe-string-replacement.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-unsafe-string-replacement

📝 Disallow non-literal replacement values in `String#replace()` and `String#replaceAll()`.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

The replacement argument of `String#replace()` and `String#replaceAll()` is not inserted literally when it is a string. Special replacement patterns like `$&`, `$1`, and `` $` `` are expanded. When the replacement value comes from an expression, this can produce unexpected output or security bugs.

Use a literal string when the replacement is static. Use a replacement function when the replacement is dynamic.

Direct, non-optional `.repeat()` calls on string or no-substitution template literals without `$` are allowed. The arguments need not be static because only the receiver can introduce replacement patterns.

## Examples

```js
// ❌
template.replace('{url}', htmlEscape(url));

// ✅
template.replace('{url}', () => htmlEscape(url));
```

```js
// ❌
template.replaceAll('{url}', htmlEscape(url));

// ✅
template.replaceAll('{url}', () => htmlEscape(url));
```

```js
// ✅
template.replace('{url}', 'https://example.com');
```

```js
// ✅
template.replace('{url}', `https://example.com`);
```

```js
// ❌
text.replaceAll('\t', '$&'.repeat(2));

// ✅
text.replaceAll('\t', ' '.repeat(4));
text.replaceAll('\t', '\u00A0'.repeat(4));
text.replaceAll('\t', ' '.repeat(count));
```

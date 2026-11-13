---
title: "prefer-string-starts-ends-with"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-string-starts-ends-with.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-string-starts-ends-with

📝 Prefer `String#startsWith()` & `String#endsWith()` over regexes, `String#indexOf() === 0`, and slice checks.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Prefer `String#startsWith()` and `String#endsWith()` over using a regex with `/^foo/` or `/foo$/`.

This rule also detects `String#indexOf() === 0` when the receiver is provably a string (via literals, `String()` calls, TypeScript type annotations, etc.).

This rule also detects string slice comparisons like `string.slice(0, prefix.length) === prefix` and `string.slice(-5) === 'value'` when the receiver and compared value are provably strings. Dynamic suffix length checks are only reported when the suffix value is statically known to be non-empty, because `string.slice(-suffix.length) === suffix` is not equivalent to `string.endsWith(suffix)` when `suffix` is an empty string.

Comparisons with the slice call on the right are suggestions when the receiver has a side effect, because the replacement evaluates the receiver before the search value.

Some reports are not autofixable when the replacement could change behavior or remove comments.

## Examples

```js
// ❌
const foo = /^bar/.test(baz);

// ✅
const foo = baz.startsWith('bar');
```

```js
// ❌
const foo = /bar$/.test(baz);

// ✅
const foo = baz.endsWith('bar');
```

```js
// ❌
const foo = someString.indexOf('bar') === 0;

// ✅
const foo = someString.startsWith('bar');
```

```js
// ❌
const foo = 'barbaz'.slice(0, 3) === 'bar';

// ✅
const foo = 'barbaz'.startsWith('bar');
```

```js
// ❌
const foo = 'foobaz'.slice(-3) === 'baz';

// ✅
const foo = 'foobaz'.endsWith('baz');
```

```js
// ✅
const foo = /^bar/i.test(baz);
```

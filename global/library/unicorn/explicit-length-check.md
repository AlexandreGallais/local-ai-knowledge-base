---
title: "explicit-length-check"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/explicit-length-check.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# explicit-length-check

📝 Enforce explicitly comparing the `length` or `size` property of a value.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Explicit comparisons make empty and non-empty intent clear instead of relying on the truthiness of a numeric property.

This rule is fixable, unless it's unsafe to fix.

In Vue templates, checks inside event handler statement bodies or block statements are reported without fixes or suggestions.

## Zero comparisons

Enforce comparison with `=== 0` when checking for zero length.

### Examples

```js
// ❌
const isEmpty = !foo.length;

// ❌
const isEmpty = foo.length == 0;

// ❌
const isEmpty = foo.length < 1;

// ❌
const isEmpty = foo.length <= 0;

// ❌
const isEmpty = 0 === foo.length;

// ❌
const isEmpty = 0 == foo.length;

// ❌
const isEmpty = 1 > foo.length;

// ❌
// Negative style is disallowed too
const isEmpty = !(foo.length > 0);

// ✅
const isEmpty = foo.length === 0;
```

```js
// ❌
const isEmptySet = !foo.size;

// ✅
const isEmptySet = foo.size === 0;
```

```vue
<template>
	<!-- ❌ -->
	<div v-if="!foo.length">Vue</div>

	<!-- ✅ -->
	<div v-if="foo.length === 0">Vue</div>
</template>
```

## Non-zero comparisons

Enforce comparison with `> 0` when checking for non-zero length.

### Examples

```js
// ❌
const isNotEmpty = foo.length !== 0;

// ❌
const isNotEmpty = foo.length != 0;

// ❌
const isNotEmpty = foo.length >= 1;

// ❌
const isNotEmpty = 0 !== foo.length;

// ❌
const isNotEmpty = 0 != foo.length;

// ❌
const isNotEmpty = 0 < foo.length;

// ❌
const isNotEmpty = 1 <= foo.length;

// ❌
const isNotEmpty = Boolean(foo.length);

// ❌
// Negative style is disallowed too
const isNotEmpty = !(foo.length === 0);

// ✅
const isNotEmpty = foo.length > 0;
```

```js
// ❌
if (foo.length || bar.length) {}

// ✅
if (foo.length > 0 || bar.length > 0) {}
```

```js
// ❌
const unicorn = foo.length ? 1 : 2;

// ✅
const unicorn = foo.length > 0 ? 1 : 2;
```

```js
// ❌
while (foo.length) {}

// ✅
while (foo.length > 0) {}
```

```js
// ❌
do {} while (foo.length);

// ✅
do {} while (foo.length > 0);
```

```js
// ❌
for (; foo.length; ) {};

// ✅
for (; foo.length > 0; ) {};
```

### Options

You can define your preferred way of checking non-zero length by providing a `non-zero` option (`greater-than` by default):

```js
{
	'unicorn/explicit-length-check': [
		'error',
		{
			'non-zero': 'not-equal'
		}
	]
}
```

The `non-zero` option can be configured with one of the following:

- `greater-than` (default)
  - Enforces non-zero to be checked with: `foo.length > 0`
- `not-equal`
  - Enforces non-zero to be checked with: `foo.length !== 0`

This rule does not support Yoda-style comparisons like `0 < foo.length`. If you use `eslint/yoda`, configure it to allow non-Yoda style for relational comparisons.

## Unsafe to fix case

`.length` check inside some expressions are not safe to fix.

Example:

```js
const bothNotEmpty = (a, b) => a.length && b.length;

if (bothNotEmpty(foo, bar)) {}
```

In this case, the `bothNotEmpty` function returns a `number`, but it will most likely be used as a `boolean`. The rule will still report this as an error, but without an auto-fix. You can apply a suggestion in your editor, which will fix it to:

```js
const bothNotEmpty = (a, b) => a.length > 0 && b.length > 0;

if (bothNotEmpty(foo, bar)) {}
```

`!foo.length` used as the left side of a comparison is also unsafe to fix due to operator precedence.

```js
// ❌
if (!foo.length > 0) {}
```

The rule is smart enough to know some `LogicalExpression`s are safe to fix, like when it's inside `if`, `while`, etc.

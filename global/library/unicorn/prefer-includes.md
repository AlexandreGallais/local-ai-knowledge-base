---
title: "prefer-includes"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-includes.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-includes

📝 Prefer `.includes()` over `.indexOf()`, `.lastIndexOf()`, and `Array#some()` when checking for existence or non-existence.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Prefer `.includes()` over comparing the result of `.indexOf()` or `.lastIndexOf()`.

Simple equality checks with `Array#some()` can also use `Array#includes()`.

For `Array#some()`, search expressions with side effects receive suggestions instead of autofixes.

With TypeScript type information, `Array#some()` searches are skipped when the search value's type is not accepted by `.includes()`. Using the TypeScript parser alone does not enable this check.

Known RegExp search values are skipped unless the receiver is known to be an array or another non-string value. String index searches coerce RegExp values to strings, while `String#includes()` rejects them.

## Examples

```js
// ❌
array.indexOf('foo') !== -1;

// ❌
array.indexOf('foo') != -1;

// ❌
array.indexOf('foo') >= 0;

// ❌
array.indexOf('foo') > -1;

// ❌
array.lastIndexOf('foo') !== -1;

// ❌
array.some(x => x === 'foo');

// ❌
array.some(x => 'foo' === x);

// ❌
array.some(x => {
	return x === 'foo';
});

// ✅
array.includes('foo');
```

```js
// ❌
string.indexOf('foo') !== -1;

// ❌
string.lastIndexOf('foo') !== -1;

// ✅
string.includes('foo');
```

```js
// ❌
foo.indexOf('foo') === -1

// ✅
!foo.includes('foo');
```

```js
// ❌
foo.some(x => {
	return x === 'foo';
});

// ✅
foo.includes('foo');
```

With type information, `.some()` is allowed when the search value has a wider type:

```ts
const sizes = ['small', 'large'] as const;

// ✅ `string` is wider than the array's element type.
function isSize(input: string) {
	return sizes.some(size => size === input);
}
```

With TypeScript type information, boolean array predicates are also simplified:

```ts
const array: boolean[] = [true, false];

// ❌
array.some(value => value);

// ❌
array.some(value => Boolean(value));

// ✅
array.includes(true);
```

```js
// ✅
foo.indexOf('foo') !== -n;
```

```js
// ✅
foo.indexOf('foo') !== 1;
```

```js
// ✅
foo.indexOf('foo') === 1;
```

```js
// ✅
foo.some(x => x == undefined);
```

```js
// ✅
foo.some(x => x !== 'foo');
```

```js
// ✅
foo.some((x, index) => x === index);
```

```js
// ✅
foo.some(x => (x === 'foo') && isValid());
```

```js
// ✅
foo.some(x => y === 'foo');
```

```js
// ✅
foo.some(x => y.x === 'foo');
```

```js
// ✅
foo.some(x => {
	const bar = getBar();
	return x === bar;
});
```

```js
// ✅
// `indexOf()` compares with `===` and never finds `NaN`, while `includes()` does
array.indexOf(Number.NaN) !== -1;
array.some(x => x === Number.NaN);
```

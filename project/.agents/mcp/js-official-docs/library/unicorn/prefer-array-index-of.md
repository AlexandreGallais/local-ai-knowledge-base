---
title: "prefer-array-index-of"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-array-index-of.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-array-index-of

📝 Prefer `Array#{indexOf,lastIndexOf}()` over `Array#{findIndex,findLastIndex}()` when looking for the index of an item.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Replace simple equality callbacks passed to `Array#findIndex()` and `Array#findLastIndex()` with `Array#indexOf()` and `Array#lastIndexOf()`, respectively.

Search expressions with side effects receive suggestions instead of autofixes.

With TypeScript type information, searches are skipped when the search value's type is not accepted by `.indexOf()` or `.lastIndexOf()`. Using the TypeScript parser alone does not enable this check.

## Examples

```js
// ❌
const index = foo.findIndex(x => x === 'foo');

// ❌
const index = foo.findIndex(x => 'foo' === x);

// ❌
const index = foo.findIndex(x => {
	return x === 'foo';
});

// ✅
const index = foo.indexOf('foo');
```

```js
// ❌
const index = foo.findLastIndex(x => x === 'foo');

// ❌
const index = foo.findLastIndex(x => 'foo' === x);

// ❌
const index = foo.findLastIndex(x => {
	return x === 'foo';
});

// ✅
const index = foo.lastIndexOf('foo');
```

```js
// ✅
const index = foo.findIndex(x => x == undefined);
```

```js
// ✅
const index = foo.findIndex(x => x !== 'foo');
```

```js
// ✅
const index = foo.findIndex((x, index) => x === index);
```

```js
// ✅
const index = foo.findIndex(x => (x === 'foo') && isValid());
```

```js
// ✅
const index = foo.findIndex(x => y === 'foo');
```

```js
// ✅
const index = foo.findIndex(x => y.x === 'foo');
```

```js
// ✅
const index = foo.findIndex(x => {
	const bar = getBar();
	return x === bar;
});
```

```js
// ✅
const index = foo.findLastIndex(x => x == undefined);
```

```js
// ✅
const index = foo.findLastIndex(x => x !== 'foo');
```

```js
// ✅
const index = foo.findLastIndex((x, index) => x === index);
```

```js
// ✅
const index = foo.findLastIndex(x => (x === 'foo') && isValid());
```

```js
// ✅
const index = foo.findLastIndex(x => y === 'foo');
```

```js
// ✅
const index = foo.findLastIndex(x => y.x === 'foo');
```

```js
// ✅
const index = foo.findLastIndex(x => {
	const bar = getBar();
	return x === bar;
});
```

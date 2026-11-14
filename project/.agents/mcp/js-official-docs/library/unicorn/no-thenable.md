---
title: "no-thenable"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-thenable.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-thenable

📝 Disallow `then` property.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

If an object is defined as "thenable", once it's accidentally used in an await expression, it may cause problems:

```js
const foo = {
	unicorn: 1,
	then() {},
};

const {unicorn} = await foo;

console.log('after'); //<- This will never execute
```

```js
const foo = {
	unicorn: 1,
	then() {
		throw new Error('You shouldn’t have called me')
	},
};

const {unicorn} = await foo;
// Error: You shouldn’t have called me
```

If a module has an export named `then`, dynamic `import()` may not work as expected:

```js
// foo.js

export function then () {
	throw new Error('You shouldn’t have called me')
}
```

```js
// bar.js

const foo = await import('./foo.js');
// Error: You shouldn’t have called me
```

## Examples

```js
// ❌
export {then};

// ✅
export {then as success};
```

```js
// ❌
const foo = {
	then() {}
};

// ✅
const foo = {
	success() {}
};
```

```js
// ❌
const foo = {
	get then() {}
};

// ✅
const foo = {
	get success() {}
};
```

```js
// ❌
foo.then = function () {}

// ✅
foo.success = function () {}
```

```js
// ❌
class Foo {
	then() {}
}

// ✅
class Foo {
	success() {}
}
```

```js
// ❌
class Foo {
	static then() {}
}

// ✅
class Foo {
	static success() {}
}
```

```js
// ✅
const foo = bar.then;
```

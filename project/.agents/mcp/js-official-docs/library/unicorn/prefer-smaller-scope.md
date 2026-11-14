---
title: "prefer-smaller-scope"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-smaller-scope.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-smaller-scope

📝 Prefer declaring variables and type aliases in the smallest possible scope.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Declare variables as close as possible to where they are used. This reduces the amount of code that can access the variable and makes the lifetime of the value easier to see.

For variables, the rule checks two patterns: an uninitialized `let` assigned once in a nested block and read only afterward in that block; and a `let` or `const` initialized with a primitive literal or a template literal without substitutions, immediately before an `if`, with all references in one braced branch.

TypeScript type aliases are checked when all references fit inside a smaller block. Signature references prevent movement into that function's body. No type information is required.

## Examples

```js
// ❌
function foo() {
	let value;
	while (condition) {
		value = getValue();
		console.log(value);
	}
}
```

```js
// ✅
function foo() {
	while (condition) {
		const value = getValue();
		console.log(value);
	}
}
```

```js
// ❌
function foo() {
	let value;
	if (condition) {
		value = getValue();
		console.log(value);
	}
}
```

```js
// ✅
function foo() {
	if (condition) {
		const value = getValue();
		console.log(value);
	}
}
```

```js
// ❌
function foo(bar) {
	const result = 1;
	if (bar) {
		console.log(result);
	}
}
```

```js
// ✅
function foo(bar) {
	if (bar) {
		const result = 1;
		console.log(result);
	}
}
```

```ts
// ❌
type Point = {x: number; y: number};
function createPoint() {
	const point: Point = {x: 0, y: 0};
	return point;
}

// ✅
function createPoint() {
	type Point = {x: number; y: number};
	const point: Point = {x: 0, y: 0};
	return point;
}
```

## Limitations

For variables, the rule ignores `var`, destructuring, multiple declarators, TypeScript ambient declarations, references crossing a function, class, or static block, and cases involving dynamic scope. An uninitialized `let` needs one direct `=` assignment followed only by reads in the same block.

An initialized variable declaration must immediately precede an `if`, use a primitive literal or substitution-free template, and have all value and TypeScript type references within one braced branch. Regular expressions and expressions such as `-1` are ignored.

Autofixes are omitted when comments could be displaced, a declaration has a TypeScript annotation, or a parenthesized assignment is syntax-sensitive.

Exported and ambient type aliases, and aliases with variance annotations (`in` or `out`), are ignored.

Autofixes are omitted when moving an alias could change types or emitted code, introduce syntax errors, or disturb comments or multiline literals.

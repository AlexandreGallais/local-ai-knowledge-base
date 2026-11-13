---
title: "no-const-assign"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-const-assign.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-const-assign

Constant bindings cannot be modified. An attempt to modify a constant binding will raise a runtime error.

## Rule Details

This rule is aimed to flag modifying variables that are declared using `const`, `using`, or `await using` keywords.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-const-assign: "error"*/

const a = 0;
a = 1;
```

**Incorrect:**

```js
/*eslint no-const-assign: "error"*/

const a = 0;
a += 1;
```

**Incorrect:**

```js
/*eslint no-const-assign: "error"*/

const a = 0;
++a;
```

**Incorrect:**

```js
/*eslint no-const-assign: "error"*/

if (foo) {
	using a = getSomething();
	a = somethingElse;
}

if (bar) {
	await using a = getSomething();
	a = somethingElse;
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-const-assign: "error"*/

const a = 0;
console.log(a);
```

**Correct:**

```js
/*eslint no-const-assign: "error"*/

if (foo) {
	using a = getSomething();
	a.execute();
}

if (bar) {
	await using a = getSomething();
	a.execute();
}
```

**Correct:**

```js
/*eslint no-const-assign: "error"*/

for (const a in [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```

**Correct:**

```js
/*eslint no-const-assign: "error"*/

for (const a of [1, 2, 3]) { // `a` is re-defined (not modified) on each loop step.
    console.log(a);
}
```

## Options

This rule has no options.

## When Not To Use It

If you don't want to be notified about modifying variables that are declared using `const`, `using`, and `await using` keywords, you can safely disable this rule.

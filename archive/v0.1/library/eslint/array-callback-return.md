---
title: "array-callback-return"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/array-callback-return.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# array-callback-return

`Array` has several methods for filtering, mapping, and folding.
If we forget to write `return` statement in a callback of those, it's probably a mistake. If you don't want to use a return or don't need the returned results, consider using .forEach instead.

```js
// example: convert ['a', 'b', 'c'] --> {a: 0, b: 1, c: 2}
const indexMap = myArray.reduce(function(memo, item, index) {
  memo[item] = index;
}, {}); // Error: cannot set property 'b' of undefined
```

## Rule Details

This rule enforces usage of `return` statement in callbacks of array's methods.
Additionally, it may also enforce the `forEach` array method callback to **not** return a value by using the `checkForEach` option.

This rule finds callback functions of the following methods, then checks usage of `return` statement.

* `Array.from`
* `Array.fromAsync`
* `Array.prototype.every`
* `Array.prototype.filter`
* `Array.prototype.find`
* `Array.prototype.findIndex`
* `Array.prototype.findLast`
* `Array.prototype.findLastIndex`
* `Array.prototype.flatMap`
* `Array.prototype.forEach` (optional, based on `checkForEach` parameter)
* `Array.prototype.map`
* `Array.prototype.reduce`
* `Array.prototype.reduceRight`
* `Array.prototype.some`
* `Array.prototype.sort`
* `Array.prototype.toSorted`
* And above of typed arrays if applicable.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint array-callback-return: "error"*/

const indexMap = myArray.reduce(function(memo, item, index) {
    memo[item] = index;
}, {});

const foo = Array.from(nodes, function(node) {
    if (node.tagName === "DIV") {
        return true;
    }
});

const bar = foo.filter(function(x) {
    if (x) {
        return true;
    } else {
        return;
    }
});
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint array-callback-return: "error"*/

const indexMap = myArray.reduce(function(memo, item, index) {
    memo[item] = index;
    return memo;
}, {});

const foo = Array.from(nodes, function(node) {
    if (node.tagName === "DIV") {
        return true;
    }
    return false;
});

const bar = foo.map(node => node.getAttribute("id"));
```

## Options

This rule accepts a configuration object with three options:

* `"allowImplicit": false` (default) When set to `true`, allows callbacks of methods that require a return value to implicitly return `undefined` with a `return` statement containing no expression.
* `"checkForEach": false` (default) When set to `true`, rule will also report `forEach` callbacks that return a value.
* `"allowVoid": false` (default) When set to `true`, allows `void` in `forEach` callbacks, so rule will not report the return value with a `void` operator.

**Note:** `{ "allowVoid": true }` works only if `checkForEach` option is set to `true`.

### allowImplicit

Examples of **correct** code for the `{ "allowImplicit": true }` option:

**Correct:**

```js
/*eslint array-callback-return: ["error", { allowImplicit: true }]*/
const undefAllTheThings = myArray.map(function(item) {
    return;
});
```

### checkForEach

Examples of **incorrect** code for the `{ "checkForEach": true }` option:

**Incorrect:**

```js
/*eslint array-callback-return: ["error", { checkForEach: true }]*/

myArray.forEach(function(item) {
    return handleItem(item);
});

myArray.forEach(function(item) {
    if (item < 0) {
        return x;
    }
    handleItem(item);
});

myArray.forEach(function(item) {
    if (item < 0) {
        return void x;
    }
    handleItem(item);
});

myArray.forEach(item => handleItem(item));

myArray.forEach(item => void handleItem(item));

myArray.forEach(item => {
    return handleItem(item);
});

myArray.forEach(item => {
    return void handleItem(item);
});
```

Examples of **correct** code for the `{ "checkForEach": true }` option:

**Correct:**

```js
/*eslint array-callback-return: ["error", { checkForEach: true }]*/

myArray.forEach(function(item) {
    handleItem(item)
});

myArray.forEach(function(item) {
    if (item < 0) {
        return;
    }
    handleItem(item);
});

myArray.forEach(function(item) {
    handleItem(item);
    return;
});

myArray.forEach(item => {
    handleItem(item);
});
```

### allowVoid

Examples of **correct** code for the `{ "allowVoid": true }` option:

**Correct:**

```js
/*eslint array-callback-return: ["error", { checkForEach: true, allowVoid: true }]*/

myArray.forEach(item => void handleItem(item));

myArray.forEach(item => {
    return void handleItem(item);
});

myArray.forEach(item => {
    if (item < 0) {
        return void x;
    }
    handleItem(item);
});
```

## Known Limitations

This rule checks callback functions of methods with the given names, *even if* the object which has the method is *not* an array.

## When Not To Use It

If you don't want to warn about usage of `return` statement in callbacks of array's methods, then it's safe to disable this rule.

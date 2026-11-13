---
title: "no-plusplus"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-plusplus.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-plusplus

Because the unary `++` and `--` operators are subject to automatic semicolon insertion, differences in whitespace can change semantics of source code.

```js
let i = 10;
let j = 20;

i ++
j
// i = 11, j = 20
```

```js
let i = 10;
let j = 20;

i
++
j
// i = 10, j = 21
```

## Rule Details

This rule disallows the unary operators `++` and `--`.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-plusplus: "error"*/

let foo = 0;
foo++;

let bar = 42;
bar--;

for (let i = 0; i < l; i++) {
    doSomething(i);
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-plusplus: "error"*/

let foo = 0;
foo += 1;

let bar = 42;
bar -= 1;

for (let i = 0; i < l; i += 1) {
    doSomething(i);
}
```

## Options

This rule has an object option.

* `"allowForLoopAfterthoughts": true` allows unary operators `++` and `--` in the afterthought (final expression) of a `for` loop.

### allowForLoopAfterthoughts

Examples of **correct** code for this rule with the `{ "allowForLoopAfterthoughts": true }` option:

**Correct:**

```js
/*eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }]*/

for (let i = 0; i < l; i++) {
    doSomething(i);
}

for (let i = l; i >= 0; i--) {
    doSomething(i);
}

for (let i = 0, j = l; i < l; i++, j--) {
    doSomething(i, j);
}
```

Examples of **incorrect** code for this rule with the `{ "allowForLoopAfterthoughts": true }` option:

**Incorrect:**

```js
/*eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }]*/

for (let i = 0; i < l; j = i++) {
    doSomething(i, j);
}

for (let i = l; i--;) {
    doSomething(i);
}

for (let i = 0; i < l;) i++;
```

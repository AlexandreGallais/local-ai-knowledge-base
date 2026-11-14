---
title: "no-undefined"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-undefined.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-undefined

The `undefined` variable in JavaScript is actually a property of the global object. As such, in ECMAScript 3 it was possible to overwrite the value of `undefined`. While ECMAScript 5 disallows overwriting `undefined`, it's still possible to shadow `undefined`, such as:

```js
function doSomething(data) {
    const undefined = "hi";

    // doesn't do what you think it does
    if (data === undefined) {
        // ...
    }

}
```

Because `undefined` can be overwritten or shadowed, reading `undefined` can give an unexpected value. (This is not the case for `null`, which is a keyword that always produces the same value.) To guard against this, you can avoid all uses of `undefined`, which is what some style guides recommend and what this rule enforces. Those style guides then also recommend:

* Variables that should be `undefined` are simply left uninitialized. (All uninitialized variables automatically get the value of `undefined` in JavaScript.)
* Checking if a value is `undefined` should be done with `typeof`.
* Using the `void` operator to generate the value of `undefined` if necessary.

As an alternative, you can use the no-global-assign and no-shadow-restricted-names rules to prevent `undefined` from being shadowed or assigned a different value. This ensures that `undefined` will always hold its original, expected value.

## Rule Details

This rule aims to eliminate the use of `undefined`, and as such, generates a warning whenever it is used.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-undefined: "error"*/

const foo = undefined;

const undefined = "foo";

if (foo === undefined) {
    // ...
}

function baz(undefined) {
    // ...
}

bar(undefined, "lorem");
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-undefined: "error"*/

const foo = void 0;

const Undefined = "foo";

if (typeof foo === "undefined") {
    // ...
}

global.undefined = "foo";

bar(void 0, "lorem");
```

## Options

This rule has no options.

## When Not To Use It

If you want to allow the use of `undefined` in your code, then you can safely turn this rule off.

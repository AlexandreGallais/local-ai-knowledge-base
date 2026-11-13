---
title: "no-throw-literal"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-throw-literal.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-throw-literal

It is considered good practice to only `throw` the `Error` object itself or an object using the `Error` object as base objects for user-defined exceptions.
The fundamental benefit of `Error` objects is that they automatically keep track of where they were built and originated.

This rule restricts what can be thrown as an exception.  When it was first created, it only prevented literals from being thrown (hence the name), but it has now been expanded to only allow expressions which have a possibility of being an `Error` object.

## Rule Details

This rule is aimed at maintaining consistency when throwing exception by disallowing to throw literals and other expressions which cannot possibly be an `Error` object.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-throw-literal: "error"*/

throw "error";

throw 0;

throw undefined;

throw null;

const err = new Error();
throw "an " + err;
// err is recast to a string literal

const er2 = new Error();
throw `${err2}`

```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-throw-literal: "error"*/

throw new Error();

throw new Error("error");

const e = new Error("error");
throw e;

try {
    throw new Error("error");
} catch (e) {
    throw e;
}
```

## Options

This rule has no options.

## Known Limitations

Due to the limits of static analysis, this rule cannot guarantee that you will only throw `Error` objects.

Examples of **correct** code for this rule, but which do not throw an `Error` object:

**Correct:**

```js
/*eslint no-throw-literal: "error"*/

const err = "error";
throw err;

function foo(bar) {
    console.log(bar);
}
throw foo("error");

throw new String("error");

const baz = {
    bar: "error"
};
throw baz.bar;
```

---
title: "no-obj-calls"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-obj-calls.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-obj-calls

ECMAScript provides several global objects that are intended to be used as-is. Some of these objects look as if they could be constructors due to their capitalization (such as `Math`, `JSON`, and `Temporal`) but will throw an error if you try to execute them as functions.

The ECMAScript 5 specification makes it clear that both `Math` and `JSON` cannot be invoked:

> The Math object does not have a `[[Call]]` internal property; it is not possible to invoke the Math object as a function.

The ECMAScript 2015 specification makes it clear that `Reflect` cannot be invoked:

> The Reflect object also does not have a `[[Call]]` internal method; it is not possible to invoke the Reflect object as a function.

The ECMAScript 2017 specification makes it clear that `Atomics` cannot be invoked:

> The Atomics object does not have a `[[Call]]` internal method; it is not possible to invoke the Atomics object as a function.

The ECMAScript Internationalization API Specification makes it clear that `Intl` cannot be invoked:

> The Intl object does not have a `[[Call]]` internal method; it is not possible to invoke the Intl object as a function.

The Temporal proposal specification makes it clear that `Temporal` cannot be invoked:

> The Temporal object does not have a `[[Call]]` internal method; it cannot be invoked as a function.

The ECMAScript 2020 specification defines `globalThis` as the global `this` value of the current realm. Unless the host specifies otherwise, this is the
  global object, which:

> does not have a `[[Construct]]` internal method; it cannot be used as a constructor with the `new` operator.
>
> does not have a `[[Call]]` internal method; it cannot be invoked as a function.

## Rule Details

This rule disallows calling `Math`, `JSON`, `Reflect`, `Atomics`, `Intl`, `Temporal`, and `globalThis` as functions.

This rule also disallows using these objects as constructors with the `new` operator.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-obj-calls: "error"*/

const math = Math();

const newMath = new Math();

const json = JSON();

const newJSON = new JSON();

const reflect = Reflect();

const newReflect = new Reflect();

const atomics = Atomics();

const newAtomics = new Atomics();

const intl = Intl();

const newIntl = new Intl();

const temporal = Temporal();

const newTemporal = new Temporal();

const globalObject = globalThis();

const newGlobalObject = new globalThis();

```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-obj-calls: "error"*/

function area(r) {
    return Math.PI * r * r;
}

const object = JSON.parse("{}");

const value = Reflect.get({ x: 1, y: 2 }, "x");

const first = Atomics.load(foo, 0);

const segmenterFr = new Intl.Segmenter("fr", { granularity: "word" });

const instant = Temporal.Now.instant();

const parsed = globalThis.parseInt("42", 10);
```

## Options

This rule has no options.

---
title: "consistent-this"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/consistent-this.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# consistent-this

It is often necessary to capture the current execution context in order to make it available subsequently. A prominent example of this are jQuery callbacks:

```js
const that = this;
jQuery('li').click(function (event) {
    // here, "this" is the HTMLElement where the click event occurred
    that.setFoo(42);
});
```

There are many commonly used aliases for `this` such as `that`, `self` or `me`. It is desirable to ensure that whichever alias the team agrees upon is used consistently throughout the application.

## Rule Details

This rule enforces two things about variables with the designated alias names for `this`:

* If a variable with a designated name is declared, it *must* be either initialized (in the declaration) or assigned (in the same scope as the declaration) the value `this`.
* If a variable is initialized or assigned the value `this`, the name of the variable *must* be a designated alias.

## Options

This rule has one or more string options:

* designated alias names for `this` (default `"that"`)

Examples of **incorrect** code for this rule with the default `"that"` option:

**Incorrect:**

```js
/*eslint consistent-this: ["error", "that"]*/

let that = 42;

let self = this;

that = 42;

self = this;
```

Examples of **correct** code for this rule with the default `"that"` option:

**Correct:**

```js
/*eslint consistent-this: ["error", "that"]*/

let that = this;

const self = 42;

let foo;

that = this;

foo.bar = this;
```

Examples of **incorrect** code for this rule with the default `"that"` option, if the variable is not initialized:

**Incorrect:**

```js
/*eslint consistent-this: ["error", "that"]*/

let that;
function f() {
    that = this;
}
```

Examples of **correct** code for this rule with the default `"that"` option, if the variable is not initialized:

Declaring a variable `that` and assigning `this` to it.

**Correct:**

```js
/*eslint consistent-this: ["error", "that"]*/

let that;
that = this;
```

Declaring two variables, `foo` and `that`, with `foo` initialized, and then assigning `this` to `that`.

**Correct:**

```js
/*eslint consistent-this: ["error", "that"]*/

let foo = 42, that;
that = this;
```

## When Not To Use It

If you need to capture nested context, `consistent-this` is going to be problematic. Code of that nature is usually difficult to read and maintain and you should consider refactoring it.

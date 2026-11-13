---
title: "no-new"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-new.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-new

The goal of using `new` with a constructor is typically to create an object of a particular type and store that object in a variable, such as:

```js
const person = new Person();
```

It's less common to use `new` and not store the result, such as:

```js
new Person();
```

In this case, the created object is thrown away because its reference isn't stored anywhere, and in many cases, this means that the constructor should be replaced with a function that doesn't require `new` to be used.

## Rule Details

This rule is aimed at maintaining consistency and convention by disallowing constructor calls using the `new` keyword that do not assign the resulting object to a variable.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-new: "error"*/

new Thing();
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-new: "error"*/

const thing = new Thing();

Foo();
```

## Options

This rule has no options.

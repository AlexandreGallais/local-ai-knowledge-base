---
title: "constructor-super"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/constructor-super.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# constructor-super

Constructors of derived classes must call `super()`.
Constructors of non derived classes must not call `super()`.
If this is not observed, the JavaScript engine will raise a runtime error.

This rule checks whether or not there is a valid `super()` call.

## Rule Details

This rule is aimed to flag invalid/missing `super()` calls.

This is a syntax error because there is no `extends` clause in the class:

```js
class A {
    constructor() {
        super();
    }
}
```

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint constructor-super: "error"*/

class A extends B {
    constructor() { }  // Would throw a ReferenceError.
}

// Classes which inherits from a non constructor are always problems.
class C extends null {
    constructor() {
        super();  // Would throw a TypeError.
    }
}

class D extends null {
    constructor() { }  // Would throw a ReferenceError.
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint constructor-super: "error"*/

class A {
    constructor() { }
}

class B extends C {
    constructor() {
        super();
    }
}
```

## Options

This rule has no options.

## When Not To Use It

If you don't want to be notified about invalid/missing `super()` callings in constructors, you can safely disable this rule.

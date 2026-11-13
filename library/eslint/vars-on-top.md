---
title: "vars-on-top"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/vars-on-top.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# vars-on-top

The `vars-on-top` rule generates warnings when variable declarations are not used serially at the top of a function scope or the top of a program.
By default variable declarations are always moved (“hoisted”) invisibly to the top of their containing scope by the JavaScript interpreter.
This rule forces the programmer to represent that behavior by manually moving the variable declaration to the top of its containing scope.

## Rule Details

This rule aims to keep all variable declarations in the leading series of statements.
Allowing multiple declarations helps promote maintainability and is thus allowed.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint vars-on-top: "error"*/

// Variable declaration in a nested block, and a variable declaration after other statements:
function doSomething() {
    if (true) {
        var first = true;
    }
    var second;
}

// Variable declaration in for initializer:
function doSomethingElse() {
    for (var i=0; i<10; i++) {}
}
```

**Incorrect:**

```js
/*eslint vars-on-top: "error"*/

// Variable declaration after other statements:
f();
var a;
```

**Incorrect:**

```js
/*eslint vars-on-top: "error"*/

// Variables in class static blocks should be at the top of the static blocks.

class C {

    // Variable declaration in a nested block:
    static {
        if (something) {
            var a = true;
        }
    }

    // Variable declaration after other statements:
    static {
        f();
        var a;
    }

}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint vars-on-top: "error"*/

function doSomething() {
    var first;
    var second; //multiple declarations are allowed at the top
    if (true) {
        first = true;
    }
}

function doSomethingElse() {
    var i;
    for (i=0; i<10; i++) {}
}
```

**Correct:**

```js
/*eslint vars-on-top: "error"*/

var a;
f();
```

**Correct:**

```js
/*eslint vars-on-top: "error"*/

class C {

    static {
        var a;
        if (something) {
            a = true;
        }
    }

    static {
        var a;
        f();
    }

}
```

**Correct:**

```js
/*eslint vars-on-top: "error"*/

// Directives may precede variable declarations.
"use strict";
var a;
f();

// Comments can describe variables.
function doSomething() {
    // this is the first var.
    var first;
    // this is the second var.
    var second;
}
```

## Options

This rule has no options.

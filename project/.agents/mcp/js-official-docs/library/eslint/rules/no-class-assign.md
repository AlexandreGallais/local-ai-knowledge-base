---
title: "no-class-assign"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-class-assign.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-class-assign

`ClassDeclaration` creates a variable, and we can modify the variable.

```js
class A { }
A = 0;
```

But the modification is a mistake in most cases.

## Rule Details

This rule is aimed to flag modifying variables of class declarations.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-class-assign: "error"*/

class A { }
A = 0;
```

**Incorrect:**

```js
/*eslint no-class-assign: "error"*/

A = 0;
class A { }
```

**Incorrect:**

```js
/*eslint no-class-assign: "error"*/

class A {
    b() {
        A = 0;
    }
}
```

**Incorrect:**

```js
/*eslint no-class-assign: "error"*/

let A = class A {
    b() {
        A = 0;
        // `let A` is shadowed by the class name.
    }
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-class-assign: "error"*/

let A = class A { }
A = 0; // A is a variable.
```

**Correct:**

```js
/*eslint no-class-assign: "error"*/

let A = class {
    b() {
        A = 0; // A is a variable.
    }
}
```

**Correct:**

```js
/*eslint no-class-assign: 2*/

class A {
    b(A) {
        A = 0; // A is a parameter.
    }
}
```

## Options

This rule has no options.

## When Not To Use It

If you don't want to be notified about modifying variables of class declarations, you can safely disable this rule.

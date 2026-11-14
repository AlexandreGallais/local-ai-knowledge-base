---
title: "no-constructor-return"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-constructor-return.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-constructor-return

In JavaScript, returning a value in the constructor of a class may be a mistake. Forbidding this pattern prevents mistakes resulting from unfamiliarity with the language or a copy-paste error.

## Rule Details

This rule disallows return statements in the constructor of a class. Note that returning nothing is allowed.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-constructor-return: "error"*/

class A {
    constructor(a) {
        this.a = a;
        return a;
    }
}

class B {
    constructor(f) {
        if (!f) {
            return 'falsy';
        }
    }
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-constructor-return: "error"*/

class C {
    constructor(c) {
        this.c = c;
    }
}

class D {
    constructor(f) {
        if (!f) {
            return;  // Flow control.
        }

        f();
    }
}

class E {
    constructor() {
        return;
    }
}

```

## Options

This rule has no options.

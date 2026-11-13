---
title: "no-extra-semi"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-extra-semi.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-extra-semi

Typing mistakes and misunderstandings about where semicolons are required can lead to semicolons that are unnecessary. While not technically an error, extra semicolons can cause confusion when reading code.

## Rule Details

This rule disallows unnecessary semicolons.

Problems reported by this rule can be fixed automatically, except when removing a semicolon would cause a following statement to become a directive such as `"use strict"`.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-extra-semi: "error"*/

var x = 5;;

function foo() {
    // code
};

class C {
    field;;

    method() {
        // code
    };

    static {
        // code
    };
};
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-extra-semi: "error"*/

var x = 5;

function foo() {
    // code
}

var bar = function() {
    // code
};

class C {
    field;

    method() {
        // code
    }

    static {
        // code
    }
}
```

## When Not To Use It

If you intentionally use extra semicolons then you can disable this rule.

---
title: "no-extra-semi"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/no-extra-semi/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
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
/* eslint @stylistic/no-extra-semi: "error" */

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
/* eslint @stylistic/no-extra-semi: "error" */

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

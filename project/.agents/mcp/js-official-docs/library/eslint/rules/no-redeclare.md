---
title: "no-redeclare"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-redeclare.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-redeclare

In JavaScript, it's possible to redeclare the same variable name using `var`. This can lead to confusion as to where the variable is actually declared and initialized.

## Rule Details

This rule is aimed at eliminating variables that have multiple declarations in the same scope.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-redeclare: "error"*/

var a = 3;
var a = 10;

class C {
    foo() {
        var b = 3;
        var b = 10;
    }

    static {
        var c = 3;
        var c = 10;
    }
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-redeclare: "error"*/

var a = 3;
a = 10;

class C {
    foo() {
        var b = 3;
        b = 10;
    }

    static {
        var c = 3;
        c = 10;
    }
}

```

## Options

This rule takes one optional argument, an object with a boolean property `"builtinGlobals"`. It defaults to `true`.
If set to `true`, this rule also checks redeclaration of built-in globals, such as `Object`, `Array`, `Number`...

### builtinGlobals

The `"builtinGlobals"` option will check for redeclaration of built-in globals in global scope.

Examples of **incorrect** code for the `{ "builtinGlobals": true }` option:

**Incorrect:**

```js
/*eslint no-redeclare: ["error", { "builtinGlobals": true }]*/

var Object = 0;
```

Note that when using `sourceType: "commonjs"` (or `ecmaFeatures.globalReturn`, if using the default parser), the top scope of a program is not actually the global scope, but rather a "module" scope. When this is the case, declaring a variable named after a builtin global is not a redeclaration, but rather a shadowing of the global variable. In that case, the `no-shadow` rule with the `"builtinGlobals"` option should be used.

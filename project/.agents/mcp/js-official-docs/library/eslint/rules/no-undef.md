---
title: "no-undef"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-undef.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-undef

This rule can help you locate potential ReferenceErrors resulting from misspellings of variable and parameter names, or accidental implicit globals (for example, from forgetting the `var` keyword in a `for` loop initializer).

## Rule Details

Any reference to an undeclared variable causes a warning, unless the variable is explicitly mentioned in a `/*global ...*/` comment, or specified in the `globals` key in the configuration file. A common use case for these is if you intentionally use globals that are defined elsewhere (e.g. in a script sourced from HTML).

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-undef: "error"*/

const foo = someFunction();
const bar = a + 1;
```

Examples of **correct** code for this rule with `global` declaration:

**Correct:**

```js
/*global someFunction, a*/
/*eslint no-undef: "error"*/

const foo = someFunction();
const bar = a + 1;
```

Note that this rule does not disallow assignments to read-only global variables.
See no-global-assign if you also want to disallow those assignments.

This rule also does not disallow redeclarations of global variables.
See no-redeclare if you also want to disallow those redeclarations.

## Options

* `typeof` set to true will warn for variables used inside typeof check (Default false).

### typeof

Examples of **correct** code for the default `{ "typeof": false }` option:

**Correct:**

```js
/*eslint no-undef: "error"*/

if (typeof UndefinedIdentifier === "undefined") {
    // do something ...
}
```

You can use this option if you want to prevent `typeof` check on a variable which has not been declared.

Examples of **incorrect** code for the `{ "typeof": true }` option:

**Incorrect:**

```js
/*eslint no-undef: ["error", { "typeof": true }] */

if(typeof a === "string"){}
```

Examples of **correct** code for the `{ "typeof": true }` option with `global` declaration:

**Correct:**

```js
/*global a*/
/*eslint no-undef: ["error", { "typeof": true }] */

if(typeof a === "string"){}
```

## When Not To Use It

If explicit declaration of global variables is not to your taste.

## Compatibility

This rule provides compatibility with treatment of global variables in JSHint and JSLint.

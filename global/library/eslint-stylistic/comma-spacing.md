---
title: "comma-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/comma-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# comma-spacing

Spacing around commas improves readability of a list of items. Although most of the style guidelines for languages prescribe adding a space after a comma and not before it, it is subjective to the preferences of a project.

```js
var foo = 1, bar = 2;
var foo = 1 ,bar = 2;
```

## Rule Details

This rule enforces consistent spacing before and after commas in variable declarations, array literals, object literals, function parameters, and sequences.

This rule does not apply in either of the following cases:

- between two commas
- between opening bracket `[` and comma, to avoid conflicts with the `array-bracket-spacing` rule
- between comma and closing bracket `]`, to avoid conflicts with the `array-bracket-spacing` rule
- between comma and closing brace `}`, to avoid conflicts with the `object-curly-spacing` rule
- between comma and closing parentheses `)`, to avoid conflicts with the `space-in-parens` rule
- between comma and closing angle bracket `>`, to avoid conflicts with the `type-generic-spacing` rule

## Options

This rule has an object option:

- `"before": false` (default) disallows spaces before commas
- `"before": true` requires one or more spaces before commas
- `"after": true` (default) requires one or more spaces after commas
- `"after": false` disallows spaces after commas

### after

Examples of **incorrect** code for this rule with the default `{ "before": false, "after": true }` options:

**Incorrect:**

```js
/* eslint @stylistic/comma-spacing: ["error", { "before": false, "after": true }] */

var foo = 1 ,bar = 2;
var arr = [1 , 2];
var obj = {"foo": "bar" ,"baz": "qur"};
foo(a ,b);
new Foo(a ,b);
function baz(a ,b){}
a ,b

type Foo<T ,P> = Bar<T ,P>
```

Examples of **correct** code for this rule with the default `{ "before": false, "after": true }` options:

**Correct:**

```ts
/* eslint @stylistic/comma-spacing: ["error", { "before": false, "after": true }] */

var foo = 1, bar = 2
    , baz = 3;
var arr = [1, 2];
var arr = [1,, 3]
var obj = {"foo": "bar", "baz": "qur"};
foo(a, b);
new Foo(a, b);
function qur(a, b){}
a, b

type Foo<T, P> = Bar<T, P>
```

Additional examples of **correct** code for this rule with the default `{ "before": false, "after": true }` options:

**Correct:**

```ts
/* eslint @stylistic/comma-spacing: ["error", { "before": false, "after": true }] */

// this rule does not enforce spacing between two commas
var arr = [
    ,,
    , ,
];

// this rule does not enforce spacing after `[` and before `]`
var arr = [,];
var arr = [ , ];
var arr = [a, b,];
[,] = arr;
[ , ] = arr;
[a, b,] = arr;

// this rule does not enforce spacing before `}`
var obj = {x, y,};
var {z, q,} = obj;
import {foo, bar,} from "mod";

// this rule does not enforce spacing before `)`
foo(a, b,)

// this rule does not enforce spacing before `>`
type Foo<T, P,> = Bar<T, P>
```

### before

Examples of **incorrect** code for this rule with the `{ "before": true, "after": false }` options:

**Incorrect:**

```js
/* eslint @stylistic/comma-spacing: ["error", { "before": true, "after": false }] */

var foo = 1, bar = 2;
var arr = [1 , 2];
var obj = {"foo": "bar", "baz": "qur"};
new Foo(a,b);
function baz(a,b){}
a, b
```

Examples of **correct** code for this rule with the `{ "before": true, "after": false }` options:

**Correct:**

```js
/* eslint @stylistic/comma-spacing: ["error", { "before": true, "after": false }] */

var foo = 1 ,bar = 2 ,
    baz = true;
var arr = [1 ,2];
var arr = [1 ,,3]
var obj = {"foo": "bar" ,"baz": "qur"};
foo(a ,b);
new Foo(a ,b);
function qur(a ,b){}
a ,b
```

## When Not To Use It

If your project will not be following a consistent comma-spacing pattern, turn this rule off.

---
title: "no-shadow-restricted-names"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-shadow-restricted-names.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-shadow-restricted-names

ES2020 §18.1 Value Properties of the Global Object (`globalThis`, `NaN`, `Infinity`, `undefined`) as well as strict mode restricted identifiers `eval` and `arguments` are considered to be restricted names in JavaScript. Defining them to mean something else can have unintended consequences and confuse others reading the code. For example, there's nothing preventing you from writing:

```js
const undefined = "foo";
```

Then any code used within the same scope would not get the global `undefined`, but rather the local version with a very different meaning.

## Rule Details

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-shadow-restricted-names: "error"*/

function NaN(){}

!function(Infinity){};

const undefined = 5;

try {} catch(eval){}
```

**Incorrect:**

```js
/*eslint no-shadow-restricted-names: "error"*/

import NaN from "foo";

import { undefined } from "bar";

class Infinity {}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-shadow-restricted-names: "error"*/

let Object;

function f(a, b){}

// Exception: `undefined` may be shadowed if the variable is never assigned a value.
let undefined;
```

**Correct:**

```js
/*eslint no-shadow-restricted-names: "error"*/

import { undefined as undef } from "bar";
```

## Options

This rule has an object option:

* `"reportGlobalThis"`: `true` (default) reports declarations of `globalThis`.

### reportGlobalThis

Examples of **incorrect** code for the default `{ "reportGlobalThis": true }` option:

**Incorrect:**

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

const globalThis = "foo";
```

**Incorrect:**

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

function globalThis() {}
```

**Incorrect:**

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

import { globalThis } from "bar";
```

**Incorrect:**

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

class globalThis {}
```

Examples of **correct** code for the default `{ "reportGlobalThis": true }` option:

**Correct:**

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": true }]*/

const foo = globalThis;

function bar() {
    return globalThis;
}

import { globalThis as baz } from "foo";
```

Examples of **correct** code for the `{ "reportGlobalThis": false }` option:

**Correct:**

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": false }]*/

const globalThis = "foo";
```

**Correct:**

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": false }]*/

function globalThis() {}
```

**Correct:**

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": false }]*/

import { globalThis } from "bar";
```

**Correct:**

```js
/*eslint no-shadow-restricted-names: ["error", { "reportGlobalThis": false }]*/

class globalThis {}
```

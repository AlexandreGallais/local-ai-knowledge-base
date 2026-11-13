---
title: "default-param-last"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/default-param-last.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# default-param-last

Putting default parameter at last allows function calls to omit optional tail arguments.

```js
// Correct: optional argument can be omitted
function createUser(id, isAdmin = false) {}
createUser("tabby")

// Incorrect: optional argument can **not** be omitted
function createUser(isAdmin = false, id) {}
createUser(undefined, "tabby")
```

## Rule Details

This rule enforces default parameters to be the last of parameters.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/* eslint default-param-last: ["error"] */

function f(a = 0, b) {}

function g(a, b = 0, c) {}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/* eslint default-param-last: ["error"] */

function f(a, b = 0) {}

function g(a, b = 0, c = 0) {}
```

This rule additionally supports TypeScript type syntax.

Examples of **incorrect** TypeScript code for this rule:

**Incorrect:**

```ts
/* eslint default-param-last: ["error"] */

function h(a = 0, b: number) {}
```

Examples of **correct** TypeScript code for this rule:

**Correct:**

```ts
/* eslint default-param-last: ["error"] */

function h(a = 0, b?: number) {}
```

## Options

This rule has no options.

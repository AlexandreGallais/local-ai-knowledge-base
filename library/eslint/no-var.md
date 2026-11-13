---
title: "no-var"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-var.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-var

ECMAScript 6 allows programmers to create variables with block scope instead of function scope using the `let`
and `const` keywords. Block scope is common in many other programming languages and helps programmers avoid mistakes
such as:

```js
var count = people.length;
var enoughFood = sandwiches.length >= count;

if (enoughFood) {
    var count = sandwiches.length; // accidentally overriding the count variable
    console.log("We have " + count + " sandwiches for everyone. Plenty for all!");
}

// our count variable is no longer accurate
console.log("We have " + count + " people and " + sandwiches.length + " sandwiches!");
```

## Rule Details

This rule is aimed at discouraging the use of `var` and encouraging the use of `const` or `let` instead.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-var: "error"*/

var x = "y";
var CONFIG = {};
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-var: "error"*/

let x = "y";
const CONFIG = {};
```

This rule additionally supports TypeScript type syntax. There are multiple ways to declare global variables in TypeScript. Only using `var` works for all cases. See this TypeScript playground for reference.

Examples of **incorrect** TypeScript code for this rule:

**Incorrect:**

```ts
/*eslint no-var: "error"*/

declare var x: number

declare namespace ns {
	var x: number
}

declare module 'module' {
	var x: number
}
```

Examples of **correct** TypeScript code for this rule:

**Correct:**

```ts
/*eslint no-var: "error"*/

declare global {
    declare var x: number
}
```

## Options

This rule has no options.

## When Not To Use It

In addition to non-ES6 environments, existing JavaScript projects that are beginning to introduce ES6 into their
codebase may not want to apply this rule if the cost of migrating from `var` to `let` is too costly.

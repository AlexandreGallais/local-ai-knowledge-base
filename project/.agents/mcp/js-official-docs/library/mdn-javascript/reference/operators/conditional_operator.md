---
title: "Conditional (ternary) operator"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/conditional_operator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Conditional (ternary) operator

The **conditional (ternary) operator** is the only JavaScript operator that takes three operands:
a condition followed by a question mark (`?`), then an expression to execute if the condition is truthy followed by a colon (`:`), and finally the expression to execute if the condition is falsy.
This operator is frequently used as an alternative to an `if...else` statement.

```js
function getFee(isMember) {
  return isMember ? "$2.00" : "$10.00";
}

console.log(getFee(true));
// Expected output: "$2.00"

console.log(getFee(false));
// Expected output: "$10.00"

console.log(getFee(null));
// Expected output: "$10.00"
```

## Syntax

```js
condition ? exprIfTrue : exprIfFalse
```

### Parameters

- `condition`
    An expression whose value is used as a condition.
- `exprIfTrue`
    An expression which is executed if the `condition` evaluates to a truthy value (one which equals or can be converted to `true`).
- `exprIfFalse`
    An expression which is executed if the `condition` is falsy (that is, has a value which can be converted to `false`).

## Description

Besides `false`, possible falsy expressions are: `null`, `NaN`, `0`, the empty string (`""`), and `undefined`.
If `condition` is any of these, the result of the conditional expression will be the result of executing the expression `exprIfFalse`.

## Examples

### A basic <example-value>

```js
const age = 26;
const beverage = age >= 21 ? "Beer" : "Juice";
console.log(beverage); // "Beer"
```

### Handling null values

One common usage is to handle a value that may be `null`:

```js
const greeting = (person) => {
  const name = person ? person.name : "stranger";
  return `Howdy, ${name}`;
};

console.log(greeting({ name: "Alice" })); // "Howdy, Alice"
console.log(greeting(null)); // "Howdy, stranger"
```

### Conditional chains

The ternary operator is right-associative, which means it can be "chained" in the following way, similar to an `if … else if … else if … else` chain:

```js
function example() {
  return condition1 ? value1
    : condition2 ? value2
    : condition3 ? value3
    : value4;
}
```

This is equivalent to the following `if...else` chain.

```js
function example() {
  if (condition1) {
    return value1;
  } else if (condition2) {
    return value2;
  } else if (condition3) {
    return value3;
  } else {
    return value4;
  }
}
```

## See also

- `if...else`
- Nullish coalescing operator (`??`)
- Optional chaining (`?.`)
- Learn: Making decisions in your code — conditionals
- Expressions and operators guide

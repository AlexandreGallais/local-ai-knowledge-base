---
title: "Grouping operator ( )"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/grouping/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Grouping operator ( )

The **grouping `( )`** operator controls the precedence of evaluation in expressions. It also acts as a container for arbitrary expressions in certain syntactic constructs, where ambiguity or syntax errors would otherwise occur.

```js
console.log(1 + 2 * 3); // 1 + 6
// Expected output: 7

console.log(1 + (2 * 3)); // 1 + 6
// Expected output: 7

console.log((1 + 2) * 3); // 3 * 3
// Expected output: 9

console.log(1 * 3 + 2 * 3); // 3 + 6
// Expected output: 9
```

## Syntax

```js
(expression)
```

### Parameters

- `expression`
    Any expression to be evaluated, including comma-joined expressions.

## Description

The grouping operator consists of a pair of parentheses around an expression that groups the contents. The operator overrides the normal operator precedence, so that operators with lower precedence (as low as the comma operator) can be evaluated before an operator with higher precedence.

## Examples

### Using the grouping operator

Evaluating addition and subtraction before multiplication and division.

```js
const a = 1;
const b = 2;
const c = 3;

// default precedence
a + b * c; // 7
// evaluated by default like this
a + (b * c); // 7

// now overriding precedence
// addition before multiplication
(a + b) * c; // 9

// which is equivalent to
a * c + b * c; // 9
```

Notice in these examples that the order in which the _operators_ evaluate has changed, but the order in which the _operands_ evaluate has not. For example, in this code, the function invocations `a()`, `b()`, and `c()` are evaluated left-to-right (the normal order of evaluation) before the operator order is considered.

```js
a() * (b() + c());
```

The function `a` will be called before the function `b`, which will be called before the function `c`. For more on operator precedence, see its reference page.

### Using the grouping operator to eliminate parsing ambiguity

An expression statement cannot start with the keyword `function`, because the parser would see it as the start of a function declaration. This means the following IIFE syntax is invalid:

```js
function () {
  // code
}();
```

The grouping operator can be used to eliminate this ambiguity, since when the parser sees the left parenthesis, it knows that what follows must be an expression instead of a declaration.

```js
(function () {
  // code
})();
```

You may also use the `void` operator to eliminate ambiguity.

In an arrow function expression body (one that directly returns an expression without the keyword `return`), the grouping operator can be used to return an object literal expression, because otherwise the left curly brace would be interpreted as the start of the function body.

```js
const f = () => ({ a: 1 });
```

If a property is accessed on a number literal, the property accessor dot `.` may be ambiguous with a decimal point, unless the number already has a decimal point. You can wrap integer literals in parentheses to eliminate this ambiguity.

```js
(1).toString(); // "1"
```

### Grouping operator and automatic semicolon insertion

The grouping operator can mitigate automatic semicolon insertion (ASI) pitfalls. For example, the `return` keyword and the returned expression cannot have a line break in between:

```js
function sum(a, b) {
  return
    a + b;
}
```

This code will return `undefined`, because a semicolon is inserted directly after the `return` keyword, which causes the function to return immediately without evaluating `a + b`. In case the returned expression is long and you want to keep it well-formatted, you may use the grouping operator to signify that the `return` keyword is followed by an expression and prevent semicolon insertion:

```js
function sum(a, b) {
  return (
    a + b
  );
}
```

However, grouping may also _introduce_ ASI hazards. When a line starts with a left parenthesis and the previous line ends with an expression, the parser will not insert a semicolon before the line break, because it could be the middle of a function call. For example:

```js
const a = 1
(1).toString()
```

This code would be parsed as:

```js
const a = 1(1).toString();
```

Which throws "TypeError: 1 is not a function". If your coding style does not use semicolons, remember that when a line starts with a left parenthesis, _prefix_ it with a semicolon. This practice is recommended by several formatters and/or style guides, including Prettier and standard.

```js
const a = 1
;(1).toString()
```

For more advice on working with ASI, see its reference section.

## See also

- Operator precedence
- `delete`
- `typeof`

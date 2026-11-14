---
title: "Expression statement"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/expression_statement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Expression statement

An **expression statement** is an expression used in a place where a statement is expected. The expression is evaluated and its result is discarded — therefore, it makes sense only for expressions that have side effects, such as executing a function or updating a variable.

## Syntax

```js
expression;
```

- `expression`
    An arbitrary expression to be evaluated. There are certain expressions that may be ambiguous with other statements and are thus forbidden.

## Description

Apart from the dedicated statement syntaxes, you can also use almost any expression as a statement on its own. The expression statement syntax requires a semicolon at the end, but the automatic semicolon insertion process may insert one for you if the lack of a semicolon results in invalid syntax.

Because the expression is evaluated and then discarded, the result of the expression is not available. Therefore, the expression must have some side effect for it to be useful. Expression statements are commonly:

- Function calls (`console.log("Hello");`, `[1, 2, 3].forEach((i) => console.log(i));`)
- Tagged template literals
- Assignment expressions, including compound assignments
- Increment and decrement operators
- `delete`
- `import()`
- `yield` and `yield*`

Others may also have side effects if they invoke getters or trigger type coercions.

### Forbidden expressions

In order for an expression to be used as a statement, it must not be ambiguous with other statement syntaxes. Therefore, the expression must not start with any of the following tokens:

- `function`: which would be a `function` declaration or `function*` declaration, not a `function` expression or `function*` expression
- `async function`: which would be an `async function` declaration or `async function*` declaration, not an `async function` expression or `async function*` expression
- `class`: which would be a `class` declaration, not a `class` expression
- `let[`: which would be a `let` declaration with array destructuring, not a property accessor on a variable called `let` (`let` can only be an identifier in non-strict mode)
- `{`: which would be a block statement, not an object literal

Therefore, all of the following are invalid:

```js
function foo() {
  console.log("foo");
}(); // SyntaxError: Unexpected token '<example-value>'

// For some reason, you have a variable called `let`
var let = [1, 2, 3];
let[0] = 4; // SyntaxError: Invalid destructuring assignment target

{
  foo: 1,
  bar: 2, // SyntaxError: Unexpected token '<example-value>'
};
```

More dangerously, sometimes the code happens to be valid syntax, but is not what you intend.

```js
// For some reason, you have a variable called `let`
var let = [1, 2, 3];

function setIndex(index, value) {
  if (index >= 0) {
    // Intend to assign to the array `let`, but instead creates an extra variable!
    let[index] = value;
  }
}

setIndex(0, [1, 2]);
console.log(let); // [1, 2, 3]

// This is not an object literal, but a block statement,
// where `foo` is a label and `1` is an expression statement.
// This often happens in the console
{ foo: 1 };
```

To avoid these problems, you can use parentheses, so that the statement is unambiguously an expression statement.

```js
(function foo() {
  console.log("foo");
})();
```

## Examples

### Avoiding control flow statements

You can avoid almost all use of control flow statements using expression statements. For example, `if...else` can be replaced with ternary operators and logical operators. Iterative statements like `for` or `for...of` can be replaced with array methods.

```js
// Using control flow statements
function range(start, end) {
  if (start > end) {
    [start, end] = [end, start];
  }
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

// Using expression statements
function range2(start, end) {
  start > end && ([start, end] = [end, start]);
  return Array.from({ length: end - start }, (_, i) => start + i);
}
```

> **Warning:**
> This only demonstrates a capability of the language. Excessive use of expression statements as a substitute for control-flow statements can make code much less readable.

## See also

- Statements and declarations
- Expressions and operators

---
title: "Expressions and operators (part 1 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/expressions_and_operators/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Expressions and operators

This chapter describes JavaScript's expressions and operators, including assignment, comparison, arithmetic, bitwise, logical, string, ternary and more.

At a high level, an _expression_ is a valid unit of code that resolves to a value. There are two types of expressions: those that have side effects (such as assigning values) and those that purely _evaluate_.

The expression `x = 7` is an example of the first type. This expression uses the `=` _operator_ to assign the value seven to the variable `x`. The expression itself evaluates to `7`.

The expression `3 + 4` is an example of the second type. This expression uses the `+` operator to add `3` and `4` together and produces a value, `7`. However, if it's not eventually part of a bigger construct (for example, a variable declaration like `const z = 3 + 4`), its result will be immediately discarded — this is usually a programmer mistake because the evaluation doesn't produce any effects.

As the examples above also illustrate, all complex expressions are joined by _operators_, such as `=` and `+`. In this section, we will introduce the following operators:

- Assignment operators
- Comparison operators
- Arithmetic operators
- Bitwise operators
- Logical operators
- BigInt operators
- String operators
- Conditional (ternary) operator
- Comma operator
- Unary operators
- Relational operators

These operators join operands either formed by higher-precedence operators or one of the basic expressions. A complete and detailed list of operators and expressions is also available in the reference.

The _precedence_ of operators determines the order they are applied when evaluating an expression. For example:

```js
const x = 1 + 2 * 3;
const y = 2 * 3 + 1;
```

Despite `*` and `+` coming in different orders, both expressions would result in `7` because `*` has precedence over `+`, so the `*`-joined expression will always be evaluated first. You can override operator precedence by using parentheses (which creates a grouped expression — the basic <example-value>). To see a complete table of operator precedence as well as various caveats, see the Operator Precedence Reference page.

JavaScript has both _binary_ and _unary_ operators, and one special ternary operator, the conditional operator.
A binary operator requires two operands, one before the operator and one after the operator:

```plain
operand1 operator operand2
```

For example, `3 + 4` or `x * y`. This form is called an _infix_ binary operator, because the operator is placed between two operands. All binary operators in JavaScript are infix.

A unary operator requires a single operand, either before or after the operator:

```plain
operator operand
operand operator
```

For example, `x++` or `++x`. The `operator operand` form is called a _prefix_ unary operator, and the `operand operator` form is called a _postfix_ unary operator. `++` and `--` are the only postfix operators in JavaScript — all other operators, like `!`, `typeof`, etc. are prefix.

## Assignment operators

An assignment operator assigns a value to its left operand based on the value of its right operand.
The simple assignment operator is equal (`=`), which assigns the value of its right operand to its left operand.
That is, `x = f()` is an assignment expression that assigns the value of `f()` to `x`.

There are also compound assignment operators that are shorthand for the operations listed in the following table:

| Name                                                                                                              | Shorthand operator | Meaning            |
| ----------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------ |
| Assignment                                           | `x = f()`          | `x = f()`          |
| Addition assignment                         | `x += f()`         | `x = x + f()`      |
| Subtraction assignment                   | `x -= f()`         | `x = x - f()`      |
| Multiplication assignment             | `x *= f()`         | `x = x * f()`      |
| Division assignment                         | `x /= f()`         | `x = x / f()`      |
| Remainder assignment                       | `x %= f()`         | `x = x % f()`      |
| Exponentiation assignment             | `x **= f()`        | `x = x ** f()`     |
| Left shift assignment                     | `x <<= f()`        | `x = x << f()`     |
| Right shift assignment                   | `x >>= f()`        | `x = x >> f()`     |
| Unsigned right shift assignment | `x >>>= f()`       | `x = x >>> f()`    |
| Bitwise AND assignment                   | `x &= f()`         | `x = x & f()`      |
| Bitwise XOR assignment                   | `x ^= f()`         | `x = x ^ f()`      |
| Bitwise OR assignment                     | `x \|= f()`        | `x = x \| f()`     |
| Logical AND assignment                   | `x &&= f()`        | `x && (x = f())`   |
| Logical OR assignment                     | `x \|\|= f()`      | `x \|\| (x = f())` |
| Nullish coalescing assignment     | `x ??= f()`        | `x ?? (x = f())`   |

### Assigning to properties

If an expression evaluates to an object, then the left-hand side of an assignment expression may make assignments to properties of that expression.
For example:

```js
const obj = {};

obj.x = 3;
console.log(obj.x); // Prints 3.
console.log(obj); // Prints { x: 3 }.

const key = "y";
obj[key] = 5;
console.log(obj[key]); // Prints 5.
console.log(obj); // Prints { x: 3, y: 5 }.
```

For more information about objects, read Working with Objects.

If an expression does not evaluate to an object, then assignments to properties of that expression do not assign:

```js
const val = 0;
val.x = 3;

console.log(val.x); // Prints undefined.
console.log(val); // Prints 0.
```

In strict mode, the code above throws, because one cannot assign properties to primitives.

It is an error to assign values to unmodifiable properties or to properties of an expression without properties (`null` or `undefined`).

### Destructuring

For more complex assignments, the destructuring syntax is a JavaScript expression that makes it possible to extract data from arrays or objects using a syntax that mirrors the construction of array and
object literals.

Without destructuring, it takes multiple statements to extract values from arrays and objects:

```js
const foo = ["one", "two", "three"];

const one = foo[0];
const two = foo[1];
const three = foo[2];
```

With destructuring, you can extract multiple values into distinct variables using a single statement:

```js
const [one, two, three] = foo;
```

### Evaluation and nesting

In general, assignments are used within a variable declaration (i.e., with `const`, `let`, or `var`) or as standalone statements.

```js
// Declares a variable x and initializes it to the result of f().
// The result of the x = f() assignment expression is discarded.
let x = f();

x = g(); // Reassigns the variable x to the result of g().
```

However, like other expressions, assignment expressions like `x = f()` evaluate into a result value.
Although this result value is usually not used, it can then be used by another expression.

Chaining assignments or nesting assignments in other expressions can result in surprising behavior.
For this reason, some JavaScript style guides discourage chaining or nesting assignments.
Nevertheless, assignment chaining and nesting may occur sometimes, so it is important to be able to understand how they work.

By chaining or nesting an assignment expression, its result can itself be assigned to another variable.
It can be logged, it can be put inside an array literal or function call, and so on.

```js
let x;
const y = (x = f()); // Or equivalently: const y = x = f();
console.log(y); // Logs the return value of the assignment x = f().

console.log(x = f()); // Logs the return value directly.

// An assignment expression can be nested in any place
// where expressions are generally allowed,
// such as array literals' elements or as function calls' arguments.
console.log([0, x = f(), 0]);
console.log(f(0, x = f(), 0));
```

The evaluation result matches the expression to the right of the `=` sign in the
"Meaning" column of the table above. That means that `x = f()` evaluates into
whatever `f()`'s result is, `x += f()` evaluates into the resulting sum `x + f()`,
`x **= f()` evaluates into the resulting power `x ** f()`, and so on.

In the case of logical assignments, `x &&= f()`,
`x ||= f()`, and `x ??= f()`, the return value is that of the
logical operation without the assignment, so `x && f()`,
`x || f()`, and `x ?? f()`, respectively.

When chaining these expressions without parentheses or other grouping operators
like array literals, the assignment expressions are **grouped right to left**
(they are right-associative), but they are **evaluated left to right**.

Note that, for all assignment operators other than `=` itself,
the resulting values are always based on the operands' values _before_
the operation.

For example, assume that the following functions `f` and `g`
and the variables `x` and `y` have been declared:

```js
function f() {
  console.log("F!");
  return 2;
}
function g() {
  console.log("G!");
  return 3;
}
let x, y;
```

Consider these three examples:

```js
y = x = f();
y = [f(), x = g()];
x[f()] = g();
```

#### Evaluation example 1

`y = x = f()` is equivalent to `y = (x = f())`,
because the assignment operator `=` is right-associative.
However, it evaluates from left to right:

1. The assignment expression `y = x = f()` starts to evaluate.
   1. The `y` on this assignment's left-hand side evaluates
      into a reference to the variable named `y`.
   2. The assignment expression `x = f()` starts to evaluate.
      1. The `x` on this assignment's left-hand side evaluates
         into a reference to the variable named `x`.
      2. The function call `f()` prints "F!" to the console and
         then evaluates to the number `2`.
      3. That `2` result from `f()` is assigned to `x`.
   3. The assignment expression `x = f()` has now finished evaluating;
      its result is the new value of `x`, which is `2`.
   4. That `2` result in turn is also assigned to `y`.
2. The assignment expression `y = x = f()` has now finished evaluating;
   its result is the new value of `y` – which happens to be `2`.
   `x` and `y` are assigned to `2`,
   and the console has printed "F!".

#### Evaluation example 2

`y = [ f(), x = g() ]` also evaluates from left to right:

1. The assignment expression `y = [ f(), x = g() ]` starts to evaluate.
   1. The `y` on this assignment's left-hand evaluates
      into a reference to the variable named `y`.
   2. The inner array literal `[ f(), x = g() ]` starts to evaluate.
      1. The function call `f()` prints "F!" to the console and
         then evaluates to the number `2`.
      2. The assignment expression `x = g()` starts to evaluate.
         1. The `x` on this assignment's left-hand side evaluates
            into a reference to the variable named `x`.
         2. The function call `g()` prints "G!" to the console and
            then evaluates to the number `3`.
         3. That `3` result from `g()` is assigned to `x`.
      3. The assignment expression `x = g()` has now finished evaluating;
         its result is the new value of `x`, which is `3`.
         That `3` result becomes the next element
         in the inner array literal (after the `2` from the `f()`).
   3. The inner array literal `[ f(), x = g() ]`
      has now finished evaluating;
      its result is an array with two values: `[ 2, 3 ]`.
   4. That `[ 2, 3 ]` array is now assigned to `y`.
2. The assignment expression `y = [ f(), x = g() ]` has
   now finished evaluating;
   its result is the new value of `y` – which happens to be `[ 2, 3 ]`.
   `x` is now assigned to `3`,
   `y` is now assigned to `[ 2, 3 ]`,
   and the console has printed "F!" then "G!".

#### Evaluation example 3

`x[f()] = g()` also evaluates from left to right.
(This example assumes that `x` is already assigned to some object.
For more information about objects, read Working with Objects.)

1. The assignment expression `x[f()] = g()` starts to evaluate.
   1. The `x[f()]` property access on this assignment's left-hand
      starts to evaluate.
      1. The `x` in this property access evaluates
         into a reference to the variable named `x`.
      2. Then the function call `f()` prints "F!" to the console and
         then evaluates to the number `2`.
   2. The `x[f()]` property access on this assignment
      has now finished evaluating;
      its result is a variable property reference: `x[2]`.
   3. Then the function call `g()` prints "G!" to the console and
      then evaluates to the number `3`.
   4. That `3` is now assigned to `x[2]`.
      (This step will succeed only if `x` is assigned to an object.)
2. The assignment expression `x[f()] = g()` has now finished evaluating;
   its result is the new value of `x[2]` – which happens to be `3`.
   `x[2]` is now assigned to `3`,
   and the console has printed "F!" then "G!".

### Avoid assignment chains

Chaining assignments or nesting assignments in other expressions can
result in surprising behavior. For this reason,
chaining assignments in the same statement is discouraged.

In particular, putting a variable chain in a `const`, `let`, or `var` statement often does _not_ work. Only the outermost/leftmost variable would get declared; other variables within the assignment chain are _not_ declared by the `const`/`let`/`var` statement.
For example:

```js
const z = y = x = f();
```

This statement seemingly declares the variables `x`, `y`, and `z`.
However, it only actually declares the variable `z`.
`y` and `x` are either invalid references to nonexistent variables (in strict mode) or, worse, would implicitly create global variables for `x` and `y` in sloppy mode.

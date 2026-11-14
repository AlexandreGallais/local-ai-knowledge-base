---
title: "Expressions and operators"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Expressions and operators

This chapter documents all the JavaScript language operators, expressions and keywords.

## Expressions and operators by category

For an alphabetical listing see the sidebar on the left.

### Primary expressions

Basic <example-value> and general expressions in JavaScript. These expressions have the highest precedence (higher than operators).

- `this`
    The `this` keyword refers to a special property of an execution context.
- Literals
    Basic `null`, boolean, number, and string literals.
- `[]`
    Array initializer/literal syntax.
- `{}`
    Object initializer/literal syntax.
- `function`
    The `function` keyword defines a function expression.
- `class`
    The `class` keyword defines a class expression.
- `function*`
    The `function*` keyword defines a generator function expression.
- `async function`
    The `async function` defines an async function expression.
- `async function*`
    The `async function*` keywords define an async generator function expression.
- `/ab+c/i`
    Regular expression literal syntax.
- ``string``
    Template literal syntax.
- `( )`
    Grouping operator.

### Left-hand-side expressions

Left values are the destination of an assignment.

- `Property accessors`
    Member operators provide access to a property or method of an object (`object.property` and `object["property"]`).
- `?.`
    The optional chaining operator returns `undefined` instead of causing an error if a reference is nullish (`null` or `undefined`).
- `new`
    The `new` operator creates an instance of a constructor.
- `new.target`
    In constructors, `new.target` refers to the constructor that was invoked by `new`.
- `import.meta`
    An object exposing context-specific metadata to a JavaScript module.
- `super`
    The `super` keyword calls the parent constructor or allows accessing properties of the parent object.
- `import()`
    The `import()` syntax allows loading a module asynchronously and dynamically into a potentially non-module environment.
- `import.defer()`
    The `import.defer()` syntax loads a module dynamically, deferring synchronous evaluation until the returned namespace's properties are accessed.
- `import.source()`
    The `import.source()` syntax results in an object representing the module's compiled source, without loading its dependencies, linking it, or evaluating it.

### Increment and decrement

Postfix/prefix increment and postfix/prefix decrement operators.

- `A++`
    Postfix increment operator.
- `A--`
    Postfix decrement operator.
- `++A`
    Prefix increment operator.
- `--A`
    Prefix decrement operator.

### Unary operators

A unary operation is an operation with only one operand.

- `delete`
    The `delete` operator deletes a property from an object.
- `void`
    The `void` operator evaluates an expression and discards its return value.
- `typeof`
    The `typeof` operator determines the type of a given object.
- `+`
    The unary plus operator converts its operand to Number type.
- `-`
    The unary negation operator converts its operand to Number type and then negates it.
- `~`
    Bitwise NOT operator.
- `!`
    Logical NOT operator.
- `await`
    Pause and resume an async function and wait for the promise's fulfillment/rejection.

### Arithmetic operators

Arithmetic operators take numerical values (either literals or variables) as their operands and return a single numerical value.

- `**`
    Exponentiation operator.
- `*`
    Multiplication operator.
- `/`
    Division operator.
- `%`
    Remainder operator.
- `+` (Plus)
    Addition operator.
- `-`
    Subtraction operator.

### Relational operators

A comparison operator compares its operands and returns a boolean value based on whether the comparison is true.

- `<` (Less than)
    Less than operator.
- `>` (Greater than)
    Greater than operator.
- `<=`
    Less than or equal operator.
- `>=`
    Greater than or equal operator.
- `instanceof`
    The `instanceof` operator determines whether an object is an instance of another object.
- `in`
    The `in` operator determines whether an object has a given property.

> **Note:**
> `=>` is not an operator, but the notation for Arrow functions.

### Equality operators

The result of evaluating an equality operator is always of type boolean based on whether the comparison is true.

- `==`
    Equality operator.
- `!=`
    Inequality operator.
- `===`
    Strict equality operator.
- `!==`
    Strict inequality operator.

### Bitwise shift operators

Operations to shift all bits of the operand.

- `<<`
    Bitwise left shift operator.
- `>>`
    Bitwise right shift operator.
- `>>>`
    Bitwise unsigned right shift operator.

### Binary bitwise operators

Bitwise operators treat their operands as a set of 32 bits (zeros and ones) and return standard JavaScript numerical values.

- `&`
    Bitwise AND.
- `|`
    Bitwise OR.
- `^`
    Bitwise XOR.

### Binary logical operators

Logical operators implement boolean (logical) values and have short-circuiting behavior.

- `&&`
    Logical AND.
- `||`
    Logical OR.
- `??`
    Nullish Coalescing Operator.

### Conditional (ternary) operator

- `(condition ? ifTrue : ifFalse)`
    The conditional operator returns one of two values based on the logical value of the condition.

### Assignment operators

An assignment operator assigns a value to its left operand based on the value of its right operand.

- `=`
    Assignment operator.
- `*=`
    Multiplication assignment.
- `/=`
    Division assignment.
- `%=`
    Remainder assignment.
- `+=`
    Addition assignment.
- `-=`
    Subtraction assignment
- `<<=`
    Left shift assignment.
- `>>=`
    Right shift assignment.
- `>>>=`
    Unsigned right shift assignment.
- `&=`
    Bitwise AND assignment.
- `^=`
    Bitwise XOR assignment.
- `|=`
    Bitwise OR assignment.
- `**=`
    Exponentiation assignment.
- `&&=`
    Logical AND assignment.
- `||=`
    Logical OR assignment.
- `??=`
    Nullish coalescing assignment.
- `[a, b] = arr`, `{ a, b } = obj`
    Destructuring allows you to assign the properties of an array or object to variables using syntax that looks similar to array or object literals.

### Yield operators

- `yield`
    Pause and resume a generator function.
- `yield*`
    Delegate to another generator function or iterable object.

### Spread syntax

- `...obj`
    Spread syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected. In an object literal, the spread syntax enumerates the properties of an object and adds the key-value pairs to the object being created.

### Comma operator

- `,`
    The comma operator allows multiple expressions to be evaluated in a single statement and returns the result of the last expression.

## What are operators?

As the What are statements, declarations, and expressions? section explains, an expression is a fundamental building block that evaluates to a value. Statements, declarations, and expressions can all define specific slots where expressions are accepted. Where an expression contains slots for further nested expressions, the part(s) that are not slots are known as operators.

For example, the syntax for an addition expression is `expression + expression` (if you read the spec, the operands are called _AdditiveExpression_ and _MultiplicativeExpression_, which are both subsets of _Expression_, but that's the spec's mechanism for defining precedence and associativity and is irrelevant for our purposes). Apart from the two expression slots, the code entity it introduces is just `+`: the _addition operator_. Similarly, the syntax for a yield expression is `yield expression`, so `yield` is known as the operator. In other words, each operator corresponds to an expression.

MDN also regards expressions without slots such as `null` as operators per the definition above, although we nearly always just refer to them as "syntax" or "expression".

An expression does not need to take a fixed number of slots. For example, the array literal expression, `[expression, expression, expression]`, can take an arbitrary number of expression slots. The `[,,]` part might be called an "operator". MDN avoids this usage, but you may see it in functional programming languages like Haskell.

The definition of operators gets fuzzier with certain other code entities: what if an expression has a slot that's not an expression, or a code entity combined with an expression does not make an expression? Do we still refer to that code entity as an operator?

- In the optional chaining expression `foo?.bar`, `foo` is an expression, but `bar` must be an identifier and is not evaluated to a value. Do we still regard `?.` as an operator?
- In the arrow function expression `arg => body`, `body` might be an expression (although it can also be a block body), and `arg` is just an argument list. Do we still regard `=>` as an operator?
- In the spread syntax `...foo`, `foo` is an expression, but the whole thing is not an expression because it does not evaluate to a value—it only makes sense in certain other expressions like function calls, array literals, and object literals. Do we still regard `...` as an operator?

The term "operator" is not precisely defined in JavaScript, so MDN does not give a definitive answer. Our approach is to group all these constructs under "Operators" but avoid formally referring to them as operators. Many useful concepts about operators, such as precedence, still apply to them regardless of their exact nature.

## See also

- Operator precedence

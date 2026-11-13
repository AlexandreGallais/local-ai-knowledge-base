---
title: "Strict mode (part 3 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/strict_mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Strict mode (part 3 of 3)

## Transitioning to strict mode

Strict mode has been designed so that the transition to it can be made gradually. It is possible to change each file individually and even to transition code to strict mode down to the function granularity.

You can migrate a codebase to strict mode by first adding `"use strict"` to a piece of source code, and then fixing all execution errors, while watching out for semantic differences.

### Syntax errors

When adding `'use strict';`, the following cases will throw a `SyntaxError` before the script executes:

- Octal syntax `const n = 023;`
- `with` statement
- Using `delete` on a variable name `delete myVariable`;
- Using `eval` or `arguments` as variable or function argument name
- Using one of the newly reserved keywords (in anticipation of future language features): `implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, and `yield`
- Declaring two function parameters with the same name `function f(a, b, b) {}`
- Declaring the same property name twice in an object literal `{a: 1, b: 3, a: 7}`. This constraint was later removed (bug 1041128).

These errors are good, because they reveal plain errors or bad practices. They occur before the code is running, so they are easily discoverable as long as the code gets parsed by the runtime.

### New runtime errors

JavaScript used to silently fail in contexts where what was done should be an error. Strict mode throws in such cases. If your code base contains such cases, testing will be necessary to be sure nothing is broken. You can screen for such errors at the function granularity level.

- Assigning to an undeclared variable throws a `ReferenceError`. This used to set a property on the global object, which is rarely the expected effect. If you really want to set a value to the global object, explicitly assign it as a property on `globalThis`.
- Failing to assign to an object's property (e.g., it's read-only) throws a `TypeError`. In sloppy mode, this would silently fail.
- Deleting a non-deletable property throws a `TypeError`. In sloppy mode, this would silently fail.
- Accessing `arguments.callee`, `strictFunction.caller`, or `strictFunction.arguments` throws a `TypeError` if the function is in strict mode. If you are using `arguments.callee` to call the function recursively, you can use a named function expression instead.

### Semantic differences

These differences are very subtle differences. It's possible that a test suite doesn't catch this kind of subtle difference. Careful review of your code base will probably be necessary to be sure these differences don't affect the semantics of your code. Fortunately, this careful review can be done gradually down the function granularity.

- `this`
    In sloppy mode, function calls like `f()` would pass the global object as the `this` value. In strict mode, it is now `undefined`. When a function was called with `call` or `apply`, if the value was a primitive value, this one was boxed into an object (or the global object for `undefined` and `null`). In strict mode, the value is passed directly without conversion or replacement.
- `arguments`
    In sloppy mode, modifying a value in the `arguments` object modifies the corresponding named argument. This made optimizations complicated for JavaScript engines and made code harder to read/understand. In strict mode, the `arguments` object is created and initialized with the same values as the named arguments, but changes to either the `arguments` object or the named arguments aren't reflected in one another.
- `eval`
    In strict mode code, `eval` doesn't create a new variable in the scope from which it was called. Also, of course, in strict mode, the string is evaluated with strict mode rules. Thorough testing will need to be performed to make sure nothing breaks. Not using eval if you don't really need it may be another pragmatic solution.
- Block-scoped function declarations
    In sloppy mode, a function declaration inside a block may be visible outside the block and even callable. In strict mode, a function declaration inside a block is only visible inside the block.

## See also

- JavaScript modules guide
- Lexical grammar

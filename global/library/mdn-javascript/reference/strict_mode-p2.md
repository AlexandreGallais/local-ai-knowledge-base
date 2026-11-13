---
title: "Strict mode (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/strict_mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Strict mode (part 2 of 3)

## Changes in strict mode

Strict mode changes both syntax and runtime behavior. Changes generally fall into these categories:

- changes converting mistakes into errors (as syntax errors or at runtime)
- changes simplifying how variable references are resolved
- changes simplifying `eval` and `arguments`
- changes making it easier to write "secure" JavaScript
- changes anticipating future ECMAScript evolution.

### Converting mistakes into errors

Strict mode changes some previously-accepted mistakes into errors. JavaScript was designed to be easy for novice developers, and sometimes it gives operations which should be errors non-error semantics. Sometimes this fixes the immediate problem, but sometimes this creates worse problems in the future. Strict mode treats these mistakes as errors so that they're discovered and promptly fixed.

#### Assigning to undeclared variables

Strict mode makes it impossible to accidentally create global variables. In sloppy mode, mistyping a variable in an assignment creates a new property on the global object and continues to "work". Assignments which would accidentally create global variables throw an error in strict mode:

```js
"use strict";
let mistypeVariable;

// Assuming no global variable mistypeVarible exists
// this line throws a ReferenceError due to the
// misspelling of "mistypeVariable" (lack of an "a")
mistypeVarible = 17;
```

#### Failing to assign to object properties

In strict mode, certain assignments throw errors instead of failing silently. There are three ways to fail a property assignment:

- assignment to a non-writable data property
- assignment to a getter-only accessor property
- assignment to a new property on a non-extensible object

For example, `NaN` is a non-writable global variable. In sloppy mode, assigning to `NaN` does nothing; the developer receives no failure feedback. In strict mode, assigning to `NaN` throws an exception.

```js
"use strict";

// Assignment to a non-writable global
undefined = 5; // TypeError
Infinity = 5; // TypeError

// Assignment to a non-writable property
const obj1 = {};
Object.defineProperty(obj1, "x", { value: 42, writable: false });
obj1.x = 9; // TypeError

// Assignment to a getter-only property
const obj2 = {
  get x() {
    return 17;
  },
};
obj2.x = 5; // TypeError

// Assignment to a new property on a non-extensible object
const fixed = {};
Object.preventExtensions(fixed);
fixed.newProp = "ohai"; // TypeError
```

#### Failing to delete object properties

Attempts to delete a non-configurable or otherwise undeletable (e.g., it's intercepted by a proxy's `deleteProperty` handler which returns `false`) property throw in strict mode (where before the attempt would have no effect):

```js
"use strict";
delete Object.prototype; // TypeError
delete [].length; // TypeError
```

Strict mode also forbids deleting plain names. `delete name` in strict mode is a syntax error:

```js
"use strict";

var x;
delete x; // syntax error
```

If the name is a configurable global property, prefix it with `globalThis` to delete it.

```js
"use strict";

delete globalThis.x;
```

#### Duplicate parameter names

Strict mode requires that function parameter names be unique. In sloppy mode, the last duplicated argument hides previous identically-named arguments. Those previous arguments remain available through `arguments`, so they're not completely inaccessible. Still, this hiding makes little sense and is probably undesirable (it might hide a typo, for example), so in strict mode, duplicate argument names are a syntax error:

```js
function sum(a, a, c) {
  // syntax error
  "use strict";
  return a + a + c; // wrong if this code ran
}
```

It is also a syntax error in non-strict mode to have duplicate parameter names, if the function has a default parameter, rest parameter, or destructured parameter.

#### Legacy octal literals

Strict mode forbids a `0`-prefixed octal literal. In sloppy mode, a number beginning with a `0`, such as `0644`, is interpreted as an octal number (`0644 === 420`), if all digits are smaller than 8. Novice developers sometimes believe a leading-zero prefix has no semantic meaning, so they might use it as an alignment device — but this changes the number's meaning! A leading-zero syntax for the octal is rarely useful and can be mistakenly used, so strict mode makes it a syntax error:

```js
"use strict";
const sum =
  015 + // syntax error
  197 +
  142;
```

The standardized way to denote octal literals is via the `0o` prefix. For example:

```js
const sumWithOctal = 0o10 + 8;
console.log(sumWithOctal); // 16
```

Octal escape sequences, such as `"\45"`, which is equal to `"%"`, can be used to represent characters by extended-ASCII character code numbers in octal. In strict mode, this is a syntax error. More formally, it's disallowed to have `\` followed by any decimal digit other than `0`, or `\0` followed by a decimal digit; for example `\9` and `\07`.

#### Setting properties on primitive values

Strict mode forbids setting properties on primitive values. Accessing a property on a primitive implicitly creates a wrapper object that's unobservable, so in sloppy mode, setting properties is ignored (no-op). In strict mode, a `TypeError` is thrown.

```js
"use strict";

false.true = ""; // TypeError
(14).sailing = "home"; // TypeError
"with".you = "far away"; // TypeError
```

#### Duplicate property names

Duplicate property names used to be considered a `SyntaxError` in strict mode. With the introduction of computed property names, making duplication possible at runtime, this restriction was removed in ES2015.

```js
"use strict";
const o = { p: 1, p: 2 }; // syntax error prior to ECMAScript 2015
```

> **Note:**
> Making code that used to error become non-errors is always considered backwards-compatible. This is a good part of the language being strict about throwing errors: it leaves room for future semantic changes.

### Simplifying scope management

Strict mode simplifies how variable names map to particular variable definitions in the code. Many compiler optimizations rely on the ability to say that variable _X_ is stored in _that_ location: this is critical to fully optimizing JavaScript code. JavaScript sometimes makes this basic <example-value> of name to variable definition in the code impossible to perform until runtime. Strict mode removes most cases where this happens, so the compiler can better optimize strict mode code.

#### Removal of the with statement

Strict mode prohibits `with`. The problem with `with` is that any name inside the block might map either to a property of the object passed to it, or to a variable in surrounding (or even global) scope, at runtime; it's impossible to know which beforehand. Strict mode makes `with` a syntax error, so there's no chance for a name in a `with` to refer to an unknown location at runtime:

```js
"use strict";
const x = 17;
with (obj) {
  // Syntax error
  // If this weren't strict mode, would this be const x, or
  // would it instead be obj.x? It's impossible in general
  // to say without running the code, so the name can't be
  // optimized.
  x;
}
```

The alternative of assigning the object to a short name variable, then accessing the corresponding property on that variable, stands ready to replace `with`.

#### Non-leaking eval

In strict mode, `eval` does not introduce new variables into the surrounding scope. In sloppy mode, `eval("var x;")` introduces a variable `x` into the surrounding function or the global scope. This means that, in general, in a function containing a call to `eval`, every name not referring to an argument or local variable must be mapped to a particular definition at runtime (because that `eval` might have introduced a new variable that would hide the outer variable). In strict mode, `eval` creates variables only for the code being evaluated, so `eval` can't affect whether a name refers to an outer variable or some local variable:

```js
var x = 17;
var evalX = eval("'use strict'; var x = 42; x;");
console.assert(x === 17);
console.assert(evalX === 42);
```

Whether the string passed to `eval()` is evaluated in strict mode depends on how `eval()` is invoked (direct eval or indirect eval).

#### Block-scoped function declarations

The JavaScript language specification, since its start, had not allowed function declarations nested in block statements. However, it was so intuitive that most browsers implemented it as an extension grammar. Unfortunately, the implementations' semantics diverged, and it became impossible for the language specification to reconcile all implementations. Therefore, block-scoped function declarations are only explicitly specified in strict mode (whereas they were once disallowed in strict mode), while sloppy mode behavior remains divergent among browsers.

### Making eval and arguments simpler

Strict mode makes `arguments` and `eval` less bizarrely magical. Both involve a considerable amount of magical behavior in sloppy mode: `eval` to add or remove bindings and to change binding values, and `arguments` syncing named arguments with its indexed properties. Strict mode makes great strides toward treating `eval` and `arguments` as keywords.

#### Preventing binding or assigning eval and arguments

The names `eval` and `arguments` can't be bound or assigned in language syntax. All these attempts to do so are syntax errors:

```js
"use strict";
eval = 17;
arguments++;
++eval;
const obj = { set p(arguments) {} };
let eval;
try {
} catch (arguments) {}
function x(eval) {}
function arguments() {}
const y = function eval() {};
const f = new Function("arguments", "'use strict'; return 17;");
```

#### No syncing between parameters and arguments indices

Strict mode code doesn't sync indices of the `arguments` object with each parameter binding. In a sloppy mode function whose first argument is `arg`, setting `arg` also sets `arguments[0]`, and vice versa (unless no arguments were provided or `arguments[0]` is deleted). `arguments` objects for strict mode functions store the original arguments when the function was invoked. `arguments[i]` does not track the value of the corresponding named argument, nor does a named argument track the value in the corresponding `arguments[i]`.

```js
function f(a) {
  "use strict";
  a = 42;
  return [a, arguments[0]];
}
const pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17);
```

### "Securing" JavaScript

Strict mode makes it easier to write "secure" JavaScript. Some websites now provide ways for users to write JavaScript which will be run by the website _on behalf of other users_. JavaScript in browsers can access the user's private information, so such JavaScript must be partially transformed before it is run, to censor access to forbidden functionality. JavaScript's flexibility makes it effectively impossible to do this without many runtime checks. Certain language functions are so pervasive that performing runtime checks has a considerable performance cost. A few strict mode tweaks, plus requiring that user-submitted JavaScript be strict mode code and that it be invoked in a certain manner, substantially reduce the need for those runtime checks.

#### No this substitution

The value passed as `this` to a function in strict mode is not forced into being an object (a.k.a. "boxed"). For a sloppy mode function, `this` is always an object: either the provided object, if called with an object-valued `this`; or the boxed value of `this`, if called with a primitive as `this`; or the global object, if called with `undefined` or `null` as `this`. (Use `call`, `apply`, or `bind` to specify a particular `this`.) Not only is automatic boxing a performance cost, but exposing the global object in browsers is a security hazard because the global object provides access to functionality that "secure" JavaScript environments must restrict. Thus for a strict mode function, the specified `this` is not boxed into an object, and if unspecified, `this` is `undefined` instead of `globalThis`:

```js
"use strict";
function fun() {
  return this;
}
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);
```

#### Removal of stack-walking properties

In strict mode it's no longer possible to "walk" the JavaScript stack. Many implementations used to implement some extension features that make it possible to detect the upstream caller of a function. When a function `fun` is in the middle of being called, `fun.caller` is the function that most recently called `fun`, and `fun.arguments` is the `arguments` for that invocation of `fun`. Both extensions are problematic for "secure" JavaScript because they allow "secured" code to access "privileged" functions and their (potentially unsecured) arguments. If `fun` is in strict mode, both `fun.caller` and `fun.arguments` are properties which throw when set or retrieved:

```js
function restricted() {
  "use strict";
  restricted.caller; // throws a TypeError
  restricted.arguments; // throws a TypeError
}
function privilegedInvoker() {
  return restricted();
}
privilegedInvoker();
```

Similarly, `arguments.callee` is no longer supported. In sloppy mode, `arguments.callee` refers to the enclosing function. This use case is weak: name the enclosing function! Moreover, `arguments.callee` substantially hinders optimizations like inlining functions, because it must be made possible to provide a reference to the un-inlined function if `arguments.callee` is accessed. `arguments.callee` for strict mode functions is a non-deletable property which throws an error when set or retrieved:

```js
"use strict";
function f() {
  return arguments.callee;
}
f(); // throws a TypeError
```

### Future-proofing JavaScript

#### Extra reserved words

Reserved words are identifiers that can't be used as variable names. Strict mode reserves some more names than sloppy mode, some of which are already used in the language, and some of which are reserved for the future to make future syntax extensions easier to implement.

- `implements`
- `interface`
- `let`
- `package`
- `private`
- `protected`
- `public`
- `static`
- `yield`

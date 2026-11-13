---
title: "REPL (part 1 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/repl.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# REPL

> Stability: 2 - Stable

The `node:repl` module provides a Read-Eval-Print-Loop (REPL) implementation
that is available both as a standalone program or includible in other
applications. It can be accessed using:

```mjs
import repl from 'node:repl';
```

```cjs
const repl = require('node:repl');
```

## Design and features

The `node:repl` module exports the `repl.REPLServer` class. While running,
instances of `repl.REPLServer` will accept individual lines of user input,
evaluate those according to a user-defined evaluation function, then output the
result. Input and output may be from `stdin` and `stdout`, respectively, or may
be connected to any Node.js stream.

Instances of `repl.REPLServer` support automatic completion of inputs,
completion preview, simplistic Emacs-style line editing, multi-line inputs,
ZSH-like reverse-i-search, ZSH-like substring-based history search,
ANSI-styled output, saving and restoring current REPL session state, error
recovery, and customizable evaluation functions. Terminals that do not support
ANSI styles and Emacs-style line editing automatically fall back to a limited
feature set.

### Commands and special keys

The following special commands are supported by all REPL instances:

* `.break`: When in the process of inputting a multi-line expression, enter
  the `.break` command (or press `Ctrl`+`C`) to abort
  further input or processing of that expression.
* `.clear`: Resets the REPL `context` to an empty object and clears any
  multi-line expression being input.
* `.exit`: Close the I/O stream, causing the REPL to exit.
* `.help`: Show this list of special commands.
* `.save`: Save the current REPL session to a file:
  `> .save ./file/to/save.js`
* `.load`: Load a file into the current REPL session.
  `> .load ./file/to/load.js`
* `.editor`: Enter editor mode (`Ctrl`+`D` to
  finish, `Ctrl`+`C` to cancel).

```console
> .editor
// Entering editor mode (^D to finish, ^C to cancel)
function welcome(name) {
  return `Hello ${name}!`;
}

welcome('Node.js User');

// ^D
'Hello Node.js User!'
>
```

The following key combinations in the REPL have these special effects:

* `Ctrl`+`C`: When pressed once, has the same effect as the
  `.break` command.
  When pressed twice on a blank line, has the same effect as the `.exit`
  command.
* `Ctrl`+`D`: Has the same effect as the `.exit` command.
* `Tab`: When pressed on a blank line, displays global and local
  (scope) variables. When pressed while entering other input, displays relevant
  autocompletion options.

For key bindings related to the reverse-i-search, see `reverse-i-search`.
For all other key bindings, see TTY keybindings.

### Default evaluation

By default, all instances of `repl.REPLServer` use an evaluation function
that evaluates JavaScript expressions and provides access to Node.js built-in
modules. This default behavior can be overridden by passing in an alternative
evaluation function when the `repl.REPLServer` instance is created.

#### JavaScript expressions

The default evaluator supports direct evaluation of JavaScript expressions:

```console
> 1 + 1
2
> const m = 2
undefined
> m + 1
3
```

Unless otherwise scoped within blocks or functions, variables declared
either implicitly or using the `const`, `let`, or `var` keywords
are declared at the global scope.

#### Global and local scope

The default evaluator provides access to any variables that exist in the global
scope. It is possible to expose a variable to the REPL explicitly by assigning
it to the `context` object associated with each `REPLServer`:

```mjs
import repl from 'node:repl';
const msg = 'message';

repl.start('> ').context.m = msg;
```

```cjs
const repl = require('node:repl');
const msg = 'message';

repl.start('> ').context.m = msg;
```

Properties in the `context` object appear as local within the REPL:

```console
$ node repl_test.js
> m
'message'
```

Context properties are not read-only by default. To specify read-only globals,
context properties must be defined using `Object.defineProperty()`:

```mjs
import repl from 'node:repl';
const msg = 'message';

const r = repl.start('> ');
Object.defineProperty(r.context, 'm', {
  configurable: false,
  enumerable: true,
  value: msg,
});
```

```cjs
const repl = require('node:repl');
const msg = 'message';

const r = repl.start('> ');
Object.defineProperty(r.context, 'm', {
  configurable: false,
  enumerable: true,
  value: msg,
});
```

#### Accessing core Node.js modules

The default evaluator will automatically load Node.js core modules into the
REPL environment when used. For instance, unless otherwise declared as a
global or scoped variable, the input `fs` will be evaluated on-demand as
`global.fs = require('node:fs')`.

```console
> fs.createReadStream('./some/file');
```

#### Global uncaught exceptions

The REPL uses the `domain` module to catch all uncaught exceptions for that
REPL session.

This use of the `domain` module in the REPL has these side effects:

* Uncaught exceptions only emit the `'uncaughtException'` event in the
  standalone REPL. Adding a listener for this event in a REPL within
  another Node.js program results in `ERR_INVALID_REPL_INPUT`.

  ```js
  const r = repl.start();

  r.write('process.on("uncaughtException", () => console.log("Foobar"));\n');
  // Output stream includes:
  //   TypeError [ERR_INVALID_REPL_INPUT]: Listeners for `uncaughtException`
  //   cannot be used in the REPL

  r.close();
  ```

* Trying to use `process.setUncaughtExceptionCaptureCallback()` throws
  an `ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE` error.

#### Assignment of the `_` (underscore) variable

The default evaluator will, by default, assign the result of the most recently
evaluated expression to the special variable `_` (underscore).
Explicitly setting `_` to a value will disable this behavior.

```console
> [ 'a', 'b', 'c' ]
[ 'a', 'b', 'c' ]
> _.length
3
> _ += 1
Expression assignment to _ now disabled.
4
> 1 + 1
2
> _
4
```

Similarly, `_error` will refer to the last seen error, if there was any.
Explicitly setting `_error` to a value will disable this behavior.

```console
> throw new Error('foo');
Uncaught Error: foo
> _error.message
'foo'
```

#### `await` keyword

Support for the `await` keyword is enabled at the top level.

```console
> await Promise.resolve(123)
123
> await Promise.reject(new Error('REPL await'))
Uncaught Error: REPL await
    at REPL2:1:54
> const timeout = util.promisify(setTimeout);
undefined
> const old = Date.now(); await timeout(1000); console.log(Date.now() - old);
1002
undefined
```

One known limitation of using the `await` keyword in the REPL is that
it will invalidate the lexical scoping of the `const` keywords.

For example:

```console
> const m = await Promise.resolve(123)
undefined
> m
123
> m = await Promise.resolve(234)
234
// redeclaring the constant does error
> const m = await Promise.resolve(345)
Uncaught SyntaxError: Identifier 'm' has already been declared
```

`--no-experimental-repl-await` shall disable top-level await in REPL.

### Error handling

By default, uncaught exceptions in the REPL are printed to the output stream
(as with `Uncaught Error: REPL await` above). `uncaughtException` listeners
can be added freely in both standalone and nested REPLs. The `handleError`
option of `repl.start()` can customize this behavior, including
forwarding exceptions to `'uncaughtException'` by returning
`'unhandled'`.

### Reverse-i-search

The REPL supports bi-directional reverse-i-search similar to ZSH. It is
triggered with `Ctrl`+`R` to search backward
and `Ctrl`+`S` to search forwards.

Duplicated history entries will be skipped.

Entries are accepted as soon as any key is pressed that doesn't correspond
with the reverse search. Cancelling is possible by pressing `Esc`
or `Ctrl`+`C`.

Changing the direction immediately searches for the next entry in the expected
direction from the current position on.

### Custom evaluation functions

When a new `repl.REPLServer` is created, a custom evaluation function may be
provided. This can be used, for instance, to implement fully customized REPL
applications.

An evaluation function accepts the following four arguments:

* `code` {string} The code to be executed (e.g. `1 + 1`).
* `context` {Object} The context in which the code is executed. This can either be the JavaScript `global`
  context or a context specific to the REPL instance, depending on the `useGlobal` option.
* `replResourceName` {string} An identifier for the REPL resource associated with the current code
  evaluation. This can be useful for debugging purposes.
* `callback` {Function} A function to invoke once the code evaluation is complete. The callback takes two parameters:
  * An error object to provide if an error occurred during evaluation, or `null`/`undefined` if no error occurred.
  * The result of the code evaluation (this is not relevant if an error is provided).

The following illustrates an example of a REPL that squares a given number, an error is instead printed
if the provided input is not actually a number:

```mjs
import repl from 'node:repl';

function byThePowerOfTwo(number) {
  return number * number;
}

function myEval(code, context, replResourceName, callback) {
  if (isNaN(code)) {
    callback(new Error(`${code.trim()} is not a number`));
  } else {
    callback(null, byThePowerOfTwo(code));
  }
}

repl.start({ prompt: 'Enter a number: ', eval: myEval });
```

```cjs
const repl = require('node:repl');

function byThePowerOfTwo(number) {
  return number * number;
}

function myEval(code, context, replResourceName, callback) {
  if (isNaN(code)) {
    callback(new Error(`${code.trim()} is not a number`));
  } else {
    callback(null, byThePowerOfTwo(code));
  }
}

repl.start({ prompt: 'Enter a number: ', eval: myEval });
```

#### Recoverable errors

At the REPL prompt, pressing `Enter` sends the current line of input to
the `eval` function. In order to support multi-line input, the `eval` function
can return an instance of `repl.Recoverable` to the provided callback function:

```js
function myEval(cmd, context, filename, callback) {
  let result;
  try {
    result = vm.runInThisContext(cmd);
  } catch (e) {
    if (isRecoverableError(e)) {
      return callback(new repl.Recoverable(e));
    }
  }
  callback(null, result);
}

function isRecoverableError(error) {
  if (error.name === 'SyntaxError') {
    return /^(Unexpected end of input|Unexpected token)/.test(error.message);
  }
  return false;
}
```

### Customizing REPL output

By default, `repl.REPLServer` instances format output using the
`util.inspect()` method before writing the output to the provided `Writable`
stream (`process.stdout` by default). The `showProxy` inspection option is set
to true by default and the `colors` option is set to true depending on the
REPL's `useColors` option.

The `useColors` boolean option can be specified at construction to instruct the
default writer to use ANSI style codes to colorize the output from the
`util.inspect()` method.

If the REPL is run as standalone program, it is also possible to change the
REPL's inspection defaults from inside the REPL by using the
`inspect.replDefaults` property which mirrors the `defaultOptions` from
`util.inspect()`.

```console
> util.inspect.replDefaults.compact = false;
false
> [1]
[
  1
]
>
```

To fully customize the output of a `repl.REPLServer` instance pass in a new
function for the `writer` option on construction. The following example, for
instance, simply converts any input text to upper case:

```mjs
import repl from 'node:repl';

const r = repl.start({ prompt: '> ', eval: myEval, writer: myWriter });

function myEval(cmd, context, filename, callback) {
  callback(null, cmd);
}

function myWriter(output) {
  return output.toUpperCase();
}
```

```cjs
const repl = require('node:repl');

const r = repl.start({ prompt: '> ', eval: myEval, writer: myWriter });

function myEval(cmd, context, filename, callback) {
  callback(null, cmd);
}

function myWriter(output) {
  return output.toUpperCase();
}
```

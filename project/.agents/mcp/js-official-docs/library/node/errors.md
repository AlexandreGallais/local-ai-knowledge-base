---
title: "Errors (part 1 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/errors.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Errors

Applications running in Node.js will generally experience the following
categories of errors:

* Standard JavaScript errors such as {EvalError}, {SyntaxError}, {RangeError},
  {ReferenceError}, {TypeError}, and {URIError}.
* Standard `DOMException`s.
* System errors triggered by underlying operating system constraints such
  as attempting to open a file that does not exist or attempting to send data
  over a closed socket.
* `AssertionError`s are a special class of error that can be triggered when
  Node.js detects an exceptional logic violation that should never occur. These
  are raised typically by the `node:assert` module.
* User-specified errors triggered by application code.

All JavaScript and system errors raised by Node.js inherit from, or are
instances of, the standard JavaScript {Error} class and are guaranteed
to provide _at least_ the properties available on that class.

The `error.message` property of errors raised by Node.js may be changed in
any versions. Use `error.code` to identify an error instead. For a
`DOMException`, use `domException.name` to identify its type.

## Error propagation and interception

Node.js supports several mechanisms for propagating and handling errors that
occur while an application is running. How these errors are reported and
handled depends entirely on the type of `Error` and the style of the API that is
called.

All JavaScript errors are handled as exceptions that _immediately_ generate
and throw an error using the standard JavaScript `throw` mechanism. These
are handled using the `try…catch` construct provided by the
JavaScript language.

```js
// Throws with a ReferenceError because z is not defined.
try {
  const m = 1;
  const n = m + z;
} catch (err) {
  // Handle the error here.
}
```

Any use of the JavaScript `throw` mechanism will raise an exception that
_must_ be handled or the Node.js process will exit immediately.

With few exceptions, _Synchronous_ APIs (any blocking method that does not
return a {Promise} nor accept a `callback` function, such as
`fs.readFileSync`), will use `throw` to report errors.

Errors that occur within _Asynchronous APIs_ may be reported in multiple ways:

* Some asynchronous methods returns a {Promise}, you should always take into
  account that it might be rejected. See `--unhandled-rejections` flag for
  how the process will react to an unhandled promise rejection.

  ```js
  const fs = require('node:fs/promises');

  (async () => {
    let data;
    try {
      data = await fs.readFile('a file that does not exist');
    } catch (err) {
      console.error('There was an error reading the file!', err);
      return;
    }
    // Otherwise handle the data
  })();
  ```

* Most asynchronous methods that accept a `callback` function will accept an
  `Error` object passed as the first argument to that function. If that first
  argument is not `null` and is an instance of `Error`, then an error occurred
  that should be handled.

  ```js
  const fs = require('node:fs');
  fs.readFile('a file that does not exist', (err, data) => {
    if (err) {
      console.error('There was an error reading the file!', err);
      return;
    }
    // Otherwise handle the data
  });
  ```

* When an asynchronous method is called on an object that is an
  `EventEmitter`, errors can be routed to that object's `'error'` event.

  ```js
  const net = require('node:net');
  const connection = net.connect('localhost');

  // Adding an 'error' event handler to a stream:
  connection.on('error', (err) => {
    // If the connection is reset by the server, or if it can't
    // connect at all, or on any sort of error encountered by
    // the connection, the error will be sent here.
    console.error(err);
  });

  connection.pipe(process.stdout);
  ```

* A handful of typically asynchronous methods in the Node.js API may still
  use the `throw` mechanism to raise exceptions that must be handled using
  `try…catch`. There is no comprehensive list of such methods; please
  refer to the documentation of each method to determine the appropriate
  error handling mechanism required.

The use of the `'error'` event mechanism is most common for stream-based
and event emitter-based APIs, which themselves represent a series of
asynchronous operations over time (as opposed to a single operation that may
pass or fail).

For _all_ `EventEmitter` objects, if an `'error'` event handler is not
provided, the error will be thrown, causing the Node.js process to report an
uncaught exception and crash unless either: a handler has been registered for
the `'uncaughtException'` event, or the deprecated `node:domain`
module is used.

```js
const EventEmitter = require('node:events');
const ee = new EventEmitter();

setImmediate(() => {
  // This will crash the process because no 'error' event
  // handler has been added.
  ee.emit('error', new Error('This will crash'));
});
```

Errors generated in this way _cannot_ be intercepted using `try…catch` as
they are thrown _after_ the calling code has already exited.

Developers must refer to the documentation for each method to determine
exactly how errors raised by those methods are propagated.

## Class: `Error`

A generic JavaScript {Error} object that does not denote any specific
circumstance of why the error occurred. `Error` objects capture a "stack trace"
detailing the point in the code at which the `Error` was instantiated, and may
provide a text description of the error.

All errors generated by Node.js, including all system and JavaScript errors,
will either be instances of, or inherit from, the `Error` class.

### `new Error(message[, options])`

* `message` {string}
* `options` {Object}
  * `cause` {any} The error that caused the newly created error.

Creates a new `Error` object and sets the `error.message` property to the
provided text message. If an object is passed as `message`, the text message
is generated by calling `String(message)`. If the `cause` option is provided,
it is assigned to the `error.cause` property. The `error.stack` property will
represent the point in the code at which `new Error()` was called. Stack traces
are dependent on V8's stack trace API. Stack traces extend only to either
(a) the beginning of _synchronous code execution_, or (b) the number of frames
given by the property `Error.stackTraceLimit`, whichever is smaller.

### `Error.captureStackTrace(targetObject[, constructorOpt])`

* `targetObject` {Object}
* `constructorOpt` {Function}

Creates a `.stack` property on `targetObject`, which when accessed returns
a string representing the location in the code at which
`Error.captureStackTrace()` was called.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

The first line of the trace will be prefixed with
`${myObject.name}: ${myObject.message}`.

The optional `constructorOpt` argument accepts a function. If given, all frames
above `constructorOpt`, including `constructorOpt`, will be omitted from the
generated stack trace.

The `constructorOpt` argument is useful for hiding implementation
details of error generation from the user. For instance:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

### `Error.stackTraceLimit`

* Type: {number}

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

### `error.cause`

* Type: {any}

If present, the `error.cause` property is the underlying cause of the `Error`.
It is used when catching an error and throwing a new one with a different
message or code in order to still have access to the original error.

The `error.cause` property is typically set by calling
`new Error(message, { cause })`. It is not set by the constructor if the
`cause` option is not provided.

This property allows errors to be chained. When serializing `Error` objects,
`util.inspect()` recursively serializes `error.cause` if it is set.

```js
const cause = new Error('The remote HTTP server responded with a 500 status');
const symptom = new Error('The message failed to send', { cause });

console.log(symptom);
// Prints:
//   Error: The message failed to send
//       at REPL2:1:17
//       at Script.runInThisContext (node:vm:130:12)
//       ... 7 lines matching cause stack trace ...
//       at [_line] [as _line] (node:internal/readline/interface:886:18) {
//     [cause]: Error: The remote HTTP server responded with a 500 status
//         at REPL1:1:15
//         at Script.runInThisContext (node:vm:130:12)
//         at REPLServer.defaultEval (node:repl:574:29)
//         at bound (node:domain:426:15)
//         at REPLServer.runBound [as eval] (node:domain:437:12)
//         at REPLServer.onLine (node:repl:902:10)
//         at REPLServer.emit (node:events:549:35)
//         at REPLServer.emit (node:domain:482:12)
//         at [_onLine] [as _onLine] (node:internal/readline/interface:425:12)
//         at [_line] [as _line] (node:internal/readline/interface:886:18)
```

### `error.code`

* Type: {string}

The `error.code` property is a string label that identifies the kind of error.
`error.code` is the most stable way to identify an error. It will only change
between major versions of Node.js. In contrast, `error.message` strings may
change between any versions of Node.js. See Node.js error codes for details
about specific codes.

### `error.message`

* Type: {string}

The `error.message` property is the string description of the error as set by
calling `new Error(message)`. The `message` passed to the constructor will also
appear in the first line of the stack trace of the `Error`, however changing
this property after the `Error` object is created _may not_ change the first
line of the stack trace (for example, when `error.stack` is read before this
property is changed).

```js
const err = new Error('The message');
console.error(err.message);
// Prints: The message
```

### `error.stack`

* Type: {string}

The `error.stack` property is a string describing the point in the code at which
the `Error` was instantiated.

```console
Error: Things keep happening!
   at /home/gbusey/file.js:525:2
   at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21)
   at Actor.<anonymous> (/home/gbusey/actors.js:400:8)
   at increaseSynergy (/home/gbusey/actors.js:701:6)
```

The first line is formatted as `<error class name>: <error message>`, and
is followed by a series of stack frames (each line beginning with "at ").
Each frame describes a call site within the code that lead to the error being
generated. V8 attempts to display a name for each function (by variable name,
function name, or object method name), but occasionally it will not be able to
find a suitable name. If V8 cannot determine a name for the function, only
location information will be displayed for that frame. Otherwise, the
determined function name will be displayed with location information appended
in parentheses.

Frames are only generated for JavaScript functions. If, for example, execution
synchronously passes through a C++ addon function called `cheetahify` which
itself calls a JavaScript function, the frame representing the `cheetahify` call
will not be present in the stack traces:

```js
const cheetahify = require('./native-binding.node');

function makeFaster() {
  // `cheetahify()` *synchronously* calls speedy.
  cheetahify(function speedy() {
    throw new Error('oh no!');
  });
}

makeFaster();
// will throw:
//   /home/gbusey/file.js:6
//       throw new Error('oh no!');
//           ^
//   Error: oh no!
//       at speedy (/home/gbusey/file.js:6:11)
//       at makeFaster (/home/gbusey/file.js:5:3)
//       at Object.<anonymous> (/home/gbusey/file.js:10:1)
//       at Module._compile (module.js:456:26)
//       at Object.Module._extensions..js (module.js:474:10)
//       at Module.load (module.js:356:32)
//       at Function.Module._load (module.js:312:12)
//       at Function.Module.runMain (module.js:497:10)
//       at startup (node.js:119:16)
//       at node.js:906:3
```

The location information will be one of:

* `native`, if the frame represents a call internal to V8 (as in `[].forEach`).
* `plain-filename.js:line:column`, if the frame represents a call internal
  to Node.js.
* `/absolute/path/to/file.js:line:column`, if the frame represents a call in
  a user program (using CommonJS module system), or its dependencies.
* `<transport-protocol>:///url/to/module/file.mjs:line:column`, if the frame
  represents a call in a user program (using ES module system), or
  its dependencies.

The number of frames captured by the stack trace is bounded by the smaller of
`Error.stackTraceLimit` or the number of available frames on the current event
loop tick.

`error.stack` is a getter/setter for a hidden internal property which is only
present on builtin `Error` objects (those for which `Error.isError` returns
true). If `error` is not a builtin error object, then the `error.stack` getter
will always return `undefined`, and the setter will do nothing. This can occur
if the accessor is manually invoked with a `this` value that is not a builtin
error object, such as a {Proxy}.

## Class: `AssertionError`

* Extends: {errors.Error}

Indicates the failure of an assertion. For details, see
`Class: assert.AssertionError`.

## Class: `DOMException`

* Extends: {errors.Error}

The Web IDL {DOMException} class. These errors are thrown by web-platform APIs
in Node.js such as `fetch()`, {AbortController}, {AbortSignal}, and Web
Streams. For details, see also `Class: DOMException` on the Globals page.

The `domException.name` property identifies the type of the exception (for
example, `'AbortError'`). Unlike most errors in Node.js, the
`domException.code` property is a number that corresponds to a
legacy error code name (for example, `20` for
`ABORT_ERR`).

Node.js-specific APIs that support {AbortSignal} (such as
`events.once()`) throw a Node.js `AbortError` (a native {errors.Error} with
`name` of `'AbortError'` and `code` of `'ABORT_ERR'`) rather than a
{DOMException}. To identify abort errors in either case, checking
`err?.name === 'AbortError'` is sufficient.

See also `ABORT_ERR`.

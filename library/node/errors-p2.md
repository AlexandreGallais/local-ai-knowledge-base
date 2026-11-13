---
title: "Errors (part 2 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/errors.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Errors (part 2 of 7)

## Class: `RangeError`

* Extends: {errors.Error}

Indicates that a provided argument was not within the set or range of
acceptable values for a function; whether that is a numeric range, or
outside the set of options for a given function parameter.

```js
require('node:net').connect(-1);
// Throws "RangeError: "port" option should be >= 0 and < 65536: -1"
```

Node.js will generate and throw `RangeError` instances _immediately_ as a form
of argument validation.

## Class: `ReferenceError`

* Extends: {errors.Error}

Indicates that an attempt is being made to access a variable that is not
defined. Such errors commonly indicate typos in code, or an otherwise broken
program.

While client code may generate and propagate these errors, in practice, only V8
will do so.

```js
doesNotExist;
// Throws ReferenceError, doesNotExist is not a variable in this program.
```

Unless an application is dynamically generating and running code,
`ReferenceError` instances indicate a bug in the code or its dependencies.

## Class: `SyntaxError`

* Extends: {errors.Error}

Indicates that a program is not valid JavaScript. These errors may only be
generated and propagated as a result of code evaluation. Code evaluation may
happen as a result of `eval`, `Function`, `require`, or vm. These errors
are almost always indicative of a broken program.

```js
try {
  require('node:vm').runInThisContext('binary ! isNotOk');
} catch (err) {
  // 'err' will be a SyntaxError.
}
```

`SyntaxError` instances are unrecoverable in the context that created them –
they may only be caught by other contexts.

## Class: `SystemError`

* Extends: {errors.Error}

Node.js generates system errors when exceptions occur within its runtime
environment. These usually occur when an application violates an operating
system constraint. For example, a system error will occur if an application
attempts to read a file that does not exist.

* `address` {string} If present, the address to which a network connection
  failed
* `code` {string} The string error code
* `dest` {string} If present, the file path destination when reporting a file
  system error
* `errno` {number} The system-provided error number
* `info` {Object} If present, extra details about the error condition
* `message` {string} A system-provided human-readable description of the error
* `path` {string} If present, the file path when reporting a file system error
* `port` {number} If present, the network connection port that is not available
* `syscall` {string} The name of the system call that triggered the error

### `error.address`

* Type: {string}

If present, `error.address` is a string describing the address to which a
network connection failed.

### `error.code`

* Type: {string}

The `error.code` property is a string representing the error code.

### `error.dest`

* Type: {string}

If present, `error.dest` is the file path destination when reporting a file
system error.

### `error.errno`

* Type: {number}

The `error.errno` property is a negative number which corresponds
to the error code defined in `libuv Error handling`.

On Windows the error number provided by the system will be normalized by libuv.

To get the string representation of the error code, use
`util.getSystemErrorName(error.errno)`.

### `error.info`

* Type: {Object}

If present, `error.info` is an object with details about the error condition.

### `error.message`

* Type: {string}

`error.message` is a system-provided human-readable description of the error.

### `error.path`

* Type: {string}

If present, `error.path` is a string containing a relevant invalid pathname.

### `error.port`

* Type: {number}

If present, `error.port` is the network connection port that is not available.

### `error.syscall`

* Type: {string}

The `error.syscall` property is a string describing the syscall that failed.

### Common system errors

This is a list of system errors commonly-encountered when writing a Node.js
program. For a comprehensive list, see the `errno`(3) man page.

* `EACCES` (Permission denied): An attempt was made to access a file in a way
  forbidden by its file access permissions.

* `EADDRINUSE` (Address already in use): An attempt to bind a server
  (`net`, `http`, or `https`) to a local address failed due to
  another server on the local system already occupying that address.

* `ECONNREFUSED` (Connection refused): No connection could be made because the
  target machine actively refused it. This usually results from trying to
  connect to a service that is inactive on the foreign host.

* `ECONNRESET` (Connection reset by peer): A connection was forcibly closed by
  a peer. This normally results from a loss of the connection on the remote
  socket due to a timeout or reboot. Commonly encountered via the `http`
  and `net` modules.

* `EEXIST` (File exists): An existing file was the target of an operation that
  required that the target not exist.

* `EISDIR` (Is a directory): An operation expected a file, but the given
  pathname was a directory.

* `EMFILE` (Too many open files in system): Maximum number of
  file descriptors allowable on the system has been reached, and
  requests for another descriptor cannot be fulfilled until at least one
  has been closed. This is encountered when opening many files at once in
  parallel, especially on systems (in particular, macOS) where there is a low
  file descriptor limit for processes. To remedy a low limit, run
  `ulimit -n 2048` in the same shell that will run the Node.js process.

* `ENOENT` (No such file or directory): Commonly raised by `fs` operations
  to indicate that a component of the specified pathname does not exist. No
  entity (file or directory) could be found by the given path.

* `ENOTDIR` (Not a directory): A component of the given pathname existed, but
  was not a directory as expected. Commonly raised by `fs.readdir`.

* `ENOTEMPTY` (Directory not empty): A directory with entries was the target
  of an operation that requires an empty directory, usually `fs.unlink`.

* `ENOTFOUND` (DNS lookup failed): Indicates a DNS failure of either
  `EAI_NODATA` or `EAI_NONAME`. This is not a standard POSIX error.

* `EPERM` (Operation not permitted): An attempt was made to perform an
  operation that requires elevated privileges.

* `EPIPE` (Broken pipe): A write on a pipe, socket, or FIFO for which there is
  no process to read the data. Commonly encountered at the `net` and
  `http` layers, indicative that the remote side of the stream being
  written to has been closed.

* `ETIMEDOUT` (Operation timed out): A connect or send request failed because
  the connected party did not properly respond after a period of time. Usually
  encountered by `http` or `net`. Often a sign that a `socket.end()`
  was not properly called.

## Class: `TypeError`

* Extends {errors.Error}

Indicates that a provided argument is not an allowable type. For example,
passing a function to a parameter which expects a string would be a `TypeError`.

```js
require('node:url').parse(() => { });
// Throws TypeError, since it expected a string.
```

Node.js will generate and throw `TypeError` instances _immediately_ as a form
of argument validation.

## Exceptions vs. errors

A JavaScript exception is a value that is thrown as a result of an invalid
operation or as the target of a `throw` statement. While it is not required
that these values are instances of `Error` or classes which inherit from
`Error`, all exceptions thrown by Node.js or the JavaScript runtime _will_ be
instances of `Error`.

Some exceptions are _unrecoverable_ at the JavaScript layer. Such exceptions
will _always_ cause the Node.js process to crash. Examples include `assert()`
checks or `abort()` calls in the C++ layer.

## OpenSSL errors

Errors originating in `crypto` or `tls` are of class `Error`, and in addition to
the standard `.code` and `.message` properties, may have some additional
OpenSSL-specific properties.

### `error.opensslErrorStack`

An array of errors that can give context to where in the OpenSSL library an
error originates from.

### `error.function`

The OpenSSL function the error originates in.

### `error.library`

The OpenSSL library the error originates in.

### `error.reason`

A human-readable string describing the reason for the error.

---
title: "Util (part 3 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/util.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Util (part 3 of 10)

## `util.getSystemErrorMessage(err)`

* `err` {number}
* Returns: {string}

Returns the string message for a numeric error code that comes from a Node.js
API.
The mapping between error codes and string messages is platform-dependent.

```js
fs.access('file/that/does/not/exist', (err) => {
  const message = util.getSystemErrorMessage(err.errno);
  console.error(message);  // No such file or directory
});
```

## `util.setTraceSigInt(enable)`

* `enable` {boolean}

Enable or disable printing a stack trace on `SIGINT`. The API is only available on the main thread.

## `util.inherits(constructor, superConstructor)`

> Stability: 3 - Legacy: Use ES2015 class syntax and `extends` keyword instead.

* `constructor` {Function}
* `superConstructor` {Function}

Usage of `util.inherits()` is discouraged. Please use the ES6 `class` and
`extends` keywords to get language level inheritance support. Also note
that the two styles are semantically incompatible.

Inherit the prototype methods from one constructor into another. The
prototype of `constructor` will be set to a new object created from
`superConstructor`.

This mainly adds some input validation on top of
`Object.setPrototypeOf(constructor.prototype, superConstructor.prototype)`.
As an additional convenience, `superConstructor` will be accessible
through the `constructor.super_` property.

```js
const util = require('node:util');
const EventEmitter = require('node:events');

function MyStream() {
  EventEmitter.call(this);
}

util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
  this.emit('data', data);
};

const stream = new MyStream();

console.log(stream instanceof EventEmitter); // true
console.log(MyStream.super_ === EventEmitter); // true

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`);
});
stream.write('It works!'); // Received data: "It works!"
```

ES6 example using `class` and `extends`:

```mjs
import EventEmitter from 'node:events';

class MyStream extends EventEmitter {
  write(data) {
    this.emit('data', data);
  }
}

const stream = new MyStream();

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`);
});
stream.write('With ES6');
```

```cjs
const EventEmitter = require('node:events');

class MyStream extends EventEmitter {
  write(data) {
    this.emit('data', data);
  }
}

const stream = new MyStream();

stream.on('data', (data) => {
  console.log(`Received data: "${data}"`);
});
stream.write('With ES6');
```

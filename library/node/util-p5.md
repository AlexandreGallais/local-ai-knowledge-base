---
title: "Util (part 5 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/util.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Util (part 5 of 10)

### Custom inspection functions on objects

Objects may also define their own
`util.inspect.custom` function,
which `util.inspect()` will invoke and use the result of when inspecting
the object.

```mjs
import { inspect } from 'node:util';

class Box {
  constructor(value) {
    this.value = value;
  }

  [inspect.custom](depth, options, inspect) {
    if (depth < 0) {
      return options.stylize('[Box]', 'special');
    }

    const newOptions = Object.assign({}, options, {
      depth: options.depth === null ? null : options.depth - 1,
    });

    // Five space padding because that's the size of "Box< ".
    const padding = ' '.repeat(5);
    const inner = inspect(this.value, newOptions)
                  .replace(/\n/g, `\n${padding}`);
    return `${options.stylize('Box', 'special')}< ${inner} >`;
  }
}

const box = new Box(true);

console.log(inspect(box));
// "Box< true >"
```

```cjs
const { inspect } = require('node:util');

class Box {
  constructor(value) {
    this.value = value;
  }

  [inspect.custom](depth, options, inspect) {
    if (depth < 0) {
      return options.stylize('[Box]', 'special');
    }

    const newOptions = Object.assign({}, options, {
      depth: options.depth === null ? null : options.depth - 1,
    });

    // Five space padding because that's the size of "Box< ".
    const padding = ' '.repeat(5);
    const inner = inspect(this.value, newOptions)
                  .replace(/\n/g, `\n${padding}`);
    return `${options.stylize('Box', 'special')}< ${inner} >`;
  }
}

const box = new Box(true);

console.log(inspect(box));
// "Box< true >"
```

Custom `util.inspect.custom` functions typically return
a string but may return a value of any type that will be formatted accordingly
by `util.inspect()`.

```mjs
import { inspect } from 'node:util';

const obj = { foo: 'this will not show up in the inspect() output' };
obj[inspect.custom] = (depth) => {
  return { bar: 'baz' };
};

console.log(inspect(obj));
// "{ bar: 'baz' }"
```

```cjs
const { inspect } = require('node:util');

const obj = { foo: 'this will not show up in the inspect() output' };
obj[inspect.custom] = (depth) => {
  return { bar: 'baz' };
};

console.log(inspect(obj));
// "{ bar: 'baz' }"
```

### `util.inspect.custom`

* Type: {symbol} that can be used to declare custom inspect functions.

In addition to being accessible through `util.inspect.custom`, this
symbol is registered globally and can be
accessed in any environment as `Symbol.for('nodejs.util.inspect.custom')`.

Using this allows code to be written in a portable fashion, so that the custom
inspect function is used in a Node.js environment and ignored in the browser.
The `util.inspect()` function itself is passed as third argument to the custom
inspect function to allow further portability.

```js
const customInspectSymbol = Symbol.for('nodejs.util.inspect.custom');

class Password {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return 'xxxxxxxx';
  }

  [customInspectSymbol](depth, inspectOptions, inspect) {
    return `Password <${this.toString()}>`;
  }
}

const password = new Password('r0sebud');
console.log(password);
// Prints Password <xxxxxxxx>
```

See Custom inspection functions on Objects for more details.

### `util.inspect.defaultOptions`

The `defaultOptions` value allows customization of the default options used by
`util.inspect`. This is useful for functions like `console.log` or
`util.format` which implicitly call into `util.inspect`. It shall be set to an
object containing one or more valid `util.inspect()` options. Setting
option properties directly is also supported.

```mjs
import { inspect } from 'node:util';
const arr = Array(156).fill(0);

console.log(arr); // Logs the truncated array
inspect.defaultOptions.maxArrayLength = null;
console.log(arr); // logs the full array
```

```cjs
const { inspect } = require('node:util');
const arr = Array(156).fill(0);

console.log(arr); // Logs the truncated array
inspect.defaultOptions.maxArrayLength = null;
console.log(arr); // logs the full array
```

## `util.isDeepStrictEqual(val1, val2[, options])`

* `val1` {any}
* `val2` {any}
* `skipPrototype` {boolean} If `true`, prototype and constructor
  comparison is skipped during deep strict equality check. **Default:** `false`.
* Returns: {boolean}

Returns `true` if there is deep strict equality between `val1` and `val2`.
Otherwise, returns `false`.

By default, deep strict equality includes comparison of object prototypes and
constructors. When `skipPrototype` is `true`, objects with
different prototypes or constructors can still be considered equal if their
enumerable properties are deeply strictly equal.

```js
const util = require('node:util');

class Foo {
  constructor(a) {
    this.a = a;
  }
}

class Bar {
  constructor(a) {
    this.a = a;
  }
}

const foo = new Foo(1);
const bar = new Bar(1);

// Different constructors, same properties
console.log(util.isDeepStrictEqual(foo, bar));
// false

console.log(util.isDeepStrictEqual(foo, bar, true));
// true
```

See `assert.deepStrictEqual()` for more information about deep strict
equality.

## `util.isPartialDeepStrictEqual(val1, val2)`

* `val1` {any}
* `val2` {any}
* Returns: {boolean}

Returns `true` if there is partial deep strict equality between `val1` and
`val2`. Otherwise, returns `false`.

"Partial" equality means that only properties that exist on `val2` are going
to be compared.

See `assert.partialDeepStrictEqual()` for more information about partial
deep strict equality.

## `util.markPromiseAsHandled(promise)`

* `promise` {Promise} The promise to mark as handled

Marks a promise as handled so that unhandled rejections are ignored and are not
reported to the `'unhandledrejection'` event.

## Class: `util.MIMEType`

An implementation of the MIMEType class.

In accordance with browser conventions, all properties of `MIMEType` objects
are implemented as getters and setters on the class prototype, rather than as
data properties on the object itself.

A MIME string is a structured string containing multiple meaningful
components. When parsed, a `MIMEType` object is returned containing
properties for each of these components.

### `new MIMEType(input)`

* `input` {string} The input MIME to parse

Creates a new `MIMEType` object by parsing the `input`.

```mjs
import { MIMEType } from 'node:util';

const myMIME = new MIMEType('text/plain');
```

```cjs
const { MIMEType } = require('node:util');

const myMIME = new MIMEType('text/plain');
```

A `TypeError` will be thrown if the `input` is not a valid MIME. Note
that an effort will be made to coerce the given values into strings. For
instance:

```mjs
import { MIMEType } from 'node:util';
const myMIME = new MIMEType({ toString: () => 'text/plain' });
console.log(String(myMIME));
// Prints: text/plain
```

```cjs
const { MIMEType } = require('node:util');
const myMIME = new MIMEType({ toString: () => 'text/plain' });
console.log(String(myMIME));
// Prints: text/plain
```

### `mime.type`

* Type: {string}

Gets and sets the type portion of the MIME.

```mjs
import { MIMEType } from 'node:util';

const myMIME = new MIMEType('text/javascript');
console.log(myMIME.type);
// Prints: text
myMIME.type = 'application';
console.log(myMIME.type);
// Prints: application
console.log(String(myMIME));
// Prints: application/javascript
```

```cjs
const { MIMEType } = require('node:util');

const myMIME = new MIMEType('text/javascript');
console.log(myMIME.type);
// Prints: text
myMIME.type = 'application';
console.log(myMIME.type);
// Prints: application
console.log(String(myMIME));
// Prints: application/javascript
```

### `mime.subtype`

* Type: {string}

Gets and sets the subtype portion of the MIME.

```mjs
import { MIMEType } from 'node:util';

const myMIME = new MIMEType('text/ecmascript');
console.log(myMIME.subtype);
// Prints: ecmascript
myMIME.subtype = 'javascript';
console.log(myMIME.subtype);
// Prints: javascript
console.log(String(myMIME));
// Prints: text/javascript
```

```cjs
const { MIMEType } = require('node:util');

const myMIME = new MIMEType('text/ecmascript');
console.log(myMIME.subtype);
// Prints: ecmascript
myMIME.subtype = 'javascript';
console.log(myMIME.subtype);
// Prints: javascript
console.log(String(myMIME));
// Prints: text/javascript
```

### `mime.essence`

* Type: {string}

Gets the essence of the MIME. This property is read only.
Use `mime.type` or `mime.subtype` to alter the MIME.

```mjs
import { MIMEType } from 'node:util';

const myMIME = new MIMEType('text/javascript;key=value');
console.log(myMIME.essence);
// Prints: text/javascript
myMIME.type = 'application';
console.log(myMIME.essence);
// Prints: application/javascript
console.log(String(myMIME));
// Prints: application/javascript;key=value
```

```cjs
const { MIMEType } = require('node:util');

const myMIME = new MIMEType('text/javascript;key=value');
console.log(myMIME.essence);
// Prints: text/javascript
myMIME.type = 'application';
console.log(myMIME.essence);
// Prints: application/javascript
console.log(String(myMIME));
// Prints: application/javascript;key=value
```

### `mime.params`

* Type: {MIMEParams}

Gets the `MIMEParams` object representing the
parameters of the MIME. This property is read-only. See
`MIMEParams` documentation for details.

### `mime.toString()`

* Returns: {string}

The `toString()` method on the `MIMEType` object returns the serialized MIME.

Because of the need for standard compliance, this method does not allow users
to customize the serialization process of the MIME.

### `mime.toJSON()`

* Returns: {string}

Alias for `mime.toString()`.

This method is automatically called when an `MIMEType` object is serialized
with `JSON.stringify()`.

```mjs
import { MIMEType } from 'node:util';

const myMIMES = [
  new MIMEType('image/png'),
  new MIMEType('image/gif'),
];
console.log(JSON.stringify(myMIMES));
// Prints: ["image/png", "image/gif"]
```

```cjs
const { MIMEType } = require('node:util');

const myMIMES = [
  new MIMEType('image/png'),
  new MIMEType('image/gif'),
];
console.log(JSON.stringify(myMIMES));
// Prints: ["image/png", "image/gif"]
```

### `MIMEType.parse(string)`

* `string` {string} The input MIME to parse
* Returns: {MIMEType|null}

Attempts to parse the given `string` as a MIMEType. If the string cannot be
parsed, `null` is returned.

## Class: `util.MIMEParams`

The `MIMEParams` API provides read and write access to the parameters of a
`MIMEType`.

### `new MIMEParams()`

Creates a new `MIMEParams` object by with empty parameters

```mjs
import { MIMEParams } from 'node:util';

const myParams = new MIMEParams();
```

```cjs
const { MIMEParams } = require('node:util');

const myParams = new MIMEParams();
```

### `mimeParams.delete(name)`

* `name` {string}

Remove all name-value pairs whose name is `name`.

### `mimeParams.entries()`

* Returns: {Iterator}

Returns an iterator over each of the name-value pairs in the parameters.
Each item of the iterator is a JavaScript `Array`. The first item of the array
is the `name`, the second item of the array is the `value`.

### `mimeParams.get(name)`

* `name` {string}
* Returns: {string | null} A string or `null` if there is no name-value pair
  with the given `name`.

Returns the value of the first name-value pair whose name is `name`. If there
are no such pairs, `null` is returned.

### `mimeParams.has(name)`

* `name` {string}
* Returns: {boolean}

Returns `true` if there is at least one name-value pair whose name is `name`.

### `mimeParams.keys()`

* Returns: {Iterator}

Returns an iterator over the names of each name-value pair.

```mjs
import { MIMEType } from 'node:util';

const { params } = new MIMEType('text/plain;foo=0;bar=1');
for (const name of params.keys()) {
  console.log(name);
}
// Prints:
//   foo
//   bar
```

```cjs
const { MIMEType } = require('node:util');

const { params } = new MIMEType('text/plain;foo=0;bar=1');
for (const name of params.keys()) {
  console.log(name);
}
// Prints:
//   foo
//   bar
```

### `mimeParams.set(name, value)`

* `name` {string}
* `value` {string}

Sets the value in the `MIMEParams` object associated with `name` to
`value`. If there are any pre-existing name-value pairs whose names are `name`,
set the first such pair's value to `value`.

```mjs
import { MIMEType } from 'node:util';

const { params } = new MIMEType('text/plain;foo=0;bar=1');
params.set('foo', 'def');
params.set('baz', 'xyz');
console.log(params.toString());
// Prints: foo=def;bar=1;baz=xyz
```

```cjs
const { MIMEType } = require('node:util');

const { params } = new MIMEType('text/plain;foo=0;bar=1');
params.set('foo', 'def');
params.set('baz', 'xyz');
console.log(params.toString());
// Prints: foo=def;bar=1;baz=xyz
```

### `mimeParams.values()`

* Returns: {Iterator}

Returns an iterator over the values of each name-value pair.

### `mimeParamsSymbol.iterator`

* Returns: {Iterator}

Alias for `mimeParams.entries()`.

```mjs
import { MIMEType } from 'node:util';

const { params } = new MIMEType('text/plain;foo=bar;xyz=baz');
for (const [name, value] of params) {
  console.log(name, value);
}
// Prints:
//   foo bar
//   xyz baz
```

```cjs
const { MIMEType } = require('node:util');

const { params } = new MIMEType('text/plain;foo=bar;xyz=baz');
for (const [name, value] of params) {
  console.log(name, value);
}
// Prints:
//   foo bar
//   xyz baz
```

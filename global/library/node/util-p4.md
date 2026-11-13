---
title: "Util (part 4 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/util.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Util (part 4 of 10)

## `util.inspect(object[, showHidden[, depth[, colors]]])`

* `object` {any} Any JavaScript primitive or `Object`.
* `options` {Object}
  * `showHidden` {boolean} If `true`, `object`'s non-enumerable symbols and
    properties are included in the formatted result. {WeakMap} and
    {WeakSet} entries are also included as well as user defined prototype
    properties (excluding method properties). **Default:** `false`.
  * `depth` {number} Specifies the number of times to recurse while formatting
    `object`. This is useful for inspecting large objects. To recurse up to
    the maximum call stack size pass `Infinity` or `null`.
    **Default:** `2`.
  * `colors` {boolean} If `true`, the output is styled with ANSI color
    codes. Colors are customizable. See Customizing `util.inspect` colors.
    **Default:** `false`.
  * `customInspect` {boolean} If `false`,
    `util.inspect.custom` functions are not invoked.
    **Default:** `true`.
  * `showProxy` {boolean} If `true`, `Proxy` inspection includes
    the `target` and `handler` objects. **Default:** `false`.
  * `maxArrayLength` {integer} Specifies the maximum number of `Array`,
    {TypedArray}, {Map}, {WeakMap}, and {WeakSet} elements to include when formatting.
    Set to `null` or `Infinity` to show all elements. Set to `0` or
    negative to show no elements. **Default:** `100`.
  * `maxStringLength` {integer} Specifies the maximum number of characters to
    include when formatting. Set to `null` or `Infinity` to show all elements.
    Set to `0` or negative to show no characters. **Default:** `10000`.
  * `breakLength` {integer} The length at which input values are split across
    multiple lines. Set to `Infinity` to format the input as a single line
    (in combination with `compact` set to `true` or any number >= `1`).
    **Default:** `80`.
  * `compact` {boolean|integer} Setting this to `false` causes each object key
    to be displayed on a new line. It will break on new lines in text that is
    longer than `breakLength`. If set to a number, the most `n` inner elements
    are united on a single line as long as all properties fit into
    `breakLength`. Short array elements are also grouped together. For more
    information, see the example below. **Default:** `3`.
  * `sorted` {boolean|Function} If set to `true` or a function, all properties
    of an object, and `Set` and `Map` entries are sorted in the resulting
    string. If set to `true` the default sort is used. If set to a function,
    it is used as a compare function.
  * `getters` {boolean|string} If set to `true`, getters are inspected. If set
    to `'get'`, only getters without a corresponding setter are inspected. If
    set to `'set'`, only getters with a corresponding setter are inspected.
    This might cause side effects depending on the getter function.
    **Default:** `false`.
  * `numericSeparator` {boolean} If set to `true`, an underscore is used to
    separate every three digits in all bigints and numbers.
    **Default:** `false`.
* Returns: {string} The representation of `object`.

The `util.inspect()` method returns a string representation of `object` that is
intended for debugging. The output of `util.inspect` may change at any time
and should not be depended upon programmatically. Additional `options` may be
passed that alter the result.
`util.inspect()` will use the constructor's name and/or `Symbol.toStringTag`
property to make an identifiable tag for an inspected value.

```js
class Foo {
  get [Symbol.toStringTag]() {
    return 'bar';
  }
}

class Bar {}

const baz = Object.create(null, { [Symbol.toStringTag]: { value: 'foo' } });

util.inspect(new Foo()); // 'Foo [bar] {}'
util.inspect(new Bar()); // 'Bar {}'
util.inspect(baz);       // '[foo] {}'
```

Circular references point to their anchor by using a reference index:

```mjs
import { inspect } from 'node:util';

const obj = {};
obj.a = [obj];
obj.b = {};
obj.b.inner = obj.b;
obj.b.obj = obj;

console.log(inspect(obj));
// <ref *1> {
//   a: [ [Circular *1] ],
//   b: <ref *2> { inner: [Circular *2], obj: [Circular *1] }
// }
```

```cjs
const { inspect } = require('node:util');

const obj = {};
obj.a = [obj];
obj.b = {};
obj.b.inner = obj.b;
obj.b.obj = obj;

console.log(inspect(obj));
// <ref *1> {
//   a: [ [Circular *1] ],
//   b: <ref *2> { inner: [Circular *2], obj: [Circular *1] }
// }
```

The following example inspects all properties of the `util` object:

```mjs
import util from 'node:util';

console.log(util.inspect(util, { showHidden: true, depth: null }));
```

```cjs
const util = require('node:util');

console.log(util.inspect(util, { showHidden: true, depth: null }));
```

The following example highlights the effect of the `compact` option:

```mjs
import { inspect } from 'node:util';

const o = {
  a: [1, 2, [[
    'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do ' +
      'eiusmod \ntempor incididunt ut labore et dolore magna aliqua.',
    'test',
    'foo']], 4],
  b: new Map([['za', 1], ['zb', 'test']]),
};
console.log(inspect(o, { compact: true, depth: 5, breakLength: 80 }));

// { a:
//   [ 1,
//     2,
//     [ [ 'Lorem ipsum dolor sit amet,\nconsectetur [...]', // A long line
//           'test',
//           'foo' ] ],
//     4 ],
//   b: Map(2) { 'za' => 1, 'zb' => 'test' } }

// Setting `compact` to false or an integer creates more reader friendly output.
console.log(inspect(o, { compact: false, depth: 5, breakLength: 80 }));

// {
//   a: [
//     1,
//     2,
//     [
//       [
//         'Lorem ipsum dolor sit amet,\n' +
//           'consectetur adipiscing elit, sed do eiusmod \n' +
//           'tempor incididunt ut labore et dolore magna aliqua.',
//         'test',
//         'foo'
//       ]
//     ],
//     4
//   ],
//   b: Map(2) {
//     'za' => 1,
//     'zb' => 'test'
//   }
// }

// Setting `breakLength` to e.g. 150 will print the "Lorem ipsum" text in a
// single line.
```

```cjs
const { inspect } = require('node:util');

const o = {
  a: [1, 2, [[
    'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit, sed do ' +
      'eiusmod \ntempor incididunt ut labore et dolore magna aliqua.',
    'test',
    'foo']], 4],
  b: new Map([['za', 1], ['zb', 'test']]),
};
console.log(inspect(o, { compact: true, depth: 5, breakLength: 80 }));

// { a:
//   [ 1,
//     2,
//     [ [ 'Lorem ipsum dolor sit amet,\nconsectetur [...]', // A long line
//           'test',
//           'foo' ] ],
//     4 ],
//   b: Map(2) { 'za' => 1, 'zb' => 'test' } }

// Setting `compact` to false or an integer creates more reader friendly output.
console.log(inspect(o, { compact: false, depth: 5, breakLength: 80 }));

// {
//   a: [
//     1,
//     2,
//     [
//       [
//         'Lorem ipsum dolor sit amet,\n' +
//           'consectetur adipiscing elit, sed do eiusmod \n' +
//           'tempor incididunt ut labore et dolore magna aliqua.',
//         'test',
//         'foo'
//       ]
//     ],
//     4
//   ],
//   b: Map(2) {
//     'za' => 1,
//     'zb' => 'test'
//   }
// }

// Setting `breakLength` to e.g. 150 will print the "Lorem ipsum" text in a
// single line.
```

The `showHidden` option allows {WeakMap} and {WeakSet} entries to be
inspected. If there are more entries than `maxArrayLength`, there is no
guarantee which entries are displayed. That means retrieving the same
{WeakSet} entries twice may result in different output. Furthermore, entries
with no remaining strong references may be garbage collected at any time.

```mjs
import { inspect } from 'node:util';

const obj = { a: 1 };
const obj2 = { b: 2 };
const weakSet = new WeakSet([obj, obj2]);

console.log(inspect(weakSet, { showHidden: true }));
// WeakSet { { a: 1 }, { b: 2 } }
```

```cjs
const { inspect } = require('node:util');

const obj = { a: 1 };
const obj2 = { b: 2 };
const weakSet = new WeakSet([obj, obj2]);

console.log(inspect(weakSet, { showHidden: true }));
// WeakSet { { a: 1 }, { b: 2 } }
```

The `sorted` option ensures that an object's property insertion order does not
impact the result of `util.inspect()`.

```mjs
import { inspect } from 'node:util';
import assert from 'node:assert';

const o1 = {
  b: [2, 3, 1],
  a: '`a` comes before `b`',
  c: new Set([2, 3, 1]),
};
console.log(inspect(o1, { sorted: true }));
// { a: '`a` comes before `b`', b: [ 2, 3, 1 ], c: Set(3) { 1, 2, 3 } }
console.log(inspect(o1, { sorted: (a, b) => b.localeCompare(a) }));
// { c: Set(3) { 3, 2, 1 }, b: [ 2, 3, 1 ], a: '`a` comes before `b`' }

const o2 = {
  c: new Set([2, 1, 3]),
  a: '`a` comes before `b`',
  b: [2, 3, 1],
};
assert.strict.equal(
  inspect(o1, { sorted: true }),
  inspect(o2, { sorted: true }),
);
```

```cjs
const { inspect } = require('node:util');
const assert = require('node:assert');

const o1 = {
  b: [2, 3, 1],
  a: '`a` comes before `b`',
  c: new Set([2, 3, 1]),
};
console.log(inspect(o1, { sorted: true }));
// { a: '`a` comes before `b`', b: [ 2, 3, 1 ], c: Set(3) { 1, 2, 3 } }
console.log(inspect(o1, { sorted: (a, b) => b.localeCompare(a) }));
// { c: Set(3) { 3, 2, 1 }, b: [ 2, 3, 1 ], a: '`a` comes before `b`' }

const o2 = {
  c: new Set([2, 1, 3]),
  a: '`a` comes before `b`',
  b: [2, 3, 1],
};
assert.strict.equal(
  inspect(o1, { sorted: true }),
  inspect(o2, { sorted: true }),
);
```

The `numericSeparator` option adds an underscore every three digits to all
numbers.

```mjs
import { inspect } from 'node:util';

const thousand = 1000;
const million = 1000000;
const bigNumber = 123456789n;
const bigDecimal = 1234.12345;

console.log(inspect(thousand, { numericSeparator: true }));
// 1_000
console.log(inspect(million, { numericSeparator: true }));
// 1_000_000
console.log(inspect(bigNumber, { numericSeparator: true }));
// 123_456_789n
console.log(inspect(bigDecimal, { numericSeparator: true }));
// 1_234.123_45
```

```cjs
const { inspect } = require('node:util');

const thousand = 1000;
const million = 1000000;
const bigNumber = 123456789n;
const bigDecimal = 1234.12345;

console.log(inspect(thousand, { numericSeparator: true }));
// 1_000
console.log(inspect(million, { numericSeparator: true }));
// 1_000_000
console.log(inspect(bigNumber, { numericSeparator: true }));
// 123_456_789n
console.log(inspect(bigDecimal, { numericSeparator: true }));
// 1_234.123_45
```

`util.inspect()` is a synchronous method intended for debugging. Its maximum
output length is approximately 128 MiB. Inputs that result in longer output will
be truncated.

### Customizing `util.inspect` colors

Color output (if enabled) of `util.inspect` is customizable globally
via the `util.inspect.styles` and `util.inspect.colors` properties.

`util.inspect.styles` is a map associating a style name to a color from
`util.inspect.colors`.

The default styles and associated colors are:

* `bigint`: `yellow`
* `boolean`: `yellow`
* `date`: `magenta`
* `module`: `underline`
* `name`: (no styling)
* `null`: `bold`
* `number`: `yellow`
* `regexp`: A method that colors character classes, groups, assertions, and
  other parts for improved readability. To customize the coloring, change the
  `colors` property. It is set to
  `['red', 'green', 'yellow', 'cyan', 'magenta']` by default and may be
  adjusted as needed. The array is repetitively iterated through depending on
  the "depth".
* `special`: `cyan` (e.g., `Proxies`)
* `string`: `green`
* `symbol`: `green`
* `undefined`: `grey`

Color styling uses ANSI control codes that may not be supported on all
terminals. To verify color support use `tty.hasColors()`.

Predefined control codes are listed below (grouped as "Modifiers", "Foreground
colors", and "Background colors").

#### Complex custom coloring

It is possible to define a method as style. It receives the stringified value
of the input. It is invoked in case coloring is active and the type is
inspected.

Example: `util.inspect.styles.regexp(value)`

* `value` {string} The string representation of the input type.
* Returns: {string} The adjusted representation of `object`.

#### Modifiers

Modifier support varies throughout different terminals. They will mostly be
ignored, if not supported.

* `reset` - Resets all (color) modifiers to their defaults
* **bold** - Make text bold
* _italic_ - Make text italic
* underline - Make text underlined
* ~~strikethrough~~ - Puts a horizontal line through the center of the text
  (Alias: `strikeThrough`, `crossedout`, `crossedOut`)
* `hidden` - Prints the text, but makes it invisible (Alias: conceal)
* dim - Decreased color intensity (Alias:
  `faint`)
* overlined - Make text overlined
* blink - Hides and shows the text in an interval
* inverse - Swap foreground and
  background colors (Alias: `swapcolors`, `swapColors`)
* doubleunderline - Make text
  double underlined (Alias: `doubleUnderline`)
* framed - Draw a frame around the text

#### Foreground colors

* `black`
* `red`
* `green`
* `yellow`
* `blue`
* `magenta`
* `cyan`
* `white`
* `gray` (alias: `grey`, `blackBright`)
* `redBright`
* `greenBright`
* `yellowBright`
* `blueBright`
* `magentaBright`
* `cyanBright`
* `whiteBright`

#### Background colors

* `bgBlack`
* `bgRed`
* `bgGreen`
* `bgYellow`
* `bgBlue`
* `bgMagenta`
* `bgCyan`
* `bgWhite`
* `bgGray` (alias: `bgGrey`, `bgBlackBright`)
* `bgRedBright`
* `bgGreenBright`
* `bgYellowBright`
* `bgBlueBright`
* `bgMagentaBright`
* `bgCyanBright`
* `bgWhiteBright`

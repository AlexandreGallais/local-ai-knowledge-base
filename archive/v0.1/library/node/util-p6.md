---
title: "Util (part 6 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/util.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Util (part 6 of 10)

## `util.parseArgs([config])`

* `config` {Object} Used to provide arguments for parsing and to configure
  the parser. `config` supports the following properties:
  * `args` {string\[]} array of argument strings. **Default:** `process.argv`
    with `execPath` and `filename` removed.
  * `options` {Object} Used to describe arguments known to the parser.
    Keys of `options` are the long names of options and values are an
    {Object} accepting the following properties:
    * `type` {string} Type of argument, which must be either `boolean` or `string`.
    * `multiple` {boolean} Whether this option can be provided multiple
      times. If `true`, all values will be collected in an array. If
      `false`, values for the option are last-wins. **Default:** `false`.
    * `short` {string} A single character alias for the option.
    * `default` {string | boolean | string\[] | boolean\[]} The value to assign to
      the option if it does not appear in the arguments to be parsed. The value
      must match the type specified by the `type` property. If `multiple` is
      `true`, it must be an array. No default value is applied when the option
      does appear in the arguments to be parsed, even if the provided value
      is falsy.
  * `strict` {boolean} Should an error be thrown when unknown arguments
    are encountered, or when arguments are passed that do not match the
    `type` configured in `options`.
    **Default:** `true`.
  * `allowPositionals` {boolean} Whether this command accepts positional
    arguments.
    **Default:** `false` if `strict` is `true`, otherwise `true`.
  * `allowNegative` {boolean} If `true`, allows explicitly setting boolean
    options to `false` by prefixing the option name with `--no-`.
    **Default:** `false`.
  * `tokens` {boolean} Return the parsed tokens. This is useful for extending
    the built-in behavior, from adding additional checks through to reprocessing
    the tokens in different ways.
    **Default:** `false`.

* Returns: {Object} The parsed command line arguments:
  * `values` {Object} A mapping of parsed option names with their {string}
    or {boolean} values.
  * `positionals` {string\[]} Positional arguments.
  * `tokens` {Object\[] | undefined} See parseArgs tokens
    section. Only returned if `config` includes `tokens: true`.

Provides a higher level API for command-line argument parsing than interacting
with `process.argv` directly. Takes a specification for the expected arguments
and returns a structured object with the parsed options and positionals.

```mjs
import { parseArgs } from 'node:util';
const args = ['-f', '--bar', 'b'];
const options = {
  foo: {
    type: 'boolean',
    short: 'f',
  },
  bar: {
    type: 'string',
  },
};
const {
  values,
  positionals,
} = parseArgs({ args, options });
console.log(values, positionals);
// Prints: [Object: null prototype] { foo: true, bar: 'b' } []
```

```cjs
const { parseArgs } = require('node:util');
const args = ['-f', '--bar', 'b'];
const options = {
  foo: {
    type: 'boolean',
    short: 'f',
  },
  bar: {
    type: 'string',
  },
};
const {
  values,
  positionals,
} = parseArgs({ args, options });
console.log(values, positionals);
// Prints: [Object: null prototype] { foo: true, bar: 'b' } []
```

### `parseArgs` `tokens`

Detailed parse information is available for adding custom behaviors by
specifying `tokens: true` in the configuration.
The returned tokens have properties describing:

* all tokens
  * `kind` {string} One of 'option', 'positional', or 'option-terminator'.
  * `index` {number} Index of element in `args` containing token. So the
    source argument for a token is `args[token.index]`.
* option tokens
  * `name` {string} Long name of option.
  * `rawName` {string} How option used in args, like `-f` of `--foo`.
  * `value` {string | undefined} Option value specified in args.
    Undefined for boolean options.
  * `inlineValue` {boolean | undefined} Whether option value specified inline,
    like `--foo=bar`.
* positional tokens
  * `value` {string} The value of the positional argument in args (i.e. `args[index]`).
* option-terminator token

The returned tokens are in the order encountered in the input args. Options
that appear more than once in args produce a token for each use. Short option
groups like `-xy` expand to a token for each option. So `-xxx` produces
three tokens.

For example, to add support for a negated option like `--no-color` (which
`allowNegative` supports when the option is of `boolean` type), the returned
tokens can be reprocessed to change the value stored for the negated option.

```mjs
import { parseArgs } from 'node:util';

const options = {
  'color': { type: 'boolean' },
  'no-color': { type: 'boolean' },
  'logfile': { type: 'string' },
  'no-logfile': { type: 'boolean' },
};
const { values, tokens } = parseArgs({ options, tokens: true });

// Reprocess the option tokens and overwrite the returned values.
tokens
  .filter((token) => token.kind === '<example-value>')
  .forEach((token) => {
    if (token.name.startsWith('<example-value>')) {
      // Store foo:false for --no-foo
      const positiveName = token.name.slice(3);
      values[positiveName] = false;
      delete values[token.name];
    } else {
      // Resave value so last one wins if both --foo and --no-foo.
      values[token.name] = token.value ?? true;
    }
  });

const color = values.color;
const logfile = values.logfile ?? 'default.log';

console.log({ logfile, color });
```

```cjs
const { parseArgs } = require('node:util');

const options = {
  'color': { type: 'boolean' },
  'no-color': { type: 'boolean' },
  'logfile': { type: 'string' },
  'no-logfile': { type: 'boolean' },
};
const { values, tokens } = parseArgs({ options, tokens: true });

// Reprocess the option tokens and overwrite the returned values.
tokens
  .filter((token) => token.kind === '<example-value>')
  .forEach((token) => {
    if (token.name.startsWith('<example-value>')) {
      // Store foo:false for --no-foo
      const positiveName = token.name.slice(3);
      values[positiveName] = false;
      delete values[token.name];
    } else {
      // Resave value so last one wins if both --foo and --no-foo.
      values[token.name] = token.value ?? true;
    }
  });

const color = values.color;
const logfile = values.logfile ?? 'default.log';

console.log({ logfile, color });
```

Example usage showing negated options, and when an option is used
multiple ways then last one wins.

```console
$ node negate.js
{ logfile: 'default.log', color: undefined }
$ node negate.js --no-logfile --no-color
{ logfile: false, color: false }
$ node negate.js --logfile=test.log --color
{ logfile: 'test.log', color: true }
$ node negate.js --no-logfile --logfile=test.log --color --no-color
{ logfile: 'test.log', color: false }
```

## `util.parseEnv(content)`

* `content` {string}

The raw contents of a `.env` file.

* Returns: {Object}

Given an example `.env` file:

```cjs
const { parseEnv } = require('node:util');

parseEnv('HELLO=world\nHELLO=oh my\n');
// Returns: { HELLO: 'oh my' }
```

```mjs
import { parseEnv } from 'node:util';

parseEnv('HELLO=world\nHELLO=oh my\n');
// Returns: { HELLO: 'oh my' }
```

## `util.promisify(original)`

* `original` {Function}
* Returns: {Function}

Takes a function following the common error-first callback style, i.e. taking
an `(err, value) => ...` callback as the last argument, and returns a version
that returns promises.

```mjs
import { promisify } from 'node:util';
import { stat } from 'node:fs';

const promisifiedStat = promisify(stat);
promisifiedStat('.').then((stats) => {
  // Do something with `stats`
}).catch((error) => {
  // Handle the error.
});
```

```cjs
const { promisify } = require('node:util');
const { stat } = require('node:fs');

const promisifiedStat = promisify(stat);
promisifiedStat('.').then((stats) => {
  // Do something with `stats`
}).catch((error) => {
  // Handle the error.
});
```

Or, equivalently using `async function`s:

```mjs
import { promisify } from 'node:util';
import { stat } from 'node:fs';

const promisifiedStat = promisify(stat);

async function callStat() {
  const stats = await promisifiedStat('.');
  console.log(`This directory is owned by ${stats.uid}`);
}

callStat();
```

```cjs
const { promisify } = require('node:util');
const { stat } = require('node:fs');

const promisifiedStat = promisify(stat);

async function callStat() {
  const stats = await promisifiedStat('.');
  console.log(`This directory is owned by ${stats.uid}`);
}

callStat();
```

If there is an `original[util.promisify.custom]` property present, `promisify`
will return its value, see Custom promisified functions.

`promisify()` assumes that `original` is a function taking a callback as its
final argument in all cases. If `original` is not a function, `promisify()`
will throw an error. If `original` is a function but its last argument is not
an error-first callback, it will still be passed an error-first
callback as its last argument.

Using `promisify()` on class methods or other methods that use `this` may not
work as expected unless handled specially:

```mjs
import { promisify } from 'node:util';

class Foo {
  constructor() {
    this.a = 42;
  }

  bar(callback) {
    callback(null, this.a);
  }
}

const foo = new Foo();

const naiveBar = promisify(foo.bar);
// TypeError: Cannot read properties of undefined (reading 'a')
// naiveBar().then(a => console.log(a));

naiveBar.call(foo).then((a) => console.log(a)); // '42'

const bindBar = naiveBar.bind(foo);
bindBar().then((a) => console.log(a)); // '42'
```

```cjs
const { promisify } = require('node:util');

class Foo {
  constructor() {
    this.a = 42;
  }

  bar(callback) {
    callback(null, this.a);
  }
}

const foo = new Foo();

const naiveBar = promisify(foo.bar);
// TypeError: Cannot read properties of undefined (reading 'a')
// naiveBar().then(a => console.log(a));

naiveBar.call(foo).then((a) => console.log(a)); // '42'

const bindBar = naiveBar.bind(foo);
bindBar().then((a) => console.log(a)); // '42'
```

### Custom promisified functions

Using the `util.promisify.custom` symbol one can override the return value of
`util.promisify()`:

```mjs
import { promisify } from 'node:util';

function doSomething(foo, callback) {
  // ...
}

doSomething[promisify.custom] = (foo) => {
  return getPromiseSomehow();
};

const promisified = promisify(doSomething);
console.log(promisified === doSomething[promisify.custom]);
// prints 'true'
```

```cjs
const { promisify } = require('node:util');

function doSomething(foo, callback) {
  // ...
}

doSomething[promisify.custom] = (foo) => {
  return getPromiseSomehow();
};

const promisified = promisify(doSomething);
console.log(promisified === doSomething[promisify.custom]);
// prints 'true'
```

This can be useful for cases where the original function does not follow the
standard format of taking an error-first callback as the last argument.

For example, with a function that takes in
`(foo, onSuccessCallback, onErrorCallback)`:

```js
doSomething[util.promisify.custom] = (foo) => {
  return new Promise((resolve, reject) => {
    doSomething(foo, resolve, reject);
  });
};
```

If `promisify.custom` is defined but is not a function, `promisify()` will
throw an error.

### `util.promisify.custom`

* Type: {symbol} that can be used to declare custom promisified variants of functions,
  see Custom promisified functions.

In addition to being accessible through `util.promisify.custom`, this
symbol is registered globally and can be
accessed in any environment as `Symbol.for('nodejs.util.promisify.custom')`.

For example, with a function that takes in
`(foo, onSuccessCallback, onErrorCallback)`:

```js
const kCustomPromisifiedSymbol = Symbol.for('nodejs.util.promisify.custom');

doSomething[kCustomPromisifiedSymbol] = (foo) => {
  return new Promise((resolve, reject) => {
    doSomething(foo, resolve, reject);
  });
};
```

## `util.stripVTControlCharacters(str)`

* `str` {string}
* Returns: {string}

Returns `str` with any ANSI escape codes removed.

```js
console.log(util.stripVTControlCharacters('\u001B[4mvalue\u001B[0m'));
// Prints "value"
```

## `util.styleText(format, text[, options])`

* `format` {string | Array} A text format or an Array
  of text formats defined in `util.inspect.colors`, or a hex color in `#RGB`
  or `#RRGGBB` form.
* `text` {string} The text to be formatted.
* `options` {Object}
  * `validateStream` {boolean} When true, `stream` is checked to see if it can handle colors. **Default:** `true`.
  * `stream` {Stream} A stream that will be validated if it can be colored. **Default:** `process.stdout`.

This function returns a formatted text considering the `format` passed
for printing in a terminal. It is aware of the terminal's capabilities
and acts according to the configuration set via `NO_COLOR`,
`NODE_DISABLE_COLORS` and `FORCE_COLOR` environment variables.

```mjs
import { styleText } from 'node:util';
import { stderr } from 'node:process';

const successMessage = styleText('green', 'Success!');
console.log(successMessage);

const errorMessage = styleText(
  'red',
  'Error! Error!',
  // Validate if process.stderr has TTY
  { stream: stderr },
);
console.error(errorMessage);
```

```cjs
const { styleText } = require('node:util');
const { stderr } = require('node:process');

const successMessage = styleText('green', 'Success!');
console.log(successMessage);

const errorMessage = styleText(
  'red',
  'Error! Error!',
  // Validate if process.stderr has TTY
  { stream: stderr },
);
console.error(errorMessage);
```

`util.inspect.colors` also provides text formats such as `italic`, and
`underline` and you can combine both:

```cjs
console.log(
  util.styleText(['underline', 'italic'], 'My italic underlined message'),
);
```

When passing an array of formats, the order of the format applied
is left to right so the following style might overwrite the previous one.

```cjs
console.log(
  util.styleText(['red', 'green'], 'text'), // green
);
```

The special format value `none` applies no additional styling to the text.

In addition to predefined color names, `util.styleText()` supports hex color
strings using ANSI TrueColor (24-bit) escape sequences. Hex colors can be
specified in either 3-digit (`#RGB`) or 6-digit (`#RRGGBB`) format:

```mjs
import { styleText } from 'node:util';

// 6-digit hex color
console.log(styleText('#ff5733', 'Orange text'));

// 3-digit hex color (shorthand)
console.log(styleText('#f00', 'Red text'));
```

```cjs
const { styleText } = require('node:util');

// 6-digit hex color
console.log(styleText('#ff5733', 'Orange text'));

// 3-digit hex color (shorthand)
console.log(styleText('#f00', 'Red text'));
```

The full list of formats can be found in modifiers.

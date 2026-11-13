---
title: "Readline (part 2 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/readline.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Readline (part 2 of 4)

## Promises API

### Class: `readlinePromises.Interface`

* Extends: {readline.InterfaceConstructor}

Instances of the `readlinePromises.Interface` class are constructed using the
`readlinePromises.createInterface()` method. Every instance is associated with a
single `input` Readable stream and a single `output` Writable stream.
The `output` stream is used to print prompts for user input that arrives on,
and is read from, the `input` stream.

#### `rl.question(query[, options])`

* `query` {string} A statement or query to write to `output`, prepended to the
  prompt.
* `options` {Object}
  * `signal` {AbortSignal} Optionally allows the `question()` to be canceled
    using an `AbortSignal`.
* Returns: {Promise} A promise that is fulfilled with the user's
  input in response to the `query`.

The `rl.question()` method displays the `query` by writing it to the `output`,
waits for user input to be provided on `input`, then invokes the `callback`
function passing the provided input as the first argument.

When called, `rl.question()` will resume the `input` stream if it has been
paused.

If the `readlinePromises.Interface` was created with `output` set to `null` or
`undefined` the `query` is not written.

If the question is called after `rl.close()`, it returns a rejected promise.

Example usage:

```mjs
const answer = await rl.question('What is your favorite food? ');
console.log(`Oh, so your favorite food is ${answer}`);
```

Using an `AbortSignal` to cancel a question.

```mjs
const signal = AbortSignal.timeout(10_000);

signal.addEventListener('abort', () => {
  console.log('The food question timed out');
}, { once: true });

const answer = await rl.question('What is your favorite food? ', { signal });
console.log(`Oh, so your favorite food is ${answer}`);
```

### Class: `readlinePromises.Readline`

#### `new readlinePromises.Readline(stream[, options])`

* `stream` {stream.Writable} A TTY stream.
* `options` {Object}
  * `autoCommit` {boolean} If `true`, no need to call `rl.commit()`.

#### `rl.clearLine(dir)`

* `dir` {integer}
  * `-1`: to the left from cursor
  * `1`: to the right from cursor
  * `0`: the entire line
* Returns: this

The `rl.clearLine()` method adds to the internal list of pending action an
action that clears current line of the associated `stream` in a specified
direction identified by `dir`.
Call `rl.commit()` to see the effect of this method, unless `autoCommit: true`
was passed to the constructor.

#### `rl.clearScreenDown()`

* Returns: this

The `rl.clearScreenDown()` method adds to the internal list of pending action an
action that clears the associated stream from the current position of the
cursor down.
Call `rl.commit()` to see the effect of this method, unless `autoCommit: true`
was passed to the constructor.

#### `rl.commit()`

* Returns: {Promise}

The `rl.commit()` method sends all the pending actions to the associated
`stream` and clears the internal list of pending actions.

#### `rl.cursorTo(x[, y])`

* `x` {integer}
* `y` {integer}
* Returns: this

The `rl.cursorTo()` method adds to the internal list of pending action an action
that moves cursor to the specified position in the associated `stream`.
Call `rl.commit()` to see the effect of this method, unless `autoCommit: true`
was passed to the constructor.

#### `rl.moveCursor(dx, dy)`

* `dx` {integer}
* `dy` {integer}
* Returns: this

The `rl.moveCursor()` method adds to the internal list of pending action an
action that moves the cursor _relative_ to its current position in the
associated `stream`.
Call `rl.commit()` to see the effect of this method, unless `autoCommit: true`
was passed to the constructor.

#### `rl.rollback()`

* Returns: this

The `rl.rollback` methods clears the internal list of pending actions without
sending it to the associated `stream`.

### `readlinePromises.createInterface(options)`

* `options` {Object}
  * `input` {stream.Readable} The Readable stream to listen to. This option
    is _required_.
  * `output` {stream.Writable} The Writable stream to write readline data
    to.
  * `completer` {Function} An optional function used for Tab autocompletion.
  * `terminal` {boolean} `true` if the `input` and `output` streams should be
    treated like a TTY, and have ANSI/VT100 escape codes written to it.
    **Default:** checking `isTTY` on the `output` stream upon instantiation.
  * `history` {string\[]} Initial list of history lines. This option makes sense
    only if `terminal` is set to `true` by the user or by an internal `output`
    check, otherwise the history caching mechanism is not initialized at all.
    **Default:** `[]`.
  * `historySize` {number} Maximum number of history lines retained. To disable
    the history set this value to `0`. This option makes sense only if
    `terminal` is set to `true` by the user or by an internal `output` check,
    otherwise the history caching mechanism is not initialized at all.
    **Default:** `30`.
  * `removeHistoryDuplicates` {boolean} If `true`, when a new input line added
    to the history list duplicates an older one, this removes the older line
    from the list. **Default:** `false`.
  * `prompt` {string} The prompt string to use. **Default:** `'> '`.
  * `crlfDelay` {number} If the delay between `\r` and `\n` exceeds
    `crlfDelay` milliseconds, both `\r` and `\n` will be treated as separate
    end-of-line input. `crlfDelay` will be coerced to a number no less than
    `100`. It can be set to `Infinity`, in which case `\r` followed by `\n`
    will always be considered a single newline (which may be reasonable for
    reading files with `\r\n` line delimiter). **Default:** `100`.
  * `escapeCodeTimeout` {number} The duration `readlinePromises` will wait for a
    character (when reading an ambiguous key <example-value> in milliseconds one that
    can both form a complete key <example-value> using the input read so far and can
    take additional input to complete a longer key <example-value>).
    **Default:** `500`.
  * `tabSize` {integer} The number of spaces a tab is equal to (minimum 1).
    **Default:** `8`.
  * `signal` {AbortSignal} Allows closing the interface using an AbortSignal.
* Returns: {readlinePromises.Interface}

The `readlinePromises.createInterface()` method creates a new `readlinePromises.Interface`
instance.

```mjs
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
const rl = createInterface({
  input: stdin,
  output: stdout,
});
```

```cjs
const { createInterface } = require('node:readline/promises');
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

Once the `readlinePromises.Interface` instance is created, the most common case
is to listen for the `'line'` event:

```js
rl.on('line', (line) => {
  console.log(`Received: ${line}`);
});
```

If `terminal` is `true` for this instance then the `output` stream will get
the best compatibility if it defines an `output.columns` property and emits
a `'resize'` event on the `output` if or when the columns ever change
(`process.stdout` does this automatically when it is a TTY).

#### Use of the `completer` function

The `completer` function takes the current line entered by the user
as an argument, and returns an `Array` with 2 entries:

* An `Array` with matching entries for the completion.
* The substring that was used for the matching.

For instance: `[[substr1, substr2, ...], originalsubstring]`.

```js
function completer(line) {
  const completions = '.help .error .exit .quit .q'.split(' ');
  const hits = completions.filter((c) => c.startsWith(line));
  // Show all completions if none found
  return [hits.length ? hits : completions, line];
}
```

The `completer` function can also return a {Promise}, or be asynchronous:

```js
async function completer(linePartial) {
  await someAsyncWork();
  return [['123'], linePartial];
}
```

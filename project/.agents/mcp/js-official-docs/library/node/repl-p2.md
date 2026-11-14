---
title: "REPL (part 2 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/repl.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# REPL (part 2 of 3)

## Class: `REPLServer`

* `options` {Object|string} See `repl.start()`
* Extends: {readline.Interface}

Instances of `repl.REPLServer` are created using the `repl.start()` method
or directly using the JavaScript `new` keyword.

```mjs
import repl from 'node:repl';

const options = { useColors: true };

const firstInstance = repl.start(options);
const secondInstance = new repl.REPLServer(options);
```

```cjs
const repl = require('node:repl');

const options = { useColors: true };

const firstInstance = repl.start(options);
const secondInstance = new repl.REPLServer(options);
```

Calling `repl.REPLServer()` without the `new` keyword throws a `TypeError`
(see DEP0185).

### Event: `'exit'`

The `'exit'` event is emitted when the REPL is exited either by receiving the
`.exit` command as input, the user pressing `Ctrl`+`C` twice
to signal `SIGINT`,
or by pressing `Ctrl`+`D` to signal `'end'` on the input
stream. The listener
callback is invoked without any arguments.

```js
replServer.on('exit', () => {
  console.log('Received "exit" event from repl!');
  process.exit();
});
```

### Event: `'reset'`

The `'reset'` event is emitted when the REPL's context is reset. This occurs
whenever the `.clear` command is received as input _unless_ the REPL is using
the default evaluator and the `repl.REPLServer` instance was created with the
`useGlobal` option set to `true`. The listener callback will be called with a
reference to the `context` object as the only argument.

This can be used primarily to re-initialize REPL context to some pre-defined
state:

```mjs
import repl from 'node:repl';

function initializeContext(context) {
  context.m = 'test';
}

const r = repl.start({ prompt: '> ' });
initializeContext(r.context);

r.on('reset', initializeContext);
```

```cjs
const repl = require('node:repl');

function initializeContext(context) {
  context.m = 'test';
}

const r = repl.start({ prompt: '> ' });
initializeContext(r.context);

r.on('reset', initializeContext);
```

When this code is executed, the global `'m'` variable can be modified but then
reset to its initial value using the `.clear` command:

```console
$ ./node example.js
> m
'test'
> m = 1
1
> m
1
> .clear
Clearing context...
> m
'test'
>
```

### `replServer.defineCommand(keyword, cmd)`

* `keyword` {string} The command keyword (_without_ a leading `.` character).
* `cmd` {Object|Function} The function to invoke when the command is processed.

The `replServer.defineCommand()` method is used to add new `.`-prefixed commands
to the REPL instance. Such commands are invoked by typing a `.` followed by the
`keyword`. The `cmd` is either a `Function` or an `Object` with the following
properties:

* `help` {string} Help text to be displayed when `.help` is entered (Optional).
* `action` {Function} The function to execute, optionally accepting a single
  string argument.

The following example shows two new commands added to the REPL instance:

```mjs
import repl from 'node:repl';

const replServer = repl.start({ prompt: '> ' });
replServer.defineCommand('sayhello', {
  help: 'Say hello',
  action(name) {
    this.clearBufferedCommand();
    console.log(`Hello, ${name}!`);
    this.displayPrompt();
  },
});
replServer.defineCommand('saybye', function saybye() {
  console.log('Goodbye!');
  this.close();
});
```

```cjs
const repl = require('node:repl');

const replServer = repl.start({ prompt: '> ' });
replServer.defineCommand('sayhello', {
  help: 'Say hello',
  action(name) {
    this.clearBufferedCommand();
    console.log(`Hello, ${name}!`);
    this.displayPrompt();
  },
});
replServer.defineCommand('saybye', function saybye() {
  console.log('Goodbye!');
  this.close();
});
```

The new commands can then be used from within the REPL instance:

```console
> .sayhello Node.js User
Hello, Node.js User!
> .saybye
Goodbye!
```

### `replServer.displayPrompt([preserveCursor])`

* `preserveCursor` {boolean}

The `replServer.displayPrompt()` method readies the REPL instance for input
from the user, printing the configured `prompt` to a new line in the `output`
and resuming the `input` to accept new input.

When multi-line input is being entered, a pipe `'|'` is printed rather than the
'prompt'.

When `preserveCursor` is `true`, the cursor placement will not be reset to `0`.

The `replServer.displayPrompt` method is primarily intended to be called from
within the action function for commands registered using the
`replServer.defineCommand()` method.

### `replServer.clearBufferedCommand()`

The `replServer.clearBufferedCommand()` method clears any command that has been
buffered but not yet executed. This method is primarily intended to be
called from within the action function for commands registered using the
`replServer.defineCommand()` method.

### `replServer.setupHistory(historyConfig, callback)`

* `historyConfig` {Object|string} the path to the history file
  If it is a string, it is the path to the history file.
  If it is an object, it can have the following properties:
  * `filePath` {string} the path to the history file
  * `size` {number} Maximum number of history lines retained. To disable
    the history set this value to `0`. This option makes sense only if
    `terminal` is set to `true` by the user or by an internal `output` check,
    otherwise the history caching mechanism is not initialized at all.
    **Default:** `30`.
  * `removeHistoryDuplicates` {boolean} If `true`, when a new input line added
    to the history list duplicates an older one, this removes the older line
    from the list. **Default:** `false`.
  * `onHistoryFileLoaded` {Function} called when history writes are ready or upon error
    * `err` {Error}
    * `repl` {repl.REPLServer}
* `callback` {Function} called when history writes are ready or upon error
  (Optional if provided as `onHistoryFileLoaded` in `historyConfig`)
  * `err` {Error}
  * `repl` {repl.REPLServer}

Initializes a history log file for the REPL instance. When executing the
Node.js binary and using the command-line REPL, a history file is initialized
by default. However, this is not the case when creating a REPL
programmatically. Use this method to initialize a history log file when working
with REPL instances programmatically.

## `repl.builtinModules`

> Stability: 0 - Deprecated. Use `module.builtinModules` instead.

* Type: {string\[]}

A list of the names of some Node.js modules, e.g., `'http'`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/repl-builtin-modules
```

## `repl.start([options])`

* `options` {Object|string}
  * `prompt` {string} The input prompt to display. **Default:** `'> '`
    (with a trailing space).
  * `input` {stream.Readable} The `Readable` stream from which REPL input will
    be read. **Default:** `process.stdin`.
  * `output` {stream.Writable} The `Writable` stream to which REPL output will
    be written. **Default:** `process.stdout`.
  * `terminal` {boolean} If `true`, specifies that the `output` should be
    treated as a TTY terminal.
    **Default:** checking the value of the `isTTY` property on the `output`
    stream upon instantiation.
  * `eval` {Function} The function to be used when evaluating each given line
    of input. **Default:** an async wrapper for the JavaScript `eval()`
    function. An `eval` function can error with `repl.Recoverable` to indicate
    the input was incomplete and prompt for additional lines. See the
    custom evaluation functions section for more details.
  * `useColors` {boolean} If `true`, specifies that the default `writer`
    function should include ANSI color styling to REPL output. If a custom
    `writer` function is provided then this has no effect. **Default:** checking
    color support on the `output` stream if the REPL instance's `terminal` value
    is `true`.
  * `useGlobal` {boolean} If `true`, specifies that the default evaluation
    function will use the JavaScript `global` as the context as opposed to
    creating a new separate context for the REPL instance. The node CLI REPL
    sets this value to `true`. **Default:** `false`.
  * `ignoreUndefined` {boolean} If `true`, specifies that the default writer
    will not output the return value of a command if it evaluates to
    `undefined`. **Default:** `false`.
  * `writer` {Function} The function to invoke to format the output of each
    command before writing to `output`. **Default:** `util.inspect()`.
  * `completer` {Function} An optional function used for custom Tab auto
    completion. See `readline.InterfaceCompleter` for an example.
  * `replMode` {symbol} A flag that specifies whether the default evaluator
    executes all JavaScript commands in strict mode or default (sloppy) mode.
    Acceptable values are:
    * `repl.REPL_MODE_SLOPPY` to evaluate expressions in sloppy mode.
    * `repl.REPL_MODE_STRICT` to evaluate expressions in strict mode. This is
      equivalent to prefacing every repl statement with `'use strict'`.
  * `breakEvalOnSigint` {boolean} Stop evaluating the current piece of code when
    `SIGINT` is received, such as when `Ctrl`+`C` is pressed.
    This cannot be used
    together with a custom `eval` function. **Default:** `false`.
  * `preview` {boolean} Defines if the repl prints autocomplete and output
    previews or not. **Default:** `true` with the default eval function and
    `false` in case a custom eval function is used. If `terminal` is falsy, then
    there are no previews and the value of `preview` has no effect.
  * `handleError` {Function} This function customizes error handling in the REPL.
    It receives the thrown exception as its first argument and must return one
    of the following values synchronously:
    * `'print'` to print the error to the output stream (default behavior).
    * `'ignore'` to skip all remaining error handling.
    * `'unhandled'` to treat the exception as fully unhandled. In this case,
      the error will be passed to process-wide exception handlers, such as
      the `'uncaughtException'` event.
      The `'unhandled'` value may or may not be desirable in situations
      where the `REPLServer` instance has been closed, depending on the particular
      use case.
* Returns: {repl.REPLServer}

The `repl.start()` method creates and starts a `repl.REPLServer` instance.

If `options` is a string, then it specifies the input prompt:

```mjs
import repl from 'node:repl';

// a Unix style prompt
repl.start('$ ');
```

```cjs
const repl = require('node:repl');

// a Unix style prompt
repl.start('$ ');
```

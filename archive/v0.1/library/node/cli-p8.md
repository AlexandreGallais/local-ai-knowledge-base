---
title: "Command-line API (part 8 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API (part 8 of 10)

### `--watch-path`

Starts Node.js in watch mode and specifies what paths to watch.
When in watch mode, changes in the watched paths cause the Node.js process to
restart.
This will turn off watching of required or imported modules, even when used in
combination with `--watch`.

This flag cannot be combined with
`--check`, `--eval`, `--interactive`, `--test`, or the REPL.

Note: Using `--watch-path` implicitly enables `--watch`, which requires a file path
and is incompatible with `--run`, as `--run` takes precedence and ignores watch mode.

```bash
node --watch-path=./src --watch-path=./tests index.js
```

This option is only supported on macOS and Windows.
An `ERR_FEATURE_UNAVAILABLE_ON_PLATFORM` exception will be thrown
when the option is used on a platform that does not support it.

### `--watch-preserve-output`

Disable the clearing of the console when watch mode restarts the process.

```bash
node --watch --watch-preserve-output test.js
```

### `--zero-fill-buffers`

Automatically zero-fills all newly allocated `Buffer` instances.

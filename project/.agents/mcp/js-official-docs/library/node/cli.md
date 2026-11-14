---
title: "Command-line API (part 1 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API

Node.js comes with a variety of CLI options. These options expose built-in
debugging, multiple ways to execute scripts, and other helpful runtime options.

To view this documentation as a manual page in a terminal, run `man node`.

## Synopsis

`node [options] [V8 options] [<program-entry-point> | -e "script" | -] [--] [arguments]`

`node inspect [<program-entry-point> | -e "script" | <host>:<port>] …`

`node --v8-options`

Execute without arguments to start the REPL.

For more info about `node inspect`, see the debugger documentation.

## Program entry point

The program entry point is a specifier-like string. If the string is not an
absolute path, it's resolved as a relative path from the current working
directory. That entry point string is then resolved as if it's been requested
by `require()` from the current working directory. If no corresponding file
is found, an error is thrown.

By default, the resolved path is also loaded as if it's been requested by `require()`,
unless one of the conditions below apply—then it's loaded as if it's been requested
by `import()`:

* The program was started with a command-line flag that forces the entry
  point to be loaded with ECMAScript module loader, such as `--import`.
* The file has an `.mjs`, `.mts` or `.wasm` extension.
* The file does not have a `.cjs` extension, and the nearest parent
  `package.json` file contains a top-level `"type"` field with a value of
  `"module"`.

See module resolution and loading for more details.

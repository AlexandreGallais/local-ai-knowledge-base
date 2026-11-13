---
title: "tsc CLI Options (part 1 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/project-config/Compiler Options.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

## Using the CLI

Running `tsc` locally will compile the closest project defined by a `tsconfig.json`, or you can compile a set of TypeScript
files by passing in a glob of files you want. When input files are specified on the command line, `tsconfig.json` files are
ignored.

```sh
# Run a compile based on a backwards look through the fs for a tsconfig.json
tsc

# Emit JS for just the index.ts with the compiler defaults
tsc index.ts

# Emit JS for any .ts files in the folder src, with the default settings
tsc src/*.ts

# Emit files referenced in with the compiler settings from tsconfig.production.json
tsc --project tsconfig.production.json

# Emit d.ts files for a js file with showing compiler options which are booleans
tsc index.js --declaration --emitDeclarationOnly

# Emit a single .js file from two files via compiler options which take string arguments
tsc app.ts util.ts --target esnext --outfile index.js
```

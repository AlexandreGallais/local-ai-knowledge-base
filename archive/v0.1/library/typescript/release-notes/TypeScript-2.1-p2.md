---
title: "TypeScript 2.1 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 2.1.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 2.1 (part 2 of 2)

## Configuration inheritance

Often a project has multiple output targets, e.g. `ES5` and `ES2015`, debug and production or `CommonJS` and `System`;
Just a few configuration options change between these two targets, and maintaining multiple `tsconfig.json` files can be a hassle.

TypeScript 2.1 supports inheriting configuration using `extends`, where:

- `extends` is a new top-level property in `tsconfig.json` (alongside `compilerOptions`, `files`, `include`, and `exclude`).
- The value of `extends` must be a string containing a path to another configuration file to inherit from.
- The configuration from the base file is loaded first, then overridden by those in the inheriting config file.
- Circularity between configuration files is not allowed.
- `files`, `include`, and `exclude` from the inheriting config file _overwrite_ those from the base config file.
- All relative paths found in the configuration file will be resolved relative to the configuration file they originated in.

##### Example

`configs/base.json`:

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

`tsconfig.json`:

```json
{
  "extends": "./configs/base",
  "files": ["main.ts", "supplemental.ts"]
}
```

`tsconfig.nostrictnull.json`:

```json
{
  "extends": "./tsconfig",
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

## New `--alwaysStrict`

Invoking the compiler with `alwaysStrict` causes:

1. Parses all the code in strict mode.
2. Writes `"use strict";` directive atop every generated file.

Modules are parsed automatically in strict mode.
The new flag is recommended for non-module code.

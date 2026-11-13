---
title: "TypeScript 2.0 (part 3 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 2.0.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 2.0 (part 3 of 3)

## New `--skipLibCheck`

TypeScript 2.0 adds a new `skipLibCheck` compiler option that causes type checking of declaration files (files with extension `.d.ts`) to be skipped.
When a program includes large declaration files, the compiler spends a lot of time type checking declarations that are already known to not contain errors, and compile times may be significantly shortened by skipping declaration file type checks.

Since declarations in one file can affect type checking in other files, some errors may not be detected when `skipLibCheck` is specified.
For example, if a non-declaration file augments a type declared in a declaration file, errors may result that are only reported when the declaration file is checked.
However, in practice such situations are rare.

## Allow duplicate identifiers across declarations

This has been one common source of duplicate definition errors.
Multiple declaration files defining the same members on interfaces.

TypeScript 2.0 relaxes this constraint and allows duplicate identifiers across blocks, as long as they have _identical_ types.

Within the same block duplicate definitions are still disallowed.

##### Example

```ts
interface Error {
  stack?: string;
}

interface Error {
  code?: string;
  path?: string;
  stack?: string; // OK
}
```

## New `--declarationDir`

`declarationDir` allows for generating declaration files in a different location than JavaScript files.

---
title: "Angular package format (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/libraries/angular-package-format.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular package format (part 2 of 2)

## Examples

The npm packages of the Angular framework are a good reference point for APF-compliant library packages.
Browse the file layout and npm package on UNPKG:

  - @angular/core package
  - @angular/material package

## Definition of terms

The following terms are used throughout this document intentionally.
In this section are the definitions of all of them to provide additional clarity.

### Package

The smallest set of files that are published to npm and installed together, for example `@angular/core`.
This package includes a manifest called package.json, compiled source code, typescript definition files, source maps, metadata, etc.
The package is installed with `npm install @angular/core`.

### Symbol

A class, function, constant, or variable contained in a module and optionally made visible to the external world via a module export.

### Module

Short for ECMAScript Modules.
A file containing statements that import and export symbols.
This is identical to the definition of modules in the ECMAScript spec.

### ESM

Short for ECMAScript Modules \(see above\).

### FESM

Short for Flattened ES Modules and consists of a file format created by flattening all ES Modules accessible from an entry point into a single ES Module.
Note that FESM is typically a single file, but it can depend on a shared chunk that is shared with other FESMs.

### Module ID

The identifier of a module used in the import statements \(for example, `@angular/core`\).
The ID often maps directly to a path on the filesystem, but this is not always the case due to various module resolution strategies.

### Module specifier

A module identifier \(see above\).

### Module resolution strategy

Algorithm used to convert Module IDs to paths on the filesystem.
Node.js has one that is well specified and widely used, TypeScript supports several module resolution strategies, Closure Compiler has yet another strategy.

### Module format

Specification of the module syntax that covers at minimum the syntax for the importing and exporting from a file.
Common module formats are CommonJS \(CJS, typically used for Node.js applications\) or ECMAScript Modules \(ESM\).
The module format indicates only the packaging of the individual modules, but not the JavaScript language features used to make up the module content.
Because of this, the Angular team often uses the language level specifier as a suffix to the module format, \(for example, ESM+ES2022 specifies that the module is in ESM format and contains ES2022 code\).

### Bundle

An artifact in the form of a single JS file, produced by a build tool \(for example, webpack or Rollup\) that contains symbols originating in one or more modules.
Bundles are a browser-specific workaround that reduce network strain that would be caused if browsers were to start downloading hundreds if not tens of thousands of files.
Node.js typically doesn't use bundles.
Common bundle formats are UMD and System.register.

### Language level

The language of the code \(ES2022\).
Independent of the module format.

### Entry point

A module intended to be imported by the user.
It is referenced by a unique module ID and exports the public API referenced by that module ID.
An example is `@angular/core` or `@angular/core/testing`.
Both entry points exist in the `@angular/core` package, but they export different symbols.
A package can have many entry points.

### Deep import

A process of retrieving symbols from modules that are not Entry Points.
These module IDs are usually considered to be private APIs that can change over the lifetime of the project or while the bundle for the given package is being created.

### Top-Level import

An import coming from an entry point.
The available top-level imports are what define the public API and are exposed in "@angular/name" modules, such as `@angular/core` or `@angular/common`.

### Tree-shaking

The process of identifying and removing code not used by an application - also known as dead code elimination.
This is a global optimization performed at the application level using tools like Rollup, Rolldown, Closure Compiler, or Terser.

### AOT compiler

The Ahead of Time Compiler for Angular.

### Flattened type definitions

The bundled TypeScript definitions generated using tools like API Extractor or rollup-plugin-dts.

---
title: "Angular package format (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/libraries/angular-package-format.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular package format

This document describes the Angular Package Format \(APF\).
APF is an Angular specific specification for the structure and format of npm packages that is used by all first-party Angular packages \(`@angular/core`, `@angular/material`, etc.\) and most third-party Angular libraries.

APF enables a package to work seamlessly under most common scenarios that use Angular.
Packages that use APF are compatible with the tooling offered by the Angular team as well as wider JavaScript ecosystem.
It is recommended that third-party library developers follow the same npm package format.

HELPFUL: APF is versioned along with the rest of Angular, and every major version improves the package format.
You can find the versions of the specification prior to v13 in this google doc.

## Why specify a package format?

In today's JavaScript landscape, developers consume packages in many different ways, using many different toolchains \(webpack, Rollup, Rolldown, esbuild, etc.\).
These tools may understand and require different inputs - some tools may be able to process the latest ES language version, while others may benefit from directly consuming an older ES version.

The Angular distribution format supports all of the commonly used development tools and workflows, and adds emphasis on optimizations that result either in smaller application payload size or faster development iteration cycle \(build time\).

Developers can rely on Angular CLI and ng-packagr \(a build tool Angular CLI uses\) to produce packages in the Angular package format.
See the Creating Libraries guide for more details.

## File layout

The following example shows a simplified version of the `@angular/core` package's file layout, with an explanation for each file in the package.

```markdown
node_modules/@angular/core
├── README.md
├── package.json
├── fesm2022
│ ├── core.mjs
│ ├── core.mjs.map
│ ├── testing.mjs
│ └── testing.mjs.map
└── types
│ ├── core.d.ts
│ ├── testing.d.ts
```

This table describes the file layout under `node_modules/@angular/core` annotated to describe the purpose of files and directories:

| Files                                                                                                                                                     | Purpose                                                                                                                                                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `README.md`                                                                                                                                               | Package README, used by npmjs web UI.                                                                                                                                                                          |
| `package.json`                                                                                                                                            | Primary `package.json`, describing the package itself as well as all available entrypoints and code formats. This file contains the "exports" mapping used by runtimes and tools to perform module resolution. |
| `fesm2022/`    ─ `core.mjs`    ─ `core.mjs.map`    ─ `testing.mjs`    ─ `testing.mjs.map` | Code for all entrypoints in flattened \(FESM\) ES2022 format, along with source maps.                                                                                                                          |
| `types/`    ─ `core.d.ts`    ─ `testing.d.ts`                                                                             | Bundled TypeScript type definitions for all public entrypoints.                                                                                                                                                |

### `package.json`

The primary `package.json` contains important package metadata, including the following:

- It declares the package to be in EcmaScript Module \(ESM\) format
- It contains an `"exports"` field which defines the available source code formats of all entrypoints
- It contains keys which define the available source code formats of the primary `@angular/core` entrypoint, for tools which do not understand `"exports"`.
  These keys are considered deprecated, and could be removed as the support for `"exports"` rolls out across the ecosystem.

- It declares whether the package contains side effects

### ESM declaration

The top-level `package.json` contains the key:

```js
{
  "type": "module"
}
```

This informs resolvers that code within the package is using EcmaScript Modules as opposed to CommonJS modules.

### `"exports"`

The `"exports"` field has the following structure:

```js
"exports": {
  "./schematics/*": {
    "default": "./schematics/*.js"
  },
  "./package.json": {
    "default": "./package.json"
  },
  ".": {
    "types": "./types/core.d.ts",
    "default": "./fesm2022/core.mjs"
  },
  "./testing": {
    "types": "./types/testing.d.ts",
    "default": "./fesm2022/testing.mjs"
  }
}
```

Of primary interest are the `"."` and the `"./testing"` keys, which define the available code formats for the `@angular/core` primary entrypoint and the `@angular/core/testing` secondary entrypoint, respectively.
For each entrypoint, the available formats are:

| Formats                   | Details                                                                 |
| :------------------------ | :---------------------------------------------------------------------- |
| Typings \(`.d.ts` files\) | `.d.ts` files are used by TypeScript when depending on a given package. |
| `default`                 | ES2022 code flattened into a single source.                             |

Tooling that is aware of these keys may preferentially select a desirable code format from `"exports"`.

Libraries may want to expose additional static files which are not captured by the exports of the JavaScript-based entry-points such as Sass mixins or pre-compiled CSS.

For more information, see Managing assets in a library.

### Legacy resolution keys

In addition to `"exports"`, the top-level `package.json` also defines legacy module resolution keys for resolvers that don't support `"exports"`.
For `@angular/core` these are:

```js
{
  "module": "./fesm2022/core.mjs",
  "typings": "./types/core.d.ts",
}
```

As shown in the preceding code snippet, a module resolver can use these keys to load a specific code format.

### Side effects

The last function of `package.json` is to declare whether the package has side effects.

```js
{
  "sideEffects": false
}
```

Most Angular packages should not depend on top-level side effects, and thus should include this declaration.

### Entrypoints and code splitting

Packages in the Angular Package Format contain one primary entrypoint and zero or more secondary entrypoints \(for example, `@angular/common/http`\).
Entrypoints serve several functions.

1. They define the module specifiers from which users import code \(for example, `@angular/core` and `@angular/core/testing`\).

   Users typically perceive these entrypoints as distinct groups of symbols, with different purposes or capability.

   Specific entrypoints might only be used for special purposes, such as testing.
   Such APIs can be separated out from the primary entrypoint to reduce the chance of them being used accidentally or incorrectly.

1. They define the granularity at which code can be lazily loaded.

   Many modern build tools are only capable of "code splitting" \(aka lazy loading\) at the ES Module level.
   The Angular Package Format uses primarily a single "flat" ES Module per entry point. This means that most build tooling is not able to split code with a single entry point into multiple output chunks.

The general rule for APF packages is to use entrypoints for the smallest sets of logically connected code possible.
For example, the Angular Material package publishes each logical component or set of components as a separate entrypoint - one for Button, one for Tabs, etc.
This allows each Material component to be lazily loaded separately, if desired.

Not all libraries require such granularity.
Most libraries with a single logical purpose should be published as a single entrypoint.
`@angular/core` for example uses a single entrypoint for the runtime, because the Angular runtime is generally used as a single entity.

#### Resolution of secondary entry points

Secondary entrypoints can be resolved via the `"exports"` field of the `package.json` for the package.

To learn how to configure secondary entry points in a library, see Entry points.

### README.md

The README file in the Markdown format that is used to display description of a package on npm and GitHub.

Example README content of @angular/core package:

```html
Angular &equals;&equals;&equals;&equals;&equals;&equals;&equals; The sources for this package are in
the main [Angular](https://github.com/angular/angular) repo.Please file issues and pull requests
against that repo. License: MIT
```

## Library Compilation and Package Optimizations

This section describes the compilation process for libraries and optimizations that apply to the npm package before publishing the artifact to a registry.

### Partial compilation

Libraries in the Angular Package Format must be published in "partial compilation" mode.
This is a compilation mode for `ngc` which produces compiled Angular code that is not tied to a specific Angular runtime version, in contrast to the full compilation used for applications, where the Angular compiler and runtime versions must match exactly.

To partially compile Angular code, use the `compilationMode` flag in the `angularCompilerOptions` property of your `tsconfig.json`:

```js
{
  …
  "angularCompilerOptions": {
    "compilationMode": "partial",
  }
}
```

Partially compiled library code is then converted to fully compiled code during the application build process by the Angular CLI.

If your build pipeline does not use the Angular CLI then refer to the Consuming partial ivy code outside the Angular CLI guide.

### Flattening of ES modules

The Angular Package Format specifies that code be published in "flattened" ES module format.
This significantly reduces the build time of Angular applications as well as download and parse time of the final application bundle.
Please check out the excellent post "The cost of small modules" by Nolan Lawson.

The Angular compiler can generate index ES module files. Tools like Rollup / Rolldown can use these files to generate flattened modules in a _Flattened ES Module_ (FESM) file format.

FESM is a file format created by flattening all ES Modules accessible from an entrypoint into a single ES Module.
It's formed by following all imports from a package and copying that code into a single file while preserving all public ES exports and removing all private imports.
However, in some cases, the FESM may depend on shared chunks that are shared between multiple entry points.

The abbreviated name, FESM, pronounced _phe-som_, can be followed by a number such as FESM2020.
The number refers to the language level of the JavaScript inside the module.
Accordingly a FESM2022 file would be ESM+ES2022 and include import/export statements and ES2022 source code.

To generate a flattened ES Module index file, use the following configuration options in your tsconfig.json file:

```js
{
  "compilerOptions": {
    …
    "module": "esnext",
    "target": "es2022",
    …
  },
  "angularCompilerOptions": {
    …
    "flatModuleOutFile": "my-ui-lib.js",
    "flatModuleId": "my-ui-lib"
  }
}
```

Once the index file \(for example, `my-ui-lib.js`\) is generated by ngc, bundlers and optimizers like Rollup and Rolldown can be used to produce the flattened ESM file.

### "sideEffects" flag

By default, EcmaScript Modules are side-effectful: importing from a module ensures that any code at the top level of that module should run.
This is often undesirable, as most side-effectful code in typical modules is not truly side-effectful, but instead only affects specific symbols.
If those symbols are not imported and used, it's often desirable to remove them in an optimization process known as tree-shaking, and the side-effectful code can prevent this.

Build tools such as webpack support a flag which allows packages to declare that they do not depend on side-effectful code at the top level of their modules, giving the tools more freedom to tree-shake code from the package.
The end result of these optimizations should be smaller bundle size and better code distribution in bundle chunks after code-splitting.
This optimization can break your code if it contains non-local side-effects - this is however not common in Angular applications and it's usually a sign of bad design.
The recommendation is for all packages to claim the side-effect free status by setting the `sideEffects` property to `false`, and that developers follow the Angular Style Guide which naturally results in code without non-local side-effects.

More info: webpack docs on side effects

### ES2022 language level

ES2022 Language level is now the default language level that is consumed by Angular CLI and other tooling.
The Angular CLI down-levels the bundle to a language level that is supported by all targeted browsers at application build time.

### Flattening of Type Definitions (`.d.ts` bundling)

As of APF v8, it is recommended to bundle TypeScript definitions.
Bundling of type definitions can significantly speed up compilations for users, especially if there are many individual `.ts` source files in your library.

Angular uses `rolldown-plugin-dts` to flatten `.d.ts` files (using `rolldown`, similar to how FESM files are created).

Using rolldown for `.d.ts` bundling is beneficial as it supports code splitting between entry-points.
For example, consider you have multiple entrypoints relying on the same shared type, a shared `.d.ts` file would be created along with the larger flattened `.d.ts` files.
This is desirable and avoids duplication of types.

### Tslib

As of APF v10, it is recommended to add tslib as a direct dependency of your primary entry-point.
This is because the tslib version is tied to the TypeScript version used to compile your library.

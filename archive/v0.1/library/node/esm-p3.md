---
title: "Modules: ECMAScript modules (part 3 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/esm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: ECMAScript modules (part 3 of 5)

## Resolution and loading algorithm

### Features

The default resolver has the following properties:

* FileURL-based resolution as is used by ES modules
* Relative and absolute URL resolution
* No default extensions
* No folder mains
* Bare specifier package resolution lookup through node\_modules
* Does not fail on unknown extensions or protocols
* Can optionally provide a hint of the format to the loading phase

The default loader has the following properties

* Support for builtin module loading via `node:` URLs
* Support for "inline" module loading via `data:` URLs
* Support for `file:` module loading
* Fails on any other URL protocol
* Fails on unknown extensions for `file:` loading
  (supports only `.cjs`, `.js`, and `.mjs`)

When the `--experimental-package-map` flag is enabled, bare specifier
resolution first consults the package map configuration. If the importing
module is within a mapped package and the specifier matches a declared
dependency, the package map resolution takes precedence. See Package maps
for details.

### Resolution algorithm

The algorithm to load an ES module specifier is given through the
**ESM\_RESOLVE** method below. It returns the resolved URL for a
module specifier relative to a parentURL.

The resolution algorithm determines the full resolved URL for a module
load, along with its suggested module format. The resolution algorithm
does not determine whether the resolved URL protocol can be loaded,
or whether the file extensions are permitted, instead these validations
are applied by Node.js during the load phase
(for example, if it was asked to load a URL that has a protocol that is
not `file:`, `data:` or `node:`.

The algorithm also tries to determine the format of the file based
on the extension (see `ESM_FILE_FORMAT` algorithm below). If it does
not recognize the file extension (eg if it is not `.mjs`, `.cjs`, or
`.json`), then a format of `undefined` is returned,
which will throw during the load phase.

The algorithm to determine the module format of a resolved URL is
provided by **ESM\_FILE\_FORMAT**, which returns the unique module
format for any file. The _"module"_ format is returned for an ECMAScript
Module, while the _"commonjs"_ format is used to indicate loading through the
legacy CommonJS loader. Additional formats such as _"addon"_ can be extended in
future updates.

In the following algorithms, all subroutine errors are propagated as errors
of these top-level routines unless stated otherwise.

_defaultConditions_ is the conditional environment name array,
`["node", "import"]`.

The resolver can throw the following errors:

* _Invalid Module Specifier_: Module specifier is an invalid URL, package name
  or package subpath specifier.
* _Invalid Package Configuration_: package.json configuration is invalid or
  contains an invalid configuration.
* _Invalid Package Target_: Package exports or imports define a target module
  for the package that is an invalid type or string target.
* _Package Path Not Exported_: Package exports do not define or permit a target
  subpath in the package for the given module.
* _Package Import Not Defined_: Package imports do not define the specifier.
* _Module Not Found_: The package or module requested does not exist.
* _Unsupported Directory Import_: The resolved path corresponds to a directory,
  which is not a supported target for module imports.

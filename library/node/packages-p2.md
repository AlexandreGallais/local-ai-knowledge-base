---
title: "Modules: Packages (part 2 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/packages.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: Packages (part 2 of 4)

## Package entry points

In a package's `package.json` file, two fields can define entry points for a
package: `"main"` and `"exports"`. Both fields apply to both ES module
and CommonJS module entry points.

The `"main"` field is supported in all versions of Node.js, but its
capabilities are limited: it only defines the main entry point of the package.

The `"exports"` provides a modern alternative to `"main"` allowing
multiple entry points to be defined, conditional entry resolution support
between environments, and **preventing any other entry points besides those
defined in `"exports"`**. This encapsulation allows module authors to
clearly define the public interface for their package.

For new packages targeting the currently supported versions of Node.js, the
`"exports"` field is recommended. For packages supporting Node.js 10 and
below, the `"main"` field is required. If both `"exports"` and
`"main"` are defined, the `"exports"` field takes precedence over
`"main"` in supported versions of Node.js.

Conditional exports can be used within `"exports"` to define different
package entry points per environment, including whether the package is
referenced via `require` or via `import`. For more information about supporting
both CommonJS and ES modules in a single package please consult
the dual CommonJS/ES module packages section.

Existing packages introducing the `"exports"` field will prevent consumers
of the package from using any entry points that are not defined, including the
`package.json` (e.g. `require('your-package/package.json')`). **This will
likely be a breaking change.**

To make the introduction of `"exports"` non-breaking, ensure that every
previously supported entry point is exported. It is best to explicitly specify
entry points so that the package's public API is well-defined. For example,
a project that previously exported `main`, `lib`,
`feature`, and the `package.json` could use the following `package.exports`:

```json
{
  "name": "my-package",
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./lib/index": "./lib/index.js",
    "./lib/index.js": "./lib/index.js",
    "./feature": "./feature/index.js",
    "./feature/index": "./feature/index.js",
    "./feature/index.js": "./feature/index.js",
    "./package.json": "./package.json"
  }
}
```

Alternatively a project could choose to export entire folders both with and
without extensioned subpaths using export patterns:

```json
{
  "name": "my-package",
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./lib/*": "./lib/*.js",
    "./lib/*.js": "./lib/*.js",
    "./feature": "./feature/index.js",
    "./feature/*": "./feature/*.js",
    "./feature/*.js": "./feature/*.js",
    "./package.json": "./package.json"
  }
}
```

With the above providing backwards-compatibility for any minor package versions,
a future major change for the package can then properly restrict the exports
to only the specific feature exports exposed:

```json
{
  "name": "my-package",
  "exports": {
    ".": "./lib/index.js",
    "./feature/*.js": "./feature/*.js",
    "./feature/internal/*": null
  }
}
```

### Main entry point export

When writing a new package, it is recommended to use the `"exports"` field:

```json
{
  "exports": "./index.js"
}
```

When the `"exports"` field is defined, all subpaths of the package are
encapsulated and no longer available to importers. For example,
`require('pkg/subpath.js')` throws an `ERR_PACKAGE_PATH_NOT_EXPORTED`
error.

This encapsulation of exports provides more reliable guarantees
about package interfaces for tools and when handling semver upgrades for a
package. It is not a strong encapsulation since a direct require of any
absolute subpath of the package such as
`require('/path/to/node_modules/pkg/subpath.js')` will still load `subpath.js`.

All currently supported versions of Node.js and modern build tools support the
`"exports"` field. For projects using an older version of Node.js or a related
build tool, compatibility can be achieved by including the `"main"` field
alongside `"exports"` pointing to the same module:

```json
{
  "main": "./index.js",
  "exports": "./index.js"
}
```

### Subpath exports

When using the `"exports"` field, custom subpaths can be defined along
with the main entry point by treating the main entry point as the
`"."` subpath:

```json
{
  "exports": {
    ".": "./index.js",
    "./submodule.js": "./src/submodule.js"
  }
}
```

Now only the defined subpath in `"exports"` can be imported by a consumer:

```js
import submodule from 'es-module-package/submodule.js';
// Loads ./node_modules/es-module-package/src/submodule.js
```

While other subpaths will error:

```js
import submodule from 'es-module-package/private-module.js';
// Throws ERR_PACKAGE_PATH_NOT_EXPORTED
```

#### Extensions in subpaths

Package authors should provide either extensioned (`import 'pkg/subpath.js'`) or
extensionless (`import 'pkg/subpath'`) subpaths in their exports. This ensures
that there is only one subpath for each exported module so that all dependents
import the same consistent specifier, keeping the package contract clear for
consumers and simplifying package subpath completions.

Traditionally, packages tended to use the extensionless style, which has the
benefits of readability and of masking the true path of the file within the
package.

With import maps now providing a standard for package resolution in browsers
and other JavaScript runtimes, using the extensionless style can result in
bloated import map definitions. Explicit file extensions can avoid this issue by
enabling the import map to utilize a packages folder mapping to map multiple
subpaths where possible instead of a separate map entry per package subpath
export. This also mirrors the requirement of using the full specifier path
in relative and absolute import specifiers.

#### Path Rules and Validation for Export Targets

When defining paths as targets in the `"exports"` field, Node.js enforces
several rules to ensure security, predictability, and proper encapsulation.
Understanding these rules is crucial for authors publishing packages.

##### Targets must be relative URLs

All target paths in the `"exports"` map (the values associated with export
keys) must be relative URL strings starting with `./`.

```json
// package.json
{
  "name": "my-package",
  "exports": {
    ".": "./dist/main.js",          // Correct
    "./feature": "./lib/feature.js", // Correct
    // "./origin-relative": "/dist/main.js", // Incorrect: Must start with ./
    // "./absolute": "file:///dev/null", // Incorrect: Must start with ./
    // "./outside": "../common/util.js" // Incorrect: Must start with ./
  }
}
```

Reasons for this behavior include:

* **Security:** Prevents exporting arbitrary files from outside the
  package's own directory.
* **Encapsulation:** Ensures all exported paths are resolved relative to
  the package root, making the package self-contained.

##### No path traversal or invalid segments

Export targets must not resolve to a location outside the package's root
directory. Additionally, path segments like `.` (single dot), `..` (double dot),
or `node_modules` (and their URL-encoded equivalents) are generally disallowed
within the `target` string after the initial `./` and in any `subpath` part
substituted into a target pattern.

```json
// package.json
{
  "name": "my-package",
  "exports": {
    // ".": "./dist/../../elsewhere/file.js", // Invalid: path traversal
    // ".": "././dist/main.js",             // Invalid: contains "." segment
    // ".": "./dist/../dist/main.js",       // Invalid: contains ".." segment
    // "./utils/./helper.js": "./utils/helper.js" // Key has invalid segment
  }
}
```

### Exports sugar

If the `"."` export is the only export, the `"exports"` field provides sugar
for this case being the direct `"exports"` field value.

```json
{
  "exports": {
    ".": "./index.js"
  }
}
```

can be written:

```json
{
  "exports": "./index.js"
}
```

### Subpath imports

In addition to the `"exports"` field, there is a package `"imports"` field
to create private mappings that only apply to import specifiers from within the
package itself.

Entries in the `"imports"` field must always start with `#` to ensure they are
disambiguated from external package specifiers.

For example, the imports field can be used to gain the benefits of conditional
exports for internal modules:

```json
// package.json
{
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    }
  },
  "dependencies": {
    "dep-node-native": "^1.0.0"
  }
}
```

where `import '#dep'` does not get the resolution of the external package
`dep-node-native` (including its exports in turn), and instead gets the local
file `./dep-polyfill.js` relative to the package in other environments.

Unlike the `"exports"` field, the `"imports"` field permits mapping to external
packages.

The resolution rules for the imports field are otherwise analogous to the
exports field.

### Subpath patterns

For packages with a small number of exports or imports, we recommend
explicitly listing each exports subpath entry. But for packages that have
large numbers of subpaths, this might cause `package.json` bloat and
maintenance issues.

For these use cases, subpath export patterns can be used instead:

```json
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/*.js": "./src/features/*.js"
  },
  "imports": {
    "#internal/*.js": "./src/internal/*.js"
  }
}
```

**`*` maps expose nested subpaths as it is a string replacement syntax
only.**

All instances of `*` on the right hand side will then be replaced with this
value, including if it contains any `/` separators.

```js
import featureX from 'es-module-package/features/x.js';
// Loads ./node_modules/es-module-package/src/features/x.js

import featureY from 'es-module-package/features/y/y.js';
// Loads ./node_modules/es-module-package/src/features/y/y.js

import internalZ from '#internal/z.js';
// Loads ./src/internal/z.js
```

This is a direct static matching and replacement without any special handling
for file extensions. Including the `"*.js"` on both sides of the mapping
restricts the exposed package exports to only JS files.

The property of exports being statically enumerable is maintained with exports
patterns since the individual exports for a package can be determined by
treating the right hand side target pattern as a `**` glob against the list of
files within the package. Because `node_modules` paths are forbidden in exports
targets, this expansion is dependent on only the files of the package itself.

To exclude private subfolders from patterns, `null` targets can be used:

```json
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/*.js": "./src/features/*.js",
    "./features/private-internal/*": null
  }
}
```

```js
import featureInternal from 'es-module-package/features/private-internal/m.js';
// Throws: ERR_PACKAGE_PATH_NOT_EXPORTED

import featureX from 'es-module-package/features/x.js';
// Loads ./node_modules/es-module-package/src/features/x.js
```

### Conditional exports

Conditional exports provide a way to map to different paths depending on
certain conditions. They are supported for both CommonJS and ES module imports.

For example, a package that wants to provide different ES module exports for
`require()` and `import` can be written:

```json
// package.json
{
  "exports": {
    "import": "./index-module.js",
    "require": "./index-require.cjs"
  },
  "type": "module"
}
```

Node.js implements the following conditions, listed in order from most
specific to least specific as conditions should be defined:

* `"node-addons"` - similar to `"node"` and matches for any Node.js environment.
  This condition can be used to provide an entry point which uses native C++
  addons as opposed to an entry point which is more universal and doesn't rely
  on native addons. This condition can be disabled via the
  `--no-addons` flag.
* `"node"` - matches for any Node.js environment. Can be a CommonJS or ES
  module file. _In most cases explicitly calling out the Node.js platform is
  not necessary._
* `"import"` - matches when the package is loaded via `import` or
  `import()`, or via any top-level import or resolve operation by the
  ECMAScript module loader. Applies regardless of the module format of the
  target file. _Always mutually exclusive with `"require"`._
* `"require"` - matches when the package is loaded via `require()`. The
  referenced file should be loadable with `require()` although the condition
  matches regardless of the module format of the target file. Expected
  formats include CommonJS, JSON, native addons, and ES modules. _Always mutually
  exclusive with `"import"`._
* `"module-sync"` - matches no matter the package is loaded via `import`,
  `import()` or `require()`. The format is expected to be ES modules that does
  not contain top-level await in its module graph - if it does,
  `ERR_REQUIRE_ASYNC_MODULE` will be thrown when the module is `require()`-ed.
* `"default"` - the generic fallback that always matches. Can be a CommonJS
  or ES module file. _This condition should always come last._

Within the `"exports"` object, key order is significant. During condition
matching, earlier entries have higher priority and take precedence over later
entries. _The general rule is that conditions should be from most specific to
least specific in object order_.

Using the `"import"` and `"require"` conditions can lead to some hazards,
which are further explained in the dual CommonJS/ES module packages section.

The `"node-addons"` condition can be used to provide an entry point which
uses native C++ addons. However, this condition can be disabled via the
`--no-addons` flag. When using `"node-addons"`, it's recommended to treat
`"default"` as an enhancement that provides a more universal entry point, e.g.
using WebAssembly instead of a native addon.

Conditional exports can also be extended to exports subpaths, for example:

```json
{
  "exports": {
    ".": "./index.js",
    "./feature.js": {
      "node": "./feature-node.js",
      "default": "./feature.js"
    }
  }
}
```

Defines a package where `require('pkg/feature.js')` and
`import 'pkg/feature.js'` could provide different implementations between
Node.js and other JS environments.

When using environment branches, always include a `"default"` condition where
possible. Providing a `"default"` condition ensures that any unknown JS
environments are able to use this universal implementation, which helps avoid
these JS environments from having to pretend to be existing environments in
order to support packages with conditional exports. For this reason, using
`"node"` and `"default"` condition branches is usually preferable to using
`"node"` and `"browser"` condition branches.

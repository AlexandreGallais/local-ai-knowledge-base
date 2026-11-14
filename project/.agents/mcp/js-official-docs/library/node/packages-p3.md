---
title: "Modules: Packages (part 3 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/packages.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: Packages (part 3 of 4)

### Nested conditions

In addition to direct mappings, Node.js also supports nested condition objects.

For example, to define a package that only has dual mode entry points for
use in Node.js but not the browser:

```json
{
  "exports": {
    "node": {
      "import": "./feature-node.mjs",
      "require": "./feature-node.cjs"
    },
    "default": "./feature.mjs"
  }
}
```

Conditions continue to be matched in order as with flat conditions. If
a nested condition does not have any mapping it will continue checking
the remaining conditions of the parent condition. In this way nested
conditions behave analogously to nested JavaScript `if` statements.

### Resolving user conditions

When running Node.js, custom user conditions can be added with the
`--conditions` flag:

```bash
node --conditions=development index.js
```

which would then resolve the `"development"` condition in package imports and
exports, while resolving the existing `"node"`, `"node-addons"`, `"default"`,
`"import"`, and `"require"` conditions as appropriate.

Any number of custom conditions can be set with repeat flags.

Typical conditions should only contain alphanumerical characters,
using ":", "-", or "=" as separators if necessary. Anything else may run
into compatibility issues outside of node.

In node, conditions have very few restrictions, but specifically these include:

1. They must contain at least one character.
2. They cannot start with "." since they may appear in places that also
   allow relative paths.
3. They cannot contain "," since they may be parsed as a comma-separated
   list by some CLI tools.
4. They cannot be integer property keys like "10" since that can have
   unexpected effects on property key <example-value> for JS objects.

### Community Conditions Definitions

Condition strings other than the `"import"`, `"require"`, `"node"`, `"module-sync"`,
`"node-addons"` and `"default"` conditions
implemented in Node.js core are ignored by default.

Other platforms may implement other conditions and user conditions can be
enabled in Node.js via the `--conditions` / `-C` flag.

Since custom package conditions require clear definitions to ensure correct
usage, a list of common known package conditions and their strict definitions
is provided below to assist with ecosystem coordination.

* `"types"` - can be used by typing systems to resolve the typing file for
  the given export. _This condition should always be included first._
* `"browser"` - any web browser environment.
* `"development"` - can be used to define a development-only environment
  entry point, for example to provide additional debugging context such as
  better error messages when running in a development mode. _Must always be
  mutually exclusive with `"production"`._
* `"production"` - can be used to define a production environment entry
  point. _Must always be mutually exclusive with `"development"`._

For other runtimes, platform-specific condition key <example-value> are maintained
by the WinterCG in the Runtime Keys proposal specification.

New conditions definitions may be added to this list by creating a pull request
to the Node.js documentation for this section. The requirements for listing
a new condition definition here are that:

* The definition should be clear and unambiguous for all implementers.
* The use case for why the condition is needed should be clearly justified.
* There should exist sufficient existing implementation usage.
* The condition name should not conflict with another condition definition or
  condition in wide usage.
* The listing of the condition definition should provide a coordination
  benefit to the ecosystem that wouldn't otherwise be possible. For example,
  this would not necessarily be the case for company-specific or
  application-specific conditions.
* The condition should be such that a Node.js user would expect it to be in
  Node.js core documentation. The `"types"` condition is a good example: It
  doesn't really belong in the Runtime Keys proposal but is a good fit
  here in the Node.js docs.

The above definitions may be moved to a dedicated conditions registry in due
course.

### Self-referencing a package using its name

Within a package, the values defined in the package's
`package.json` `"exports"` field can be referenced via the package's name.
For example, assuming the `package.json` is:

```json
// package.json
{
  "name": "a-package",
  "exports": {
    ".": "./index.mjs",
    "./foo.js": "./foo.js"
  }
}
```

Then any module _in that package_ can reference an export in the package itself:

```js
// ./a-module.mjs
import { something } from 'a-package'; // Imports "something" from ./index.mjs.
```

Self-referencing is available only if `package.json` has `"exports"`, and
will allow importing only what that `"exports"` (in the `package.json`)
allows. So the code below, given the previous package, will generate a runtime
error:

```js
// ./another-module.mjs

// Imports "another" from ./m.mjs. Fails because
// the "package.json" "exports" field
// does not provide an export named "./m.mjs".
import { another } from 'a-package/m.mjs';
```

Self-referencing is also available when using `require`, both in an ES module,
and in a CommonJS one. For example, this code will also work:

```cjs
// ./a-module.js
const { something } = require('a-package/foo.js'); // Loads from ./foo.js.
```

Finally, self-referencing also works with scoped packages. For example, this
code will also work:

```json
// package.json
{
  "name": "@my/package",
  "exports": "./index.js"
}
```

```cjs
// ./index.js
module.exports = 42;
```

```cjs
// ./other.js
console.log(require('@my/package'));
```

```console
$ node other.js
42
```

## Dual CommonJS/ES module packages

See the package examples repository for details.

## Package maps

> Stability: 1 - Experimental. Enable this API with `--experimental-package-map`.

Package maps provide a mechanism to control package resolution without relying
on the `node_modules` folder structure. When enabled via the
`--experimental-package-map` flag, Node.js uses a JSON configuration file
to determine how bare specifiers are resolved.

This feature is useful for:

* **Monorepos**: Define explicit dependency relationships between workspace
  packages without symlinks or hoisting complexities.
* **Dependency isolation**: Prevent packages from accessing undeclared
  dependencies (phantom dependencies).
* **Low file system coupling**: The package resolution algorithm runs without
  inspecting the file system, relying instead on static data tables.

### Configuration file format

The package map configuration file is a JSON file with a `packages` object.
Each key in `packages` is called a package ID and is a unique identifier for a package entry:

```json
{
  "packages": {
    "app": {
      "url": "./packages/app",
      "dependencies": {
        "@myorg/utils": "utils",
        "@myorg/ui-lib": "ui-lib"
      }
    },
    "utils": {
      "url": "./packages/utils"
    },
    "ui-lib": {
      "url": "./packages/ui-lib",
      "dependencies": {
        "@myorg/utils": "utils"
      }
    }
  }
}
```

Each package entry has the following fields:

* `url` {string} **Required.** An absolute or relative URL. This is parsed using
  the WHATWG `URL` API, using the configuration file URL as base. Only
  `file:` protocol is supported. Multiple packages are allowed to share the
  same URL; consumers must key <example-value> instances by both module url **and package IDs**
  to differentiate them.
* `dependencies` {Object} An object mapping bare specifiers to package keys.
  Each key is the import name used in source code, and each value is the
  corresponding package key in the `packages` object. Defaults to an empty
  object.

### Resolution algorithm

When a bare specifier is encountered:

1. Node.js determines which package performs the resolution request.
   * If possible the package ID for the importer file should be provided to the resolution algorithm.
   * Failing that, the resolution will check if the file path is within any
     package location decoded from its `url`.
2. If no package ID is provided and the importing file is not within any mapped package, an
   `ERR_PACKAGE_MAP_EXTERNAL_FILE` error is thrown.
3. Node.js looks up the specifier's package name in the importing package's
   `dependencies` object to find the corresponding package key.
4. If found, the resolution algorithm locates the target package location from the
   package's `url` field in the package map.
5. If the specifier is not in `dependencies`, a
   `MODULE_NOT_FOUND` error is thrown.
6. The package location is forwarded to the regular Node.js resolution algorithm to
   finish the resolution (`index.js`, exports field, etc).

More details can be found in the resolution algorithm pseudo-code.

### Multiple package versions

Different packages can depend on different versions of the same package.
Because `dependencies` maps bare specifiers to package keys, two packages
can map the same specifier to different targets:

```json
{
  "packages": {
    "app": {
      "url": "./app",
      "dependencies": {
        "component": "component-v2"
      }
    },
    "legacy": {
      "url": "./legacy",
      "dependencies": {
        "component": "component-v1"
      }
    },
    "component-v1": {
      "url": "./vendor/component-1.0.0"
    },
    "component-v2": {
      "url": "./vendor/component-2.0.0"
    }
  }
}
```

Both `app` and `legacy` can `import 'component'`, but they resolve to
different paths based on their declared dependencies.

### Multiple packages for the same URL

To address complex hoisting situations, multiple packages may share the same
URL, which introduces ambiguity when determining which package an import
originates from:

```json
{
  "packages": {
    "app-old": {
      "url": "./app-old",
      "dependencies": {
        "lib": "lib-old"
      }
    },
    "app-new": {
      "url": "./app-new",
      "dependencies": {
        "lib": "lib-new"
      }
    },
    "lib-old": {
      "url": "./lib",
      "dependencies": {
        "react": "react-15"
      }
    },
    "lib-new": {
      "url": "./lib",
      "dependencies": {
        "react": "react-18"
      }
    }
  }
}
```

In the example above both `lib-old` and `lib-new` use the same `./lib` folder to
store their sources, the only difference being in which version of `react` they'll
access when performing `require` calls or using `import`.

Because multiple package entries share the same URL, resolving a bare specifier
from a file within that URL is ambiguous unless the originating package ID is
known. If the package ID cannot be determined (for example, because the caller
did not propagate it from a previous resolution), Node.js will throw an error
rather than guess.

To support this pattern, implementers must key <example-value> instances by package ID
and propagate it from each resolution result to subsequent resolution requests.
This ensures that when `lib` requires `react`, the runtime knows whether the
request comes from `lib-old` or `lib-new` and can select the correct dependency.

### Interaction with other resolution

Package maps only apply to bare specifiers that are not Node.js builtin
modules. The following cases are not affected by package maps and continue
to use standard resolution:

* Relative paths or URLs (`./` or `../`).
* Absolute paths or URLs.
* Node.js builtin modules (`node:fs`, etc.).

### Limitations

* Package maps must be a single static file; dynamic configuration is not
  supported.
* Circular dependency detection is not performed by the package map resolver.
* The package map file is loaded synchronously at startup.

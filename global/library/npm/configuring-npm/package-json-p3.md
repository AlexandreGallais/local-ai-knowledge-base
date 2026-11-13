---
title: "package.json (part 3 of 3)"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/configuring-npm/package-json.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# package.json (part 3 of 3)

### overrides

If you need to make specific changes to dependencies of your dependencies, for example replacing the version of a dependency with a known security issue, replacing an existing dependency with a fork, or making sure that the same version of a package is used everywhere, then you may add an override.

Overrides provide a way to replace a package in your dependency tree with another version, or another package entirely.
These changes can be scoped as specific or as vague as desired.

Overrides are only considered in the root `package.json` file for a project.
Overrides in installed dependencies (including workspaces) are not considered in dependency tree resolution.
Published packages may dictate their resolutions by pinning dependencies or using `bundleDependencies`.

To make sure the package `@npm/foo` is always installed as version `1.0.0` no matter what version your dependencies rely on:

```json
{
  "overrides": {
    "@npm/foo": "1.0.0"
  }
}
```

Override values can use any specifier that npm accepts for dependencies, including
an exact version, a semver range, a dist-tag, or a replacement specifier such as
`npm:`, `file:`, or a Git URL.

For example, if you only need to enforce a minimum patched release instead of one
exact version, you can use a semver range:

```json
{
  "overrides": {
    "@npm/foo": "^1.0.0"
  }
}
```

The above is a short hand notation, the full object form can be used to allow overriding a package itself as well as a child of the package.
This will cause `@npm/foo` to always be `1.0.0` while also making `@npm/bar` at any depth beyond `@npm/foo` also `1.0.0`:

```json
{
  "overrides": {
    "@npm/foo": {
      ".": "1.0.0",
      "@npm/bar": "1.0.0"
    }
  }
}
```

To only override `@npm/foo` to be `1.0.0` when it's a child (or grandchild, or great grandchild, etc) of the package `@npm/bar`:

```json
{
  "overrides": {
    "@npm/bar": {
      "@npm/foo": "1.0.0"
    }
  }
}
```

Keys can be nested to any arbitrary length.
To override `@npm/foo` only when it's a child of `@npm/bar` and only when `@npm/bar` is a child of `@npm/baz`:

```json
{
  "overrides": {
    "@npm/baz": {
      "@npm/bar": {
        "@npm/foo": "1.0.0"
      }
    }
  }
}
```

The key of an override can also include a version, or range of versions.
To override `@npm/foo` to `1.0.0`, but only when it's a child of `@npm/user@example.com`:

```json
{
  "overrides": {
    "@npm/user@example.com": {
      "@npm/foo": "1.0.0"
    }
  }
}
```

You may not set an override for a package that you directly depend on unless both the dependency and the override itself share the exact same spec.
To make this limitation easier to deal with, overrides may also be defined as a reference to a spec for a direct dependency by prefixing the name of the package you wish the version to match with a `$`.

```json
{
  "dependencies": {
    "@npm/foo": "^1.0.0"
  },
  "overrides": {
    // BAD, will throw an EOVERRIDE error
    // "foo": "^2.0.0"
    // GOOD, specs match so override is allowed
    // "foo": "^1.0.0"
    // BEST, the override is defined as a reference to the dependency
    "@npm/foo": "$foo",
    // the referenced package does not need to match the overridden one
    "@npm/bar": "$foo"
  }
}
```

#### Replacing a dependency with a fork

You can replace a package with a different package or fork using several methods:

**Using the `npm:` prefix to replace with a different package name:**

```json
{
  "overrides": {
    "package-name": "npm:@scope/user@example.com"
  }
}
```

**Using a GitHub repository (supports branches, tags, or commit hashes):**

```json
{
  "overrides": {
    "package-name": "github:username/repo#branch-name"
  }
}
```

**Using a local file path:**

```json
{
  "overrides": {
    "package-name": "file:../local-fork"
  }
}
```

These replacement methods work for both top-level overrides and nested overrides.
For example, to replace a transitive dependency with a fork:

```json
{
  "overrides": {
    "parent-package": {
      "vulnerable-dep": "github:username/patched-fork#v2.0.1"
    }
  }
}
```

### packageExtensions

`packageExtensions` lets a project apply small, declarative repairs to the manifests of third-party dependencies before npm resolves the dependency tree.
Use it to add a missing `dependencies`, `optionalDependencies`, or `peerDependencies` entry, or to correct `peerDependencies` and `peerDependenciesMeta`, while you wait for the upstream package to publish a fix.

This is especially useful with `install-strategy=linked`, where dependencies are fully isolated and a package only sees what it actually declared.
A package that worked under a hoisted layout because a dependency happened to be hoisted above it can fail under `linked`; `packageExtensions` records the missing edge as explicit, reviewable, root-owned policy.

`packageExtensions` complements `overrides`: `overrides` changes what an existing dependency edge resolves to, while `packageExtensions` adds or corrects the dependency metadata that creates the edge in the first place.
For changing the resolved version of a dependency that is already declared, use `overrides`.

Like `overrides`, `packageExtensions` is only honored in the root `package.json` of a project (the workspace root in a workspace).
The field in installed dependencies and in non-root workspace packages is ignored.
Because it is root-only project policy, npm refuses to publish a non-private package that contains `packageExtensions`; it remains available to private packages and unpublished local projects.

Each key is a package selector: a package name with an optional semver range.

```json
{
  "packageExtensions": {
    "broken-package@1": {
      "dependencies": {
        "missing-runtime-dep": "^2.0.0"
      }
    },
    "user@example.com": {
      "peerDependencies": {
        "typescript": ">=5"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "@scope/uses-types@2": {
      "dependencies": {
        "@types/node": "^22.0.0"
      }
    }
  }
}
```

- `"foo"` matches all versions of `foo`.
- `"foo@1"` matches versions satisfying `1`.
- `"@scope/foo@^2.3.0"` matches versions satisfying `^2.3.0`.

Selectors match a candidate package's own `name` and `version`. They do not accept dist-tags, git, file, directory, URL, or `npm:` alias specs. For aliases, the selector matches the underlying package name. At most one selector may match a given package; overlapping selectors that both match the same package fail the install.

Only `dependencies`, `optionalDependencies`, `peerDependencies`, and `peerDependenciesMeta` may be extended. The merge rules are:

- `dependencies` and `optionalDependencies` entries add a missing dependency only. Adding a name that the package already declares in either field is an error; use `overrides` to change a version.
- `peerDependencies` entries are merged by name, replacing an existing range.
- `peerDependenciesMeta` entries are merged by name and then by key, so you can add `optional: true` without dropping other metadata. Every `peerDependenciesMeta` entry must correspond to a `peerDependencies` entry.

Deletion is not supported; a `null`, `false`, or `"-"` value is an error.

`packageExtensions` does not rewrite the installed package's `package.json` on disk and does not modify `bundleDependencies`. Affected packages are recorded in `package-lock.json` and surfaced by `npm explain` and `npm ls`, so each repair is easy to audit and to remove once upstream is fixed.

### engines

You can specify the version of node that your stuff works on:

```json
{
  "engines": {
    "node": ">=0.10.3 <15"
  }
}
```

And, like with dependencies, if you don't specify the version (or if you specify "\*" as the version), then any version of node will do.

You can also use the "engines" field to specify which versions of npm are capable of properly installing your program.
For example:

```json
{
  "engines": {
    "npm": "~1.0.20"
  }
}
```

Unless the user has set the `engine-strict` config flag, this field is advisory only and will only produce warnings when your package is installed as a dependency.

### os

You can specify which operating systems your module will run on:

```json
{
  "os": [
    "darwin",
    "linux"
  ]
}
```

You can also block instead of allowing operating systems, just prepend the blocked os with a '!':

```json
{
  "os": [
    "!win32"
  ]
}
```

The host operating system is determined by `process.platform`

It is allowed to both block and allow an item, although there isn't any good reason to do this.

### cpu

If your code only runs on certain cpu architectures, you can specify which ones.

```json
{
  "cpu": [
    "x64",
    "ia32"
  ]
}
```

Like the `os` option, you can also block architectures:

```json
{
  "cpu": [
    "!arm",
    "!mips"
  ]
}
```

The host architecture is determined by `process.arch`

### libc

If your code only runs or builds in certain versions of libc, you can specify which ones.
This field only applies if `os` is `linux`.

```json
{
  "os": "linux",
  "libc": "glibc"
}
```

### devEngines

The `devEngines` field aids engineers working on a codebase to all be using the same tooling.

You can specify a `devEngines` property in your `package.json` which will run before `install`, `ci`, and `run` commands.

> Note: `engines` and `devEngines` differ in object shape.
They also function very differently.
`engines` is designed to alert the user when a dependency uses a different npm or node version than the project it's being used in, whereas `devEngines` is used to alert people interacting with the source code of a project.

The supported keys under the `devEngines` property are `cpu`, `os`, `libc`, `runtime`, and `packageManager`.
Each property can be an object or an array of objects.
Objects must contain `name`, and optionally can specify `version`, and `onFail`.
`onFail` can be `warn`, `error`, or `ignore`, and if left undefined is of the same value as `error`.
`npm` will assume that you're running with `node`.
Here's an example of a project that will fail if the environment is not `node` and `npm`.
If you set `runtime.name` or `packageManager.name` to any other string, it will fail within the npm CLI.

```json
{
  "devEngines": {
    "runtime": {
      "name": "node",
      "onFail": "error"
    },
    "packageManager": {
      "name": "npm",
      "onFail": "error"
    }
  }
}
```

### private

If you set `"private": true` in your package.json, then npm will refuse to publish it.

This is a way to prevent accidental publication of private repositories.
If you would like to ensure that a given package is only ever published to a specific registry (for example, an internal registry), then use the `publishConfig` dictionary described below to override the `registry` config param at publish-time.

### publishConfig

This is a set of config values that will be used at publish-time.
It's especially handy if you want to set the tag, registry or access, so that you can ensure that a given package is not tagged with "latest", published to the global public registry or that a scoped module is private by default.

See `config` to see the list of config options that can be overridden.

### workspaces

The optional `workspaces` field is an array of file patterns that describes locations within the local file system that the install client should look up to find each workspace that needs to be symlinked to the top level `node_modules` folder.

It can describe either the direct paths of the folders to be used as workspaces or it can define globs that will resolve to these same folders.

In the following example, all folders located inside the folder `./packages` will be treated as workspaces as long as they have valid `package.json` files inside them:

```json
{
  "name": "workspace-example",
  "workspaces": [
    "./packages/*"
  ]
}
```

See `workspaces` for more examples.

### DEFAULT VALUES

npm will default some values based on package contents.

* `"scripts": {"start": "node server.js"}`

  If there is a `server.js` file in the root of your package, then npm will default the `start` command to `node server.js`.

* `"scripts":{"install": "node-gyp rebuild"}`

  If there is a `binding.gyp` file in the root of your package and you have not defined an `install` or `preinstall` script, npm will default the `install` command to compile using node-gyp.

* `"contributors": [...]`

  If there is an `AUTHORS` file in the root of your package, npm will treat each line as a `Name <email> (url)` format, where email and url are optional.
  Lines which start with a `#` or are blank, will be ignored.

### SEE ALSO

* semver
* workspaces
* npm init
* npm version
* npm config
* npm help
* npm install
* npm publish
* npm uninstall

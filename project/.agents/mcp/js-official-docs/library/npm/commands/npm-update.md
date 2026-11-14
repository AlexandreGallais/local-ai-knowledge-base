---
title: "npm-update"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-update.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-update

### Description

This command will update all the packages listed to the latest version (specified by the `tag` config), respecting the semver constraints of both your package and its dependencies (if they also require the same package).

It will also install missing packages.

If the `-g` flag is specified, this command will update globally installed packages.

If no package name is specified, all packages in the specified location (global or local) will be updated.

Note that by default `npm update` will not update the semver values of direct dependencies in your project `package.json`.
If you want to also update values in `package.json` you can run: `npm update --save` (or add the `save=true` option to a configuration file to make that the default behavior).

### Example

For the examples below, assume that the current package is `app` and it depends on dependencies, `dep1` (`dep2`, .. etc.).
The published versions of `dep1` are:

```json
{
  "dist-tags": { "latest": "1.2.2" },
  "versions": [
    "1.2.2",
    "1.2.1",
    "1.2.0",
    "1.1.2",
    "1.1.1",
    "1.0.0",
    "0.4.1",
    "0.4.0",
    "0.2.0"
  ]
}
```

#### Caret Dependencies

If `app`'s `package.json` contains:

```json
"dependencies": {
  "dep1": "^1.1.1"
}
```

Then `npm update` will install `user@example.com`, because `1.2.2` is `latest` and
`1.2.2` satisfies `^1.1.1`.

#### Tilde Dependencies

However, if `app`'s `package.json` contains:

```json
"dependencies": {
  "dep1": "~1.1.1"
}
```

In this case, running `npm update` will install `user@example.com`.
Even though the `latest` tag points to `1.2.2`, this version does not satisfy `~1.1.1`, which is equivalent to `>=1.1.1 <1.2.0`.
So the highest-sorting version that satisfies
`~1.1.1` is used, which is `1.1.2`.

#### Caret Dependencies below 1.0.0

Suppose `app` has a caret dependency on a version below `1.0.0`, for example:

```json
"dependencies": {
  "dep1": "^0.2.0"
}
```

`npm update` will install `user@example.com`.

If the dependence were on `^0.4.0`:

```json
"dependencies": {
  "dep1": "^0.4.0"
}
```

Then `npm update` will install `user@example.com`, because that is the highest-sorting version that satisfies `^0.4.0` (`>= 0.4.0 <0.5.0`)

#### Subdependencies

Suppose your app now also has a dependency on `dep2`

```json
{
  "name": "my-app",
  "dependencies": {
      "dep1": "^1.0.0",
      "dep2": "1.0.0"
  }
}
```

and `dep2` itself depends on this limited range of `dep1`

```json
{
"name": "dep2",
  "dependencies": {
    "dep1": "~1.1.1"
  }
}
```

Then `npm update` will install `user@example.com` because that is the highest version that `dep2` allows.
 npm will prioritize having a single version of `dep1` in your tree rather than two when that single version can satisfy the semver requirements of multiple dependencies in your tree.
In this case if you really did need your package to use a newer version you would need to use `npm install`.

#### Updating Globally-Installed Packages

`npm update -g` will apply the `update` action to each globally installed package that is `outdated` -- that is, has a version that is different from `wanted`.

Note: Globally installed packages do not have a `package.json` semver range available, so their `wanted` version is `latest`.

NOTE: If a package has been upgraded to a version newer than `latest`, it will be _downgraded_.

### See Also

* npm install
* npm outdated
* npm registry
* npm folders
* npm ls

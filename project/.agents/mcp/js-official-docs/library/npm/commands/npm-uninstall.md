---
title: "npm-uninstall"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-uninstall.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-uninstall

### Description

This uninstalls a package, completely removing everything npm installed on its behalf.

It also removes the package from the `dependencies`, `devDependencies`,
`optionalDependencies`, and `peerDependencies` objects in your `package.json`.

Further, if you have a `package-lock.json`, npm will update that file as well.

`--no-save` will tell npm not to remove the package from your `package.json` or `package-lock.json` files.

`--save` or `-S` will tell npm to remove the package from your `package.json` and `package-lock.json` files.
This is the default, but you may need to use this if you have for instance `save=false` in your `npmrc` file

In global mode (ie, with `-g` or `--global` appended to the command), it uninstalls the current package context as a global package.
`--no-save` is ignored in this case.

Scope is optional and follows the usual rules for `scope`.

### Examples

```bash
npm uninstall sax
```

`sax` will no longer be in your `package.json` or `package-lock.json` files.

```bash
npm uninstall lodash --no-save
```

`lodash` will not be removed from your `package.json` or
`package-lock.json` files.

### See Also

* npm prune
* npm install
* npm folders
* npm config
* npmrc

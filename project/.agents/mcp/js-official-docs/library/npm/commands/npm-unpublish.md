---
title: "npm-unpublish"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-unpublish.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-unpublish

### Synopsis

To learn more about how the npm registry treats unpublish, see our unpublish policies.

### Warning

Consider using the `deprecate` command instead, if your intent is to encourage users to upgrade, or if you no longer want to maintain a package.

### Description

This removes a package version from the registry, deleting its entry and removing the tarball.

The npm registry will return an error if you are not logged in.

If you do not specify a package name at all, the name and version to be unpublished will be pulled from the project in the current directory.

If you specify a package name but do not specify a version or if you remove all of a package's versions then the registry will remove the root package entry entirely.

Even if you unpublish a package version, that specific name and version combination can never be reused.
In order to publish the package again, you must use a new version number.
If you unpublish the entire package, you may not publish any new versions of that package until 24 hours have passed.

### See Also

* package spec
* npm deprecate
* npm publish
* npm registry
* npm owner
* npm login

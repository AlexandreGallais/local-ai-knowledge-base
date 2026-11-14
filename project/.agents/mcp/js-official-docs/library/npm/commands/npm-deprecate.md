---
title: "npm-deprecate"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-deprecate.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-deprecate

### Description

This command will update the npm registry entry for a package, providing a deprecation warning to all who attempt to install it.

It works on version ranges as well as specific versions, so you can do something like this:

```bash
npm deprecate my-thing@"< 0.2.3" "critical bug fixed in v0.2.3"
```

SemVer ranges passed to this command are interpreted such that they *do* include prerelease versions.
For example:

```bash
npm deprecate user@example.com "1.x is no longer supported"
```

In this case, a version `user@example.com` will also be deprecated.

You must be the package owner to deprecate something.
See the `owner` and `login` help topics.

To un-deprecate a package, specify an empty string (`""`) for the `message` argument.
Note that you must use double quotes with no space between them to format an empty string.

### See Also

* package spec
* npm publish
* npm registry
* npm owner
* npm login

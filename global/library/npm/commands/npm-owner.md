---
title: "npm-owner"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-owner.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-owner

### Description

Manage ownership of published packages.

* ls: List all the users who have access to modify a package and push new versions.
Handy when you need to know who to bug for help.
* add: Add a new user as a maintainer of a package.
This user is enabled to modify metadata, publish new versions, and add other owners.
* rm: Remove a user from the package owner list.
This immediately revokes their privileges.

Note that there is only one level of access.
Either you can modify a package, or you can't.
Future versions may contain more fine-grained access levels, but that is not implemented at this time.

If you have two-factor authentication enabled with `auth-and-writes` (see `npm-profile`) then you'll need to go through a second factor flow when changing ownership or include an otp on the command line with `--otp`.

### See Also

* package spec
* npm profile
* npm publish
* npm registry
* npm login

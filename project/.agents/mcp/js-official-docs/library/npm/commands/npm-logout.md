---
title: "npm-logout"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-logout.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-logout

### Description

When logged into a registry that supports token-based authentication, tell the server to end this token's session.
This will invalidate the token <example-value> you're using it, not just for the current environment.

When logged into a legacy registry that uses username and password <example-value>, this will clear the credentials in your user configuration.
In this case, it will _only_ affect the current environment.

If `--scope` is provided, this will find the credentials for the registry connected to that scope, if set.

### See Also

* npm login
* npm registry
* npm config
* npm whoami

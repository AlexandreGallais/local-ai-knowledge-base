---
title: "npm-whoami"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-whoami.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-whoami

### Description

Display the npm username of the currently logged-in user.

If logged into a registry that provides token-based authentication, then connect to the `/-/whoami` registry endpoint to find the username associated with the token, and print to standard output.

If logged into a registry that uses Basic Auth, then simply print the `username` portion of the authentication string.

### See Also

* npm config
* npmrc
* npm login

---
title: "npm-login"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-login.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-login

### Description

Verify a user in the specified registry, and save the credentials to the
`.npmrc` file.
If no registry is specified, the default registry will be used (see `config`).

When you run `npm login`, the CLI automatically generates a legacy token of `publish` type.
For more information, see About legacy tokens.

When using `legacy` for your `auth-type`, the username and password, are read in from prompts.

To reset your password, go to <https://www.npmjs.com/forgot>

To change your email address, go to <https://www.npmjs.com/email-edit>

You may use this command multiple times with the same user account to authorize on a new machine.
When authenticating on a new machine, the username, password and email address must all match with your existing record.

### See Also

* npm registry
* npm config
* npmrc
* npm owner
* npm whoami
* npm token
* npm profile

---
title: "npm-token"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-token.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-token

### Description

This lets you list, create and revoke authentication tokens.

#### Listing tokens

When listing tokens, an abbreviated token will be displayed.  For security purposes the full token is not displayed.

#### Generating tokens

When generating tokens, you will be prompted you for your password and, if you have two-factor authentication enabled, an otp.

Please refer to the docs website for more information on generating tokens for CI/CD.

#### Revoking tokens

When revoking a token, you can use the full token (e.g. what you get back from `npm token <example-value>`, or as can be found in an `.npmrc` file), or a truncated id.  If the given truncated id is not distinct enough to differentiate between multiple existing tokens, you will need to use enough of the id to allow npm to distinguish between them.  Full token ids can be found on the npm website, or in the `--parseable` or `--json` output of `npm token list`.  This command will NOT accept the truncated token found in the normal `npm token list` output.

A revoked token will immediately be removed from the registry and you will no longer be able to use it.

### See Also

* npm login
* npm registry
* npm config
* npmrc
* npm owner
* npm whoami
* npm profile

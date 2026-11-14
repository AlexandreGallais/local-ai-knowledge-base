---
title: "npm-org"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-org.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-org

### Example

Add a new developer to an org:

```bash
$ npm org set my-org @mx-smith
```

Add a new admin to an org (or change a developer to an admin):

```bash
$ npm org set my-org @mx-santos admin
```

Remove a user from an org:

```bash
$ npm org rm my-org mx-santos
```

List all users in an org:

```bash
$ npm org ls my-org
```

List all users in JSON format:

```bash
$ npm org ls my-org --json
```

See what role a user has in an org:

```bash
$ npm org ls my-org @mx-santos
```

### Description

You can use the `npm org` commands to manage and view users of an organization.
It supports adding and removing users, changing their roles, listing them, and finding specific ones and their roles.

### See Also

* using orgs
* Documentation on npm Orgs

---
title: "npm-bugs"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-bugs.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-bugs

### Description

This command tries to guess at the likely location of a package's bug tracker URL or the `mailto` URL of the support email, and then tries to open it using the `--browser` config param.
If no package name is provided, it will search for a `package.json` in the current folder and use the `name` property.

### See Also

* npm docs
* npm view
* npm publish
* npm registry
* npm config
* npmrc
* package.json

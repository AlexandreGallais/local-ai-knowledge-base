---
title: "npm-prune"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-prune.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-prune

### Description

This command removes "extraneous" packages.
If a package name is provided, then only packages matching one of the supplied names are removed.

Extraneous packages are those present in the `node_modules` folder that are not listed as any package's dependency list.

If the `--omit=dev` flag is specified or the `NODE_ENV` environment variable is set to `production`, this command will remove the packages specified in your `devDependencies`.

If the `--dry-run` flag is used then no changes will actually be made.

If the `--json` flag is used, then the changes `npm prune` made (or would have made with `--dry-run`) are printed as a JSON object.

In normal operation, extraneous modules are pruned automatically, so you'll only need this command with the `--production` flag.
However, in the real world, operation is not always "normal".  When crashes or mistakes happen, this command can help clean up any resulting garbage.

### See Also

* npm uninstall
* npm folders
* npm ls

---
title: "npm-ls"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-ls.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-ls

### Description

This command will print to stdout all the versions of packages that are installed, as well as their dependencies when `--all` is specified, in a tree structure.

Note: to get a "bottoms up" view of why a given package is included in the tree at all, use `npm explain`.

Positional arguments are `name@version-range` identifiers, which will limit the results to only the paths to the packages named.
Note that nested packages will *also* show the paths to the specified packages.
For example, running `npm ls promzard` in npm's source tree will show:

```bash
npm@@VERSION@ /path/to/npm
└─┬ user@example.com
  └── user@example.com
```

It will print out extraneous, missing, and invalid packages.

If a project specifies git urls for dependencies these are shown in parentheses after the `name@version` to make it easier for users to recognize potential forks of a project.

The tree shown is the logical dependency tree, based on package dependencies, not the physical layout of your `node_modules` folder.

When run as `ll` or `la`, it shows extended information by default.

### See Also

* package spec
* npm explain
* npm config
* npmrc
* npm folders
* npm explain
* npm install
* npm link
* npm prune
* npm outdated
* npm update

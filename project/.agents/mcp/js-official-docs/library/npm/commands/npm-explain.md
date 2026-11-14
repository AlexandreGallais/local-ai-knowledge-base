---
title: "npm-explain"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-explain.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-explain

### Description

This command will print the chain of dependencies causing a given package to be installed in the current project.

If one or more package specs are provided, then only packages matching one of the specifiers will have their relationships explained.

The package spec can also refer to a folder within `./node_modules`

For example, running `npm explain glob` within npm's source tree will show:

```bash
user@example.com
node_modules/glob
  glob@"^7.1.4" from the root project

user@example.com dev
node_modules/tacks/node_modules/glob
  glob@"^7.0.5" from user@example.com
  node_modules/tacks/node_modules/rimraf
    rimraf@"^2.6.2" from user@example.com
    node_modules/tacks
      dev tacks@"^1.3.0" from the root project
```

To explain just the package residing at a specific folder, pass that as the argument to the command.
This can be useful when trying to figure out exactly why a given dependency is being duplicated to satisfy conflicting version requirements within the project.

```bash
$ npm explain node_modules/nyc/node_modules/find-up
user@example.com dev
node_modules/nyc/node_modules/find-up
  find-up@"^3.0.0" from user@example.com
  node_modules/nyc
    nyc@"^14.1.1" from user@example.com
    node_modules/tap
      dev tap@"^14.10.8" from the root project
```

### See Also

* package spec
* npm config
* npmrc
* npm folders
* npm ls
* npm install
* npm link
* npm prune
* npm outdated
* npm update

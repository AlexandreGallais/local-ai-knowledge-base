---
title: "npm-explore"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-explore.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-explore

### Description

Spawn a subshell in the directory of the installed package specified.

If a command is specified, then it is run in the subshell, which then immediately terminates.

This is particularly handy in the case of git submodules in the `node_modules` folder:

```bash
npm explore some-dependency -- git pull origin master
```

Note that the package is *not* automatically rebuilt afterwards, so be sure to use `npm rebuild <pkg>` if you make any changes.

### See Also

* npm folders
* npm edit
* npm rebuild
* npm install

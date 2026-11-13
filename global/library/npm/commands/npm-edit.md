---
title: "npm-edit"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-edit.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-edit

### Description

Selects a dependency in the current project and opens the package folder in the default editor (or whatever you've configured as the npm `editor` config -- see `npm-config`.)

After it has been edited, the package is rebuilt so as to pick up any changes in compiled packages.

For instance, you can do `npm install connect` to install connect into your package, and then `npm edit connect` to make a few changes to your locally installed copy.

### See Also

* npm folders
* npm explore
* npm install
* npm config
* npmrc

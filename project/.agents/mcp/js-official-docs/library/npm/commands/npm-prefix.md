---
title: "npm-prefix"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-prefix.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-prefix

### Description

Print the local prefix to standard output.
This is the closest parent directory to contain a `package.json` file or `node_modules` directory, unless `-g` is also specified.

If `-g` is specified, this will be the value of the global prefix.
See `npm config` for more detail.

### Example

```bash
npm prefix
/usr/local/projects/foo
```

```bash
npm prefix -g
/usr/local
```

### See Also

* npm root
* npm folders
* npm config
* npmrc

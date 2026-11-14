---
title: "npm-pack"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-pack.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-pack

### Description

For anything that's installable (that is, a package folder, tarball, tarball url, git url, name@tag, name@version, name, or scoped name), this command will fetch it to the cache, copy the tarball to the current working directory as `<name>-<version>.tgz`, and then write the filenames out to stdout.

If the same package is specified multiple times, then the file will be overwritten the second time.

If no arguments are supplied, then npm packs the current package folder.

### See Also

* package spec
* npm-packlist package
* npm cache
* npm publish
* npm config
* npmrc

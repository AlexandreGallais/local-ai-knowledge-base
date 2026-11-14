---
title: "npm-search"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-search.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-search

### Description

Search the registry for packages matching the search terms.
`npm search`
performs a linear, incremental, lexically-ordered search through package metadata for all files in the registry.
If your terminal has color support, it will further highlight the matches in the results.
This can be disabled with the config item `color`

Additionally, using the `--searchopts` and `--searchexclude` options paired with more search terms will include and exclude further patterns.
The main difference between `--searchopts` and the standard search terms is that the former does not highlight results in the output and you can use them more fine-grained filtering.
Additionally, you can add both of these to your config to change default search filtering behavior.

Search also allows targeting of maintainers in search results, by prefixing their npm username with `=`.

If a term starts with `/`, then it's interpreted as a regular expression and supports standard JavaScript RegExp syntax.
In this case search will ignore a trailing `/` .  (Note you must escape or quote many regular expression characters in most shells.)

### See Also

* npm registry
* npm config
* npmrc
* npm view
* npm cache
* https://npm.im/npm-registry-fetch

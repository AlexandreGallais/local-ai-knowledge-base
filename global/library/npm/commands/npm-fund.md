---
title: "npm-fund"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-fund.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-fund

### Description

This command retrieves information on how to fund the dependencies of a given project.
If no package name is provided, it will list all dependencies that are looking for funding in a tree structure, listing the type of funding and the url to visit.
If a package name is provided then it tries to open its funding url using the `--browser` config param; if there are multiple funding sources for the package, the user will be instructed to pass the
`--which` option to disambiguate.

The list will avoid duplicated entries and will stack all packages that share the same url as a single entry.
Thus, the list does not have the same shape of the output from `npm ls`.

#### Example

### Workspaces support

It's possible to filter the results to only include a single workspace and its dependencies using the `workspace` config option.

#### Example:

Here's an example running `npm fund` in a project with a configured workspace `a`:

```bash
$ npm fund
user@example.com
+-- https://example.com/a
| | `-- user@example.com
| `-- https://example.com/maintainer
|     `-- user@example.com
+-- https://example.com/npmcli-funding
|   `-- @npmcli/test-funding
`-- https://example.com/org
    `-- user@example.com
```

And here is an example of the expected result when filtering only by a specific workspace `a` in the same project:

```bash
$ npm fund -w a
user@example.com
`-- https://example.com/a
  | `-- user@example.com
  `-- https://example.com/maintainer
      `-- user@example.com
```

## See Also

* package spec
* npm install
* npm docs
* npm ls
* npm config
* npm workspaces

---
title: "npm-dedupe"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-dedupe.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-dedupe

### Description

Searches the local package tree and attempts to simplify the overall structure by moving dependencies further up the tree, where they can be more effectively shared by multiple dependent packages.

For example, consider this dependency graph:

```
a
+-- b <-- depends on user@example.com
|   `-- user@example.com
`-- d <-- depends on c@~1.0.9
    `-- user@example.com
```

In this case, `npm dedupe` will transform the tree to:

```bash
a
+-- b
+-- d
`-- user@example.com
```

Because of the hierarchical nature of node's module lookup, b and d will both get their dependency met by the single c package at the root level of the tree.

In some cases, you may have a dependency graph like this:

```
a
+-- b <-- depends on user@example.com
+-- user@example.com
`-- d <-- depends on user@example.com
    `-- user@example.com
```

During the installation process, the `user@example.com` dependency for `b` was placed in the root of the tree.
Though `d`'s dependency on `user@example.com` could have been satisfied by `user@example.com`, the newer `user@example.com` dependency was used, because npm favors updates by default, even when doing so causes duplication.

Running `npm dedupe` will cause npm to note the duplication and re-evaluate, deleting the nested `c` module, because the one in the root is sufficient.

To prefer deduplication over novelty during the installation process, run `npm install --prefer-dedupe` or `npm config set prefer-dedupe true`.

Arguments are ignored.
Dedupe always acts on the entire tree.

Note that this operation transforms the dependency tree, but will never result in new modules being installed.

Using `npm find-dupes` will run the command in `--dry-run` mode.

Note: `npm dedupe` will never update the semver values of direct dependencies in your project `package.json`, if you want to update values in `package.json` you can run: `npm update --save` instead.

### See Also

* npm find-dupes
* npm ls
* npm update
* npm install

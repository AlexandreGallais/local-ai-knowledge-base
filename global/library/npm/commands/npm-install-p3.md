---
title: "npm-install (part 3 of 3)"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-install.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

# npm-install (part 3 of 3)

The `--tag` argument will apply to all of the specified install targets.
If a tag with the given name exists, the tagged version is preferred over newer versions.

**Note:** The `--tag` option only affects packages specified on the command line. It does not override version ranges specified in `package.json`. For example, if `package.json` specifies `"foo": "^1.0.0"` and you run `npm install --tag beta`, npm will still install a version matching `^1.0.0` even if the `beta` tag points to a different version. To install a tagged version, specify the package explicitly: `npm install foo@beta`.

The `--dry-run` argument will report in the usual way what the install would have done without actually installing anything.

The `--package-lock-only` argument will only update the `package-lock.json`, instead of checking `node_modules` and downloading dependencies.

The `-f` or `--force` argument will force npm to fetch remote resources even if a local copy exists on disk.

```bash
npm install sax --force
```

### Configuration

See the `config` help doc.
Many of the configuration params have some effect on installation, since that's most of what npm does.

These are some of the most common options related to installation.

### Algorithm

Given a `package{dep}` structure: `A{B,C}, B{C}, C{D}`, the npm install algorithm produces:

```bash
A
+-- B
+-- C
+-- D
```

That is, the dependency from B to C is satisfied by the fact that A already caused C to be installed at a higher level.
D is still installed at the top level because nothing conflicts with it.

For `A{B,C}, B{C,D@1}, C{D@2}`, this algorithm produces:

```bash
A
+-- B
+-- C
   `-- D@2
+-- D@1
```

Because B's D@1 will be installed in the top-level, C now has to install D@2 privately for itself.
This algorithm is deterministic, but different trees may be produced if two dependencies are requested for installation in a different order.

See folders for a more detailed description of the specific folder structures that npm creates.

### See Also

* npm folders
* npm update
* npm audit
* npm fund
* npm link
* npm rebuild
* npm scripts
* npm config
* npmrc
* npm registry
* npm dist-tag
* npm uninstall
* package.json
* workspaces

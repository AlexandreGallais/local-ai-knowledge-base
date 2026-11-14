---
title: "npm-deny-scripts"
tool: "npm"
version: "12.2"
source: "https://github.com/npm/cli/blob/60e11343e61316d966c86805d803df5a0eb99230/docs/lib/content/commands/npm-deny-scripts.md"
commit: "60e11343e61316d966c86805d803df5a0eb99230"
license: "Artistic-2.0"
---

### Description

The companion command to `npm approve-scripts`.
Writes `false` entries into the `allowScripts` field of your project's
`package.json`, recording that a dependency must not run install scripts
even if a future version would otherwise be eligible.

Dependency install scripts are blocked by default. Adding a `false`
entry with `deny-scripts` makes the denial explicit (so it survives
`npm approve-scripts --all`) and excludes the package from any future
`--allow-scripts-pending` review prompts.

```bash
npm deny-scripts <pkg> [<pkg> ...]
npm deny-scripts --all
```

`<pkg>` matches every installed version of that package. Denies are always
written name-only (`"pkg": false`), regardless of `--allow-scripts-pin`. Pinning a deny
to a specific version would silently re-allow scripts for any other version
of the same package, which defeats the purpose; the command picks the
safer default for you.

`--all` denies every package with unreviewed install scripts.

If a `true` (pinned or name-only) entry exists for a package and you then
deny it, the existing allow entries are removed so the name-only deny is
unambiguous.

### Examples

```bash
# Deny a specific package outright
npm deny-scripts telemetry-pkg

# Deny everything that has install scripts and isn't already approved
npm deny-scripts --all
```

### See Also

* npm approve-scripts
* npm install
* package.json

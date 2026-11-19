# SEED: electron-upgrade  (DSK-05, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: electron-upgrade
description: "Manual: run only when the user explicitly asks for /electron-upgrade. Upgrades Electron with its Chromium and Node versions - breaking changes read, native modules rebuilt, tests run."
metadata:
  id: DSK-05
  stars: "2"
  nature: process
  mode: D
  wave: V3
  load: manual
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Current and target Electron versions; the breaking changes documents between them.
- [ ] Native modules to rebuild.
- [ ] Deprecated APIs used by the project (grep).
- [ ] Test plan: unit, end-to-end, packaging.

## Known pitfalls to confirm or drop

- Skipping majors hides breaking changes; read each major's notes.

## MCP servers and example queries

- desktop-official-docs: Electron breaking changes, electron-rebuild

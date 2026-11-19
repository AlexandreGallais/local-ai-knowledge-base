# SEED: electron-packaging  (DSK-03, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: electron-packaging
description: "Manual: run only when the user explicitly asks for /electron-packaging. Packages an Electron app for Linux (rpm, AppImage, Flatpak) and Windows with electron-builder or Packager, offline."
metadata:
  id: DSK-03
  stars: "2"
  nature: process
  mode: D
  wave: V3
  load: manual
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Packaging tool used by the project and its version.
- [ ] Targets and their configuration (rpm, AppImage, Flatpak, nsis for Windows).
- [ ] Getting Electron binaries offline (cache, mirror variables).
- [ ] Signing and versioning as the project requires.

## Known pitfalls to confirm or drop

- Packaging downloads Electron binaries from the Internet unless a cache or mirror is set.
- Native modules not rebuilt for the target Electron version.

## MCP servers and example queries

- desktop-official-docs: electron-builder linux targets, ELECTRON_MIRROR, electron-rebuild

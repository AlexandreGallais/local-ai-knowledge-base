# SEED: flatpak-packaging  (DSK-11, 1 stars, V4)

## Final frontmatter (do not change)

```yaml
name: flatpak-packaging
description: "Manual: run only when the user explicitly asks for /flatpak-packaging. Packages an app as a Flatpak - manifest, runtime, sandbox permissions, offline build with flatpak-builder."
metadata:
  id: DSK-11
  stars: "1"
  nature: process
  mode: D
  wave: V4
  load: manual
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Runtimes and SDKs available locally.
- [ ] Manifest structure, modules and sources for an offline build.
- [ ] Sandbox permissions (finish-args) kept minimal.
- [ ] Building and installing locally for testing.

## Known pitfalls to confirm or drop

- Sources fetched from the Internet during the build fail offline; vendor them.
- Over-broad permissions like filesystem=host.

## MCP servers and example queries

- linux-official-docs: flatpak-builder manifest, finish-args
- desktop-official-docs: Electron Flatpak

# SEED: gnome-shell-extensions  (DSK-07, 1 stars, V4)

## Final frontmatter (do not change)

```yaml
name: gnome-shell-extensions
description: "Develops and maintains GNOME Shell extensions in GJS - metadata, supported shell versions, enable and disable, preferences. Use when writing or fixing a GNOME Shell extension, an extension stops working after a GNOME upgrade, or metadata.json shell-version must change."
metadata:
  id: DSK-07
  stars: "1"
  nature: reference
  mode: D
  wave: V4
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed GNOME Shell version and the extension API of that version (ES modules since GNOME 45).
- [ ] metadata.json fields and shell-version.
- [ ] enable and disable lifecycle and cleanup.
- [ ] Testing in a nested session and reading logs (journalctl).

## Known pitfalls to confirm or drop

- Extensions written for the pre-45 import system fail on newer shells.
- Resources not released in disable leak on lock and unlock.

## MCP servers and example queries

- linux-official-docs: GJS, GNOME Shell extensions

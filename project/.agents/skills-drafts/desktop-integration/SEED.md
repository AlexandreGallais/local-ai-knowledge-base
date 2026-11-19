# SEED: desktop-integration  (DSK-09, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: desktop-integration
description: "Integrates a desktop app with GNOME and Fedora - .desktop files, icons, MIME types, notifications, XDG portals. Use when an app needs a menu entry, an icon, file associations, notifications, or file pickers through portals."
metadata:
  id: DSK-09
  stars: "2"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Desktop entry specification fields used here.
- [ ] Icon sizes and locations; MIME type registration.
- [ ] Notifications and portals (file chooser, screenshot).
- [ ] Validation commands (desktop-file-validate).

## Known pitfalls to confirm or drop

- Missing StartupWMClass makes the dock show a generic icon.

## MCP servers and example queries

- linux-official-docs: desktop entry, xdg-desktop-portal FileChooser
- desktop-official-docs: Electron Notification

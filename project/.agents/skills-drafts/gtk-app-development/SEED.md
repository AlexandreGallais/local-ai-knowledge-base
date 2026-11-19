# SEED: gtk-app-development  (DSK-08, 1 stars, V4)

## Final frontmatter (do not change)

```yaml
name: gtk-app-development
description: "Builds GTK 4 and libadwaita applications (C, Python, Rust or GJS) - structure, widgets, signals, Meson build. Use when creating or changing a GTK application, a Blueprint or UI file, or a meson.build for a desktop app."
metadata:
  id: DSK-08
  stars: "1"
  nature: reference
  mode: D
  wave: V4
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed GTK 4 and libadwaita versions and the language bindings used.
- [ ] Application structure (Adw.Application, windows, actions).
- [ ] UI definitions (Blueprint or GtkBuilder XML) and signals.
- [ ] Meson build and running from the build folder.

## Known pitfalls to confirm or drop

- GTK 3 APIs used in GTK 4 code.

## MCP servers and example queries

- linux-official-docs: GTK 4 Gtk.Application, libadwaita, meson

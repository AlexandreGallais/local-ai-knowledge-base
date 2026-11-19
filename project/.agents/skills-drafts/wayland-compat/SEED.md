# SEED: wayland-compat  (DSK-06, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: wayland-compat
description: "Runs desktop apps correctly under Wayland on GNOME - Ozone Wayland or XWayland, flags, HiDPI scaling, clipboard, screenshots. Use when an Electron or GTK app is blurry, does not start, misses the clipboard or screen capture under Wayland, or when choosing Electron Ozone flags."
metadata:
  id: DSK-06
  stars: "3"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Detect the session type (echo $XDG_SESSION_TYPE) and the Electron version.
- [ ] Electron flags for Wayland at that version (ozone platform hint).
- [ ] HiDPI and fractional scaling behaviour.
- [ ] Clipboard and screen capture through portals.

## Known pitfalls to confirm or drop

- Flags that changed name between Electron versions.
- Running GUI apps inside a container without the Wayland socket.

## MCP servers and example queries

- desktop-official-docs: ozone-platform-hint wayland
- linux-official-docs: wayland, xdg-desktop-portal screencast

# SEED: dbus-introspection  (DSK-10, 1 stars, V4)

## Final frontmatter (do not change)

```yaml
name: dbus-introspection
description: "Inspects and calls D-Bus services with busctl or gdbus - list, introspect, call methods, read properties, monitor signals. Use when an app talks to a system service over D-Bus, when debugging portals or desktop services, or when asked what a D-Bus service exposes."
metadata:
  id: DSK-10
  stars: "1"
  nature: reference
  mode: D
  wave: V4
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Session versus system bus.
- [ ] busctl list, introspect, call, get-property, monitor.
- [ ] gdbus equivalents.

## Known pitfalls to confirm or drop

- Calling methods on the system bus may need privileges.

## MCP servers and example queries

- linux-official-docs: busctl, gdbus, D-Bus specification

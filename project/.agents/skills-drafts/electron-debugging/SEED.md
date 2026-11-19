# SEED: electron-debugging  (DSK-04, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: electron-debugging
description: "Debugs Electron apps - DevTools of the renderer, inspecting the main process, logs, crash reports. Use when an Electron window is blank or wrong, the main process crashes, IPC calls fail silently, or you need logs from a packaged app."
metadata:
  id: DSK-04
  stars: "3"
  nature: process
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Opening DevTools and capturing renderer console output.
- [ ] Debugging the main process (--inspect) and reading its logs.
- [ ] ELECTRON_ENABLE_LOGGING and log locations of packaged apps.
- [ ] Crash reports.

## Known pitfalls to confirm or drop

- Debugging only the renderer when the error is in main.

## MCP servers and example queries

- desktop-official-docs: debugging the main process, crashReporter, ELECTRON_ENABLE_LOGGING

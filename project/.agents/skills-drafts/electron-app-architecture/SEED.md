# SEED: electron-app-architecture  (DSK-01, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: electron-app-architecture
description: "Structures Electron apps - main, renderer and preload processes, IPC, contextIsolation, sandbox. Use when creating or changing an Electron app, adding an IPC channel, a preload script or a BrowserWindow, or when code must run in the main versus the renderer process."
metadata:
  id: DSK-01
  stars: "3"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed Electron version from package.json.
- [ ] Process model: main, renderer, preload, utility processes.
- [ ] IPC with ipcMain.handle and ipcRenderer.invoke through contextBridge.
- [ ] Project layout used by the team.

## Known pitfalls to confirm or drop

- Exposing ipcRenderer whole through contextBridge.
- Using Node APIs in the renderer.

## MCP servers and example queries

- desktop-official-docs: process model, contextBridge, ipcMain.handle, BrowserWindow

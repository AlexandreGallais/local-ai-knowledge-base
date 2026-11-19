# SEED: electron-security  (DSK-02, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: electron-security
description: "Applies the Electron security checklist - nodeIntegration off, contextIsolation on, sandbox, CSP, IPC message validation, no remote content. Use when creating a BrowserWindow, writing a preload script, adding an IPC handler, loading content in a window, or reviewing an Electron app."
metadata:
  id: DSK-02
  stars: "3"
  nature: guardrail
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] The checklist items of the Electron security guide at the installed version.
- [ ] webPreferences defaults at the installed version.
- [ ] Validating IPC senders and arguments.
- [ ] Content Security Policy for the renderer.

## Known pitfalls to confirm or drop

- Turning off contextIsolation to make a preload work.
- shell.openExternal with unvalidated URLs.

## MCP servers and example queries

- desktop-official-docs: security checklist, webPreferences, Content-Security-Policy

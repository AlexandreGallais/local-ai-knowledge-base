---
title: "browser.commands | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/browser/commands.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# browser.commands

- **Type:** `Record<string, BrowserCommand>`
- **Default:** `{ readFile, writeFile, ... }`

Custom commands that can be imported during browser tests from `vitest/browser`.

**Security**
Commands run in the Vitest Node process. If a command exposes filesystem, process, network, database, or shell access based on browser-provided input, validate and restrict that input inside the command. Built-in file commands apply Vite `server.fs` checks and write-access checks, but custom commands are responsible for their own protections.

See Custom Commands security notes.

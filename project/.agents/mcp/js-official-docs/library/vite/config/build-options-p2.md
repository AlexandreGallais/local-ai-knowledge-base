---
title: "Build Options (part 2 of 2)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/config/build-options.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Build Options (part 2 of 2)

## build.chunkSizeWarningLimit

- **Type:** `number`
- **Default:** `500`

Limit for chunk size warnings (in kB). It is compared against the uncompressed chunk size as the JavaScript size itself is related to the execution time.

## build.watch

- **Type:** `WatcherOptions``| null`
- **Default:** `null`

Set to `{}` to enable Rolldown watcher. This is mostly used in cases that involve build-only plugins or integrations processes.

**Using Vite on Windows Subsystem for Linux (WSL) 2**

There are cases that file system watching does not work with WSL2.
See `server.watch` for more details.

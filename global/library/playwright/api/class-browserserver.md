---
title: "class: BrowserServer"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-browserserver.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: BrowserServer
* since: v1.8
* langs: js

## event: BrowserServer.close
* since: v1.8

Emitted when the browser server closes.

## async method: BrowserServer.close
* since: v1.8

Closes the browser gracefully and makes sure the process is terminated.

## async method: BrowserServer.kill
* since: v1.8

Kills the browser process and waits for the process to exit.

## method: BrowserServer.process
* since: v1.8
- returns: <[ChildProcess]>

Spawned browser application process.

## method: BrowserServer.wsEndpoint
* since: v1.8
- returns: <[string]>

Browser websocket url.

Browser websocket endpoint which can be used as an argument to [`method: BrowserType.connect`] to establish connection
to the browser.

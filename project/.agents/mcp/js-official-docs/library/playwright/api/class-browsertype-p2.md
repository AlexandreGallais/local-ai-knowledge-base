---
title: "class: BrowserType (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-browsertype.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: BrowserType (part 2 of 2)

## async method: BrowserType.launchServer
* since: v1.8
* langs: js
- returns: <[BrowserServer]>

Returns the browser app instance. You can connect to it via [`method: BrowserType.connect`], which requires the major/minor client/server version to match (1.2.3 → is compatible with 1.2.x).

**Usage**

Launches browser server that client can connect to. An example of launching a browser executable and connecting to it
later:

```js
const { chromium } = require('playwright');  // Or 'webkit' or 'firefox'.

(async () => {
  const browserServer = await chromium.launchServer();
  const wsEndpoint = browserServer.wsEndpoint();
  // Use web socket endpoint later to establish a connection.
  const browser = await chromium.connect(wsEndpoint);
  // Close browser instance.
  await browserServer.close();
})();
```

### option: BrowserType.launchServer.-inline- = %%-shared-browser-options-list-v1.8-%%
* since: v1.8

### option: BrowserType.launchServer.firefoxUserPrefs = %%-js-python-browser-option-firefoxuserprefs-%%
* since: v1.8

### option: BrowserType.launchServer.firefoxUserPrefs2 = %%-csharp-java-browser-option-firefoxuserprefs-%%
* since: v1.8

### option: BrowserType.launchServer.logger = %%-browser-option-logger-%%
* since: v1.8

### option: BrowserType.launchServer.host
* since: v1.45
- `host` <[string]>

Host to use for the web socket. It is optional and defaults to `localhost`, accepting connections only from the loopback interface. Pass an explicit address (e.g. `0.0.0.0`) to accept connections from the network — be aware this exposes the browser RPC to anything that can reach the listening port.

### option: BrowserType.launchServer.port
* since: v1.8
- `port` <[int]>

Port to use for the web socket. Defaults to 0 that picks any available port.

### option: BrowserType.launchServer.wsPath
* since: v1.15
- `wsPath` <[string]>

Path at which to serve the Browser Server. For security, this defaults to an
unguessable string.

:::warning
Any process or web page (including those running in Playwright) with knowledge
of the `wsPath` can take control of the OS user. For this reason, you should
use an unguessable token when using this option.
:::

## method: BrowserType.name
* since: v1.8
- returns: <[string]>

Returns browser name. For example: `'chromium'`, `'webkit'` or `'firefox'`.

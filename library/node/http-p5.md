---
title: "HTTP (part 5 of 12)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/http.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# HTTP (part 5 of 12)

### `server.keepAliveTimeoutBuffer`

* Type: {number} Timeout in milliseconds. **Default:** `1000` (1 second).

An additional buffer time added to the
`server.keepAliveTimeout` to extend the internal socket timeout.

This buffer helps reduce connection reset (`ECONNRESET`) errors by increasing
the socket timeout slightly beyond the advertised keep-alive timeout.

This option applies only to new incoming connections.

### `serverSymbol.asyncDispose`

Calls `server.close()` and returns a promise that fulfills when the
server has closed.

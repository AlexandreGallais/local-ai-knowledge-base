---
title: "Inspector (part 2 of 2)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/inspector.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Inspector (part 2 of 2)

## Integration with DevTools

> Stability: 1.1 - Active development

The `node:inspector` module provides an API for integrating with devtools that support Chrome DevTools Protocol.
DevTools frontends connected to a running Node.js instance can capture protocol events emitted from the instance
and display them accordingly to facilitate debugging.
The following methods broadcast a protocol event to all connected frontends.
The `params` passed to the methods can be optional, depending on the protocol.

```js
// The `Network.requestWillBeSent` event will be fired.
inspector.Network.requestWillBeSent({
  requestId: 'request-id-1',
  timestamp: Date.now() / 1000,
  wallTime: Date.now(),
  request: {
    url: 'https://nodejs.org/en',
    method: 'GET',
  },
});
```

### `inspector.Network.dataReceived([params])`

* `params` {Object}

This feature is only available with the `--experimental-network-inspection` flag enabled.

Broadcasts the `Network.dataReceived` event to connected frontends, or buffers the data if
`Network.streamResourceContent` command was not invoked for the given request yet.

Also enables `Network.getResponseBody` command to retrieve the response data.

### `inspector.Network.dataSent([params])`

* `params` {Object}

This feature is only available with the `--experimental-network-inspection` flag enabled.

Enables `Network.getRequestPostData` command to retrieve the request data.

### `inspector.Network.requestWillBeSent([params])`

* `params` {Object}

This feature is only available with the `--experimental-network-inspection` flag enabled.

Broadcasts the `Network.requestWillBeSent` event to connected frontends. This event indicates that
the application is about to send an HTTP request.

### `inspector.Network.responseReceived([params])`

* `params` {Object}

This feature is only available with the `--experimental-network-inspection` flag enabled.

Broadcasts the `Network.responseReceived` event to connected frontends. This event indicates that
HTTP response is available.

### `inspector.Network.loadingFinished([params])`

* `params` {Object}

This feature is only available with the `--experimental-network-inspection` flag enabled.

Broadcasts the `Network.loadingFinished` event to connected frontends. This event indicates that
HTTP request has finished loading.

### `inspector.Network.loadingFailed([params])`

* `params` {Object}

This feature is only available with the `--experimental-network-inspection` flag enabled.

Broadcasts the `Network.loadingFailed` event to connected frontends. This event indicates that
HTTP request has failed to load.

### `inspector.Network.webSocketCreated([params])`

* `params` {Object}

This feature is only available with the `--experimental-network-inspection` flag enabled.

Broadcasts the `Network.webSocketCreated` event to connected frontends. This event indicates that
a WebSocket connection has been initiated.

### `inspector.Network.webSocketHandshakeResponseReceived([params])`

* `params` {Object}

This feature is only available with the `--experimental-network-inspection` flag enabled.

Broadcasts the `Network.webSocketHandshakeResponseReceived` event to connected frontends.
This event indicates that the WebSocket handshake response has been received.

### `inspector.Network.webSocketClosed([params])`

* `params` {Object}

This feature is only available with the `--experimental-network-inspection` flag enabled.

Broadcasts the `Network.webSocketClosed` event to connected frontends.
This event indicates that a WebSocket connection has been closed.

### `inspector.NetworkResources.put`

> Stability: 1.1 - Active Development

This feature is only available with the `--experimental-inspector-network-resource` flag enabled.

The inspector.NetworkResources.put method is used to provide a response for a loadNetworkResource
request issued via the Chrome DevTools Protocol (CDP).
This is typically triggered when a source map is specified by URL, and a DevTools frontend—such as
Chrome—requests the resource to retrieve the source map.

This method allows developers to predefine the resource content to be served in response to such CDP requests.

```js
const inspector = require('node:inspector');
// By preemptively calling put to register the resource, a source map can be resolved when
// a loadNetworkResource request is made from the frontend.
async function setNetworkResources() {
  const mapUrl = 'http://localhost:3000/dist/app.js.map';
  const tsUrl = 'http://localhost:3000/src/app.ts';
  const distAppJsMap = await fetch(mapUrl).then((res) => res.text());
  const srcAppTs = await fetch(tsUrl).then((res) => res.text());
  inspector.NetworkResources.put(mapUrl, distAppJsMap);
  inspector.NetworkResources.put(tsUrl, srcAppTs);
};
setNetworkResources().then(() => {
  require('./dist/app');
});
```

For more details, see the official CDP documentation: Network.loadNetworkResource

### `inspector.DOMStorage.domStorageItemAdded`

* `params` {Object}
  * `storageId` {Object}
    * `securityOrigin` {string}
    * `storageKey` {string}
    * `isLocalStorage` {boolean}
  * `key` {string}
  * `newValue` {string}

This feature is only available with the
`--experimental-storage-inspection` flag enabled.

Broadcasts the `DOMStorage.domStorageItemAdded` event to connected frontends.
This event indicates that a new item has been added to the storage.

### `inspector.DOMStorage.domStorageItemRemoved`

* `params` {Object}
  * `storageId` {Object}
    * `securityOrigin` {string}
    * `storageKey` {string}
    * `isLocalStorage` {boolean}
  * `key` {string}

This feature is only available with the
`--experimental-storage-inspection` flag enabled.

Broadcasts the `DOMStorage.domStorageItemRemoved` event to connected frontends.
This event indicates that an item has been removed from the storage.

### `inspector.DOMStorage.domStorageItemUpdated`

* `params` {Object}
  * `storageId` {Object}
    * `securityOrigin` {string}
    * `storageKey` {string}
    * `isLocalStorage` {boolean}
  * `key` {string}
  * `oldValue` {string}
  * `newValue` {string}

This feature is only available with the
`--experimental-storage-inspection` flag enabled.

Broadcasts the `DOMStorage.domStorageItemUpdated` event to connected frontends.
This event indicates that a storage item has been updated.

### `inspector.DOMStorage.domStorageItemsCleared`

* `params` {Object}
  * `storageId` {Object}
    * `securityOrigin` {string}
    * `storageKey` {string}
    * `isLocalStorage` {boolean}

This feature is only available with the
`--experimental-storage-inspection` flag enabled.

Broadcasts the `DOMStorage.domStorageItemsCleared` event to connected
frontends. This event indicates that all items have been cleared from the
storage.

### `inspector.DOMStorage.registerStorage`

* `params` {Object}
  * `isLocalStorage` {boolean}
  * `storageMap` {Object}

This feature is only available with the
`--experimental-storage-inspection` flag enabled.

## Support of breakpoints

The Chrome DevTools Protocol `Debugger` domain allows an
`inspector.Session` to attach to a program and set breakpoints to step through
the codes.

However, setting breakpoints with a same-thread `inspector.Session`, which is
connected by `session.connect()`, should be avoided as the program being
attached and paused is exactly the debugger itself. Instead, try connect to the
main thread by `session.connectToMainThread()` and set breakpoints in a
worker thread, or connect with a Debugger program over WebSocket
connection.

---
title: "Environment API for Runtimes (part 2 of 2)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/guide/api-environment-runtimes.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Environment API for Runtimes (part 2 of 2)

## `ModuleRunnerTransport`

**Type Signature:**

```ts
import type { ModuleRunnerTransportHandlers } from 'vite/module-runner'
/** an object */
type HotPayload = unknown
// ---cut---
interface ModuleRunnerTransport {
  connect?(handlers: ModuleRunnerTransportHandlers): Promise<void> | void
  disconnect?(): Promise<void> | void
  send?(data: HotPayload): Promise<void> | void
  invoke?(data: HotPayload): Promise<{ result: any } | { error: any }>
  timeout?: number
}
```

Transport object that communicates with the environment via an RPC or by directly calling the function. When `invoke` method is not implemented, the `send` method and `connect` method is required to be implemented. Vite will construct the `invoke` internally.

You need to couple it with the `HotChannel` instance on the server like in this example where module runner is created in the worker thread:

::: code-group

```js
import { fileURLToPath } from 'node:url'
import { parentPort } from 'node:worker_threads'
import {
  ESModulesEvaluator,
  ModuleRunner,
  createNodeImportMeta,
} from 'vite/module-runner'

/** @type {import('vite/module-runner').ModuleRunnerTransport} */
const transport = {
  connect({ onMessage, onDisconnection }) {
    parentPort.on('message', onMessage)
    parentPort.on('close', onDisconnection)
  },
  send(data) {
    parentPort.postMessage(data)
  },
}

const runner = new ModuleRunner(
  {
    transport,
    createImportMeta: createNodeImportMeta,
  },
  new ESModulesEvaluator(),
)
```

```js
import { BroadcastChannel } from 'node:worker_threads'
import { createServer, DevEnvironment } from 'vite'

function createWorkerEnvironment(name, config, context) {
  const worker = new Worker('./worker.js')
  const handlerToWorkerListener = new WeakMap()
  const client = {
    send(payload: HotPayload) {
      worker.postMessage(payload)
    },
  }

  const workerHotChannel = {
    // Worker threads post messages are not exposed over the network, skip server.fs checks
    skipFsCheck: true,
    send: (data) => worker.postMessage(data),
    on: (event, handler) => {
      // client is already connected
      if (event === 'vite:client:connect') return
      if (event === 'vite:client:disconnect') {
        const listener = () => {
          handler(undefined, client)
        }
        handlerToWorkerListener.set(handler, listener)
        worker.on('exit', listener)
        return
      }

      const listener = (value) => {
        if (value.type === 'custom' && value.event === event) {
          handler(value.data, client)
        }
      }
      handlerToWorkerListener.set(handler, listener)
      worker.on('message', listener)
    },
    off: (event, handler) => {
      if (event === 'vite:client:connect') return
      if (event === 'vite:client:disconnect') {
        const listener = handlerToWorkerListener.get(handler)
        if (listener) {
          worker.off('exit', listener)
          handlerToWorkerListener.delete(handler)
        }
        return
      }

      const listener = handlerToWorkerListener.get(handler)
      if (listener) {
        worker.off('message', listener)
        handlerToWorkerListener.delete(handler)
      }
    },
  }

  return new DevEnvironment(name, config, {
    transport: workerHotChannel,
  })
}

await createServer({
  environments: {
    worker: {
      dev: {
        createEnvironment: createWorkerEnvironment,
      },
    },
  },
})
```

Make sure to implement the `vite:client:connect` / `vite:client:disconnect` events in the `on` / `off` methods when those methods exist. `vite:client:connect` event should be emitted when the connection is established, and `vite:client:disconnect` event should be emitted when the connection is closed. The `HotChannelClient` object passed to the event handler must have the same reference for the same connection.

A different example using an HTTP request to communicate between the runner and the server:

```ts
import { ESModulesEvaluator, ModuleRunner } from 'vite/module-runner'

export const runner = new ModuleRunner(
  {
    transport: {
      async invoke(data) {
        const response = await fetch(`http://my-vite-server/invoke`, {
          method: 'POST',
          body: JSON.stringify(data),
        })
        return response.json()
      },
    },
    hmr: false, // disable HMR as HMR requires transport.connect
  },
  new ESModulesEvaluator(),
)

await runner.import('/entry.js')
```

In this case, the `handleInvoke` method in the `NormalizedHotChannel` can be used:

```ts
const customEnvironment = new DevEnvironment(name, config, context)

server.onRequest((request: Request) => {
  const url = new URL(request.url)
  if (url.pathname === '/invoke') {
    const payload = (await request.json()) as HotPayload
    const result = customEnvironment.hot.handleInvoke(payload)
    return new Response(JSON.stringify(result))
  }
  return Response.error()
})
```

But note that for HMR support, `send` and `connect` methods are required. The `send` method is usually called when the custom event is triggered (like, `import.meta.hot.send("my-event")`).

For an SSR environment running in the same Node.js process as the Vite server, Vite exports `createServerHotChannel` as a ready-made `HotChannel`:

```js
import { createServerHotChannel, DevEnvironment } from 'vite'

new DevEnvironment(name, config, {
  hot: true,
  transport: createServerHotChannel(),
})
```

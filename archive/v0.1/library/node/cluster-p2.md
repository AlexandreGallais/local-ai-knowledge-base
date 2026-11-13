---
title: "Cluster (part 2 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cluster.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Cluster (part 2 of 3)

## Class: `Worker`

* Extends: {EventEmitter}

A `Worker` object contains all public information and method about a worker.
In the primary it can be obtained using `cluster.workers`. In a worker
it can be obtained using `cluster.worker`.

### Event: `'disconnect'`

Similar to the `cluster.on('disconnect')` event, but specific to this worker.

```js
cluster.fork().on('disconnect', () => {
  // Worker has disconnected
});
```

### Event: `'error'`

This event is the same as the one provided by `child_process.fork()`.

Within a worker, `process.on('error')` may also be used.

### Event: `'exit'`

* `code` {number} The exit code, if it exited normally.
* `signal` {string} The name of the signal (e.g. `'SIGHUP'`) that caused
  the process to be killed.

Similar to the `cluster.on('exit')` event, but specific to this worker.

```mjs
import cluster from 'node:cluster';

if (cluster.isPrimary) {
  const worker = cluster.fork();
  worker.on('exit', (code, signal) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
  });
}
```

```cjs
const cluster = require('node:cluster');

if (cluster.isPrimary) {
  const worker = cluster.fork();
  worker.on('exit', (code, signal) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
  });
}
```

### Event: `'listening'`

* `address` {Object}

Similar to the `cluster.on('listening')` event, but specific to this worker.

```mjs
cluster.fork().on('listening', (address) => {
  // Worker is listening
});
```

```cjs
cluster.fork().on('listening', (address) => {
  // Worker is listening
});
```

It is not emitted in the worker.

### Event: `'message'`

* `message` {Object}
* `handle` {undefined|Object}

Similar to the `'message'` event of `cluster`, but specific to this worker.

Within a worker, `process.on('message')` may also be used.

See `process` event: `'message'`.

Here is an example using the message system. It keeps a count in the primary
process of the number of HTTP requests received by the workers:

```mjs
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';

if (cluster.isPrimary) {

  // Keep track of http requests
  let numReqs = 0;
  setInterval(() => {
    console.log(`numReqs = ${numReqs}`);
  }, 1000);

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  // Start workers and listen for messages containing notifyRequest
  const numCPUs = availableParallelism();
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else {

  // Worker processes have a http server.
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');

    // Notify primary about the request
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}
```

```cjs
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').availableParallelism();

if (cluster.isPrimary) {

  // Keep track of http requests
  let numReqs = 0;
  setInterval(() => {
    console.log(`numReqs = ${numReqs}`);
  }, 1000);

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  // Start workers and listen for messages containing notifyRequest
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else {

  // Worker processes have a http server.
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');

    // Notify primary about the request
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}
```

### Event: `'online'`

Similar to the `cluster.on('online')` event, but specific to this worker.

```js
cluster.fork().on('online', () => {
  // Worker is online
});
```

It is not emitted in the worker.

### `worker.disconnect()`

* Returns: {cluster.Worker} A reference to `worker`.

In a worker, this function will close all servers, wait for the `'close'` event
on those servers, and then disconnect the IPC channel.

In the primary, an internal message is sent to the worker causing it to call
`.disconnect()` on itself.

Causes `.exitedAfterDisconnect` to be set.

After a server is closed, it will no longer accept new connections,
but connections may be accepted by any other listening worker. Existing
connections will be allowed to close as usual. When no more connections exist,
see `server.close()`, the IPC channel to the worker will close allowing it
to die gracefully.

The above applies _only_ to server connections, client connections are not
automatically closed by workers, and disconnect does not wait for them to close
before exiting.

In a worker, `process.disconnect` exists, but it is not this function;
it is `disconnect()`.

Because long living server connections may block workers from disconnecting, it
may be useful to send a message, so application specific actions may be taken to
close them. It also may be useful to implement a timeout, killing a worker if
the `'disconnect'` event has not been emitted after some time.

```js
if (cluster.isPrimary) {
  const worker = cluster.fork();
  let timeout;

  worker.on('listening', (address) => {
    worker.send('shutdown');
    worker.disconnect();
    timeout = setTimeout(() => {
      worker.kill();
    }, 2000);
  });

  worker.on('disconnect', () => {
    clearTimeout(timeout);
  });

} else if (cluster.isWorker) {
  const net = require('node:net');
  const server = net.createServer((socket) => {
    // Connections never end
  });

  server.listen(8000);

  process.on('message', (msg) => {
    if (msg === 'shutdown') {
      // Initiate graceful close of any connections to server
    }
  });
}
```

### `worker.exitedAfterDisconnect`

* Type: {boolean}

This property is `true` if the worker exited due to `.disconnect()`.
If the worker exited any other way, it is `false`. If the
worker has not exited, it is `undefined`.

The boolean `worker.exitedAfterDisconnect` allows distinguishing between
voluntary and accidental exit, the primary may choose not to respawn a worker
based on this value.

```js
cluster.on('exit', (worker, code, signal) => {
  if (worker.exitedAfterDisconnect === true) {
    console.log('Oh, it was just voluntary – no need to worry');
  }
});

// kill worker
worker.kill();
```

### `worker.id`

* Type: {integer}

Each new worker is given its own unique id, this id is stored in the
`id`.

While a worker is alive, this is the key that indexes it in
`cluster.workers`.

### `worker.isConnected()`

* Returns: {boolean}

This function returns `true` if the worker is connected to its primary via its
IPC channel, `false` otherwise. A worker is connected to its primary after it
has been created. It is disconnected after the `'disconnect'` event is emitted.

### `worker.isDead()`

* Returns: {boolean}

This function returns `true` if the worker's process has terminated (either
because of exiting or being signaled). Otherwise, it returns `false`.

```mjs
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', (worker) => {
    console.log('worker is dead:', worker.isDead());
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker is dead:', worker.isDead());
  });
} else {
  // Workers can share any TCP connection. In this case, it is an HTTP server.
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Current process\n ${process.pid}`);
    process.kill(process.pid);
  }).listen(8000);
}
```

```cjs
const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = require('node:os').availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', (worker) => {
    console.log('worker is dead:', worker.isDead());
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('worker is dead:', worker.isDead());
  });
} else {
  // Workers can share any TCP connection. In this case, it is an HTTP server.
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Current process\n ${process.pid}`);
    process.kill(process.pid);
  }).listen(8000);
}
```

### `worker.kill([signal])`

* `signal` {string} Name of the kill signal to send to the worker
  process. **Default:** `'SIGTERM'`

This function will kill the worker. In the primary worker, it does this by
disconnecting the `worker.process`, and once disconnected, killing with
`signal`. In the worker, it does it by killing the process with `signal`.

The `kill()` function kills the worker process without waiting for a graceful
disconnect, it has the same behavior as `worker.process.kill()`.

This method is aliased as `worker.destroy()` for backwards compatibility.

In a worker, `process.kill()` exists, but it is not this function;
it is `kill()`.

### `worker.process`

* Type: {ChildProcess}

All workers are created using `child_process.fork()`, the returned object
from this function is stored as `.process`. In a worker, the global `process`
is stored.

See: Child Process module.

Workers will call `process.exit(0)` if the `'disconnect'` event occurs
on `process` and `.exitedAfterDisconnect` is not `true`. This protects against
accidental disconnection.

### `worker.send(message, sendHandle[, options])`

* `message` {Object}
* `sendHandle` {Handle}
* `options` {Object} The `options` argument, if present, is an object used to
  parameterize the sending of certain types of handles. `options` supports
  the following properties:
  * `keepOpen` {boolean} A value that can be used when passing instances of
    `net.Socket`. When `true`, the socket is kept open in the sending process.
    **Default:** `false`.
* `callback` {Function}
* Returns: {boolean}

Send a message to a worker or primary, optionally with a handle.

In the primary, this sends a message to a specific worker. It is identical to
`ChildProcess.send()`.

In a worker, this sends a message to the primary. It is identical to
`process.send()`.

This example will echo back all messages from the primary:

```js
if (cluster.isPrimary) {
  const worker = cluster.fork();
  worker.send('hi there');

} else if (cluster.isWorker) {
  process.on('message', (msg) => {
    process.send(msg);
  });
}
```

## Event: `'disconnect'`

* `worker` {cluster.Worker}

Emitted after the worker IPC channel has disconnected. This can occur when a
worker exits gracefully, is killed, or is disconnected manually (such as with
`worker.disconnect()`).

There may be a delay between the `'disconnect'` and `'exit'` events. These
events can be used to detect if the process is stuck in a cleanup or if there
are long-living connections.

```js
cluster.on('disconnect', (worker) => {
  console.log(`The worker #${worker.id} has disconnected`);
});
```

## Event: `'exit'`

* `worker` {cluster.Worker}
* `code` {number} The exit code, if it exited normally.
* `signal` {string} The name of the signal (e.g. `'SIGHUP'`) that caused
  the process to be killed.

When any of the workers die the cluster module will emit the `'exit'` event.

This can be used to restart the worker by calling `.fork()` again.

```js
cluster.on('exit', (worker, code, signal) => {
  console.log('worker %d died (%s). restarting...',
              worker.process.pid, signal || code);
  cluster.fork();
});
```

See `child_process` event: `'exit'`.

## Event: `'fork'`

* `worker` {cluster.Worker}

When a new worker is forked the cluster module will emit a `'fork'` event.
This can be used to log worker activity, and create a custom timeout.

```js
const timeouts = [];
function errorMsg() {
  console.error('Something must be wrong with the connection ...');
}

cluster.on('fork', (worker) => {
  timeouts[worker.id] = setTimeout(errorMsg, 2000);
});
cluster.on('listening', (worker, address) => {
  clearTimeout(timeouts[worker.id]);
});
cluster.on('exit', (worker, code, signal) => {
  clearTimeout(timeouts[worker.id]);
  errorMsg();
});
```

## Event: `'listening'`

* `worker` {cluster.Worker}
* `address` {Object}

After calling `listen()` from a worker, when the `'listening'` event is emitted
on the server, a `'listening'` event will also be emitted on `cluster` in the
primary.

The event handler is executed with two arguments, the `worker` contains the
worker object and the `address` object contains the following connection
properties: `address`, `port`, and `addressType`. This is very useful if the
worker is listening on more than one address.

```js
cluster.on('listening', (worker, address) => {
  console.log(
    `A worker is now connected to ${address.address}:${address.port}`);
});
```

The `addressType` is one of:

* `4` (TCPv4)
* `6` (TCPv6)
* `-1` (Unix domain socket)
* `'udp4'` or `'udp6'` (UDPv4 or UDPv6)

## Event: `'message'`

* `worker` {cluster.Worker}
* `message` {Object}
* `handle` {undefined|Object}

Emitted when the cluster primary receives a message from any worker.

See `child_process` event: `'message'`.

## Event: `'online'`

* `worker` {cluster.Worker}

After forking a new worker, the worker should respond with an online message.
When the primary receives an online message it will emit this event.
The difference between `'fork'` and `'online'` is that fork is emitted when the
primary forks a worker, and `'online'` is emitted when the worker is running.

```js
cluster.on('online', (worker) => {
  console.log('Yay, the worker responded after it was forked');
});
```

## Event: `'setup'`

* `settings` {Object}

Emitted every time `.setupPrimary()` is called.

The `settings` object is the `cluster.settings` object at the time
`.setupPrimary()` was called and is advisory only, since multiple calls to
`.setupPrimary()` can be made in a single tick.

If accuracy is important, use `cluster.settings`.

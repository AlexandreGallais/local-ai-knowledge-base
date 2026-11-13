---
title: "REPL (part 3 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/repl.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# REPL (part 3 of 3)

## The Node.js REPL

Node.js itself uses the `node:repl` module to provide its own interactive
interface for executing JavaScript. This can be used by executing the Node.js
binary without passing any arguments (or by passing the `-i` argument):

```console
$ node
> const a = [1, 2, 3];
undefined
> a
[ 1, 2, 3 ]
> a.forEach((v) => {
...   console.log(v);
...   });
1
2
3
```

### Environment variable options

Various behaviors of the Node.js REPL can be customized using the following
environment variables:

* `NODE_REPL_HISTORY`: When a valid path is given, persistent REPL history
  will be saved to the specified file rather than `.node_repl_history` in the
  user's home directory. Setting this value to `''` (an empty string) will
  disable persistent REPL history. Whitespace will be trimmed from the value.
  On Windows platforms environment variables with empty values are invalid so
  set this variable to one or more spaces to disable persistent REPL history.
* `NODE_REPL_HISTORY_SIZE`: Controls how many lines of history will be
  persisted if history is available. Must be a positive number.
  **Default:** `1000`.
* `NODE_REPL_MODE`: May be either `'sloppy'` or `'strict'`. **Default:**
  `'sloppy'`, which will allow non-strict mode code to be run.

### Persistent history

By default, the Node.js REPL will persist history between `node` REPL sessions
by saving inputs to a `.node_repl_history` file located in the user's home
directory. This can be disabled by setting the environment variable
`NODE_REPL_HISTORY=''`.

### Using the Node.js REPL with advanced line-editors

For advanced line-editors, start Node.js with the environment variable
`NODE_NO_READLINE=1`. This will start the main and debugger REPL in canonical
terminal settings, which will allow use with `rlwrap`.

For example, the following can be added to a `.bashrc` file:

```bash
alias node="env NODE_NO_READLINE=1 rlwrap node"
```

### Starting multiple REPL instances in the same process

It is possible to create and run multiple REPL instances against a single
running instance of Node.js that share a single `global` object (by setting
the `useGlobal` option to `true`) but have separate I/O interfaces.

The following example, for instance, provides separate REPLs on `stdin`, a Unix
socket, and a TCP socket, all sharing the same `global` object:

```mjs
import net from 'node:net';
import repl from 'node:repl';
import process from 'node:process';
import fs from 'node:fs';

let connections = 0;

repl.start({
  prompt: 'Node.js via stdin> ',
  useGlobal: true,
  input: process.stdin,
  output: process.stdout,
});

const unixSocketPath = '/tmp/node-repl-sock';

// If the socket file already exists let's remove it
fs.rmSync(unixSocketPath, { force: true });

net.createServer((socket) => {
  connections += 1;
  repl.start({
    prompt: 'Node.js via Unix socket> ',
    useGlobal: true,
    input: socket,
    output: socket,
  }).on('exit', () => {
    socket.end();
  });
}).listen(unixSocketPath);

net.createServer((socket) => {
  connections += 1;
  repl.start({
    prompt: 'Node.js via TCP socket> ',
    useGlobal: true,
    input: socket,
    output: socket,
  }).on('exit', () => {
    socket.end();
  });
}).listen(5001);
```

```cjs
const net = require('node:net');
const repl = require('node:repl');
const fs = require('node:fs');

let connections = 0;

repl.start({
  prompt: 'Node.js via stdin> ',
  useGlobal: true,
  input: process.stdin,
  output: process.stdout,
});

const unixSocketPath = '/tmp/node-repl-sock';

// If the socket file already exists let's remove it
fs.rmSync(unixSocketPath, { force: true });

net.createServer((socket) => {
  connections += 1;
  repl.start({
    prompt: 'Node.js via Unix socket> ',
    useGlobal: true,
    input: socket,
    output: socket,
  }).on('exit', () => {
    socket.end();
  });
}).listen(unixSocketPath);

net.createServer((socket) => {
  connections += 1;
  repl.start({
    prompt: 'Node.js via TCP socket> ',
    useGlobal: true,
    input: socket,
    output: socket,
  }).on('exit', () => {
    socket.end();
  });
}).listen(5001);
```

Running this application from the command line will start a REPL on stdin.
Other REPL clients may connect through the Unix socket or TCP socket. `telnet`,
for instance, is useful for connecting to TCP sockets, while `socat` can be used
to connect to both Unix and TCP sockets.

By starting a REPL from a Unix socket-based server instead of stdin, it is
possible to connect to a long-running Node.js process without restarting it.

### Examples

#### Full-featured "terminal" REPL over `net.Server` and `net.Socket`

This is an example on how to run a "full-featured" (terminal) REPL using
`net.Server` and `net.Socket`

The following script starts an HTTP server on port `1337` that allows
clients to establish socket connections to its REPL instance.

```mjs
// repl-server.js
import repl from 'node:repl';
import net from 'node:net';

net
  .createServer((socket) => {
    const r = repl.start({
      prompt: `socket ${socket.remoteAddress}:${socket.remotePort}> `,
      input: socket,
      output: socket,
      terminal: true,
      useGlobal: false,
    });
    r.on('exit', () => {
      socket.end();
    });
    r.context.socket = socket;
  })
  .listen(1337);
```

```cjs
// repl-server.js
const repl = require('node:repl');
const net = require('node:net');

net
  .createServer((socket) => {
    const r = repl.start({
      prompt: `socket ${socket.remoteAddress}:${socket.remotePort}> `,
      input: socket,
      output: socket,
      terminal: true,
      useGlobal: false,
    });
    r.on('exit', () => {
      socket.end();
    });
    r.context.socket = socket;
  })
  .listen(1337);
```

While the following implements a client that can create a socket connection
with the above defined server over port `1337`.

```mjs
// repl-client.js
import net from 'node:net';
import process from 'node:process';

const sock = net.connect(1337);

process.stdin.pipe(sock);
sock.pipe(process.stdout);

sock.on('connect', () => {
  process.stdin.resume();
  process.stdin.setRawMode(true);
});

sock.on('close', () => {
  process.stdin.setRawMode(false);
  process.stdin.pause();
  sock.removeListener('close', done);
});

process.stdin.on('end', () => {
  sock.destroy();
  console.log();
});

process.stdin.on('data', (b) => {
  if (b.length === 1 && b[0] === 4) {
    process.stdin.emit('end');
  }
});
```

```cjs
// repl-client.js
const net = require('node:net');

const sock = net.connect(1337);

process.stdin.pipe(sock);
sock.pipe(process.stdout);

sock.on('connect', () => {
  process.stdin.resume();
  process.stdin.setRawMode(true);
});

sock.on('close', () => {
  process.stdin.setRawMode(false);
  process.stdin.pause();
  sock.removeListener('close', done);
});

process.stdin.on('end', () => {
  sock.destroy();
  console.log();
});

process.stdin.on('data', (b) => {
  if (b.length === 1 && b[0] === 4) {
    process.stdin.emit('end');
  }
});
```

To run the example open two different terminals on your machine, start the server
with `node repl-server.js` in one terminal and `node repl-client.js` on the other.

Original code from <https://gist.github.com/TooTallNate/2209310>.

#### REPL over `curl`

This is an example on how to run a REPL instance over `curl()`

The following script starts an HTTP server on port `8000` that can accept
a connection established via `curl()`.

```mjs
import http from 'node:http';
import repl from 'node:repl';

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'multipart/octet-stream');

  repl.start({
    prompt: 'curl repl> ',
    input: req,
    output: res,
    terminal: false,
    useColors: true,
    useGlobal: false,
  });
});

server.listen(8000);
```

```cjs
const http = require('node:http');
const repl = require('node:repl');

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'multipart/octet-stream');

  repl.start({
    prompt: 'curl repl> ',
    input: req,
    output: res,
    terminal: false,
    useColors: true,
    useGlobal: false,
  });
});

server.listen(8000);
```

When the above script is running you can then use `curl()` to connect to
the server and connect to its REPL instance by running `curl --no-progress-meter -sSNT. localhost:8000`.

**Warning** This example is intended purely for educational purposes to demonstrate how
Node.js REPLs can be started using different I/O streams.
It should **not** be used in production environments or any context where security
is a concern without additional protective measures.
If you need to implement REPLs in a real-world application, consider alternative
approaches that mitigate these risks, such as using secure input mechanisms and
avoiding open network interfaces.

Original code from <https://gist.github.com/TooTallNate/2053342>.
